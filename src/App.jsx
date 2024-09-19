import { useEffect, useRef, useState } from "react";
import StarRating from "./starRating";

const average = (arr) =>
  Math.round(arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0));

export default function App() {
  const [query, setQuery] = useState("game of thrones");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
    // This will only be called on initial render on component mount
  });

  /*
  Never do this 
    const [watched, setWatched] = useState( localStorage.getItem("watched"));
    // Never call function directly inside useState 
    // Otherwise it will be called in every rerender
    // Pass a callback fun only 
  */

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const controller = new AbortController();

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        setSelectedId("");
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=979a10ec&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        const movies = await res.json();
        if (movies.Error) {
          console.log("error throne", Object.keys(movies), movies.Error);
          throw new Error("Movie not found");
        }
        setMovies(movies.Search);
      } catch (error) {
        if (error.name != "AbortError ") return;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);

      setIsLoading(false);
      setError("");
      return;
    }
    fetchMovie();
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              watched={watched}
              setWatched={setWatched}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList movies={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ height: "30px", width: "30px" }} src="logo.png" />
      </span>
      <h1>Cinema Chronicle</h1>
    </div>
  );
}

function SearchBox({ query, setQuery }) {
  /* This is not the right way to select react elm
   This is more of a imperative approach
   We need to select elm using react declarative approach

  useEffect(() => {
    const inputBox = document.querySelector(".search");
    inputBox.focus();
  }, []);
  */

  const inputEl = useRef(null);
  //  Correct place to use ref while selecting el is inside
  // useEffect as the el is available after Browser paint happens

  // IMP: you are not allowed to mutate the ref in render logic
  useEffect(() => {
    inputEl.current.focus();

    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

export function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function Loader() {
  return (
    <div className="loader">
      <h3>Loading....</h3>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className="error">
      <h3>{error}❌</h3>
    </div>
  );
}

function MovieList({ movies, setSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <ListItem
          movie={movie}
          setSelectedId={setSelectedId}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function MovieDetail({ watched, setWatched, selectedId, setSelectedId }) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ratedCount = useRef(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setRating(0);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=979a10ec&i=${selectedId}`
      );
      const movies = await res.json();
      console.log(movies);
      setMovie(movies);
      setIsLoading(false);
    })();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie | ${movie.Title}`;
    return () => {
      document.title = "Cinema Chronicle";
      console.log(`Cleanup function run for title ${movie.Title}`); // Closure since it executes after the component is unmounted
    };
  }, [movie.Title]);

  useEffect(() => {
    if (rating) ratedCount.current++;
  }, [rating]);

  useEffect(() => {
    function escapeCallback(e) {
      if (e.code === "Escape") {
        setSelectedId("");
        console.log("closing");
      }
    }
    document.addEventListener("keydown", escapeCallback);
    return () => {
      document.removeEventListener("keydown", escapeCallback);
    };
  }, []);

  function addMovieToWatchList() {
    const moviesDetail = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      runtime: +movie.Runtime.split(" ")[0],
      imdbRating: +movie.imdbRating,
      userRating: rating,
      Poster: movie.Poster,
      ratedCount: ratedCount.current,
    };
    setWatched((watched) => [...watched, moviesDetail]);
    // localStorage.setItem("watched", JSON.stringify([...watched, moviesDetail]));
    setSelectedId("");
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => {
                setSelectedId("");
              }}
            >
              ←
            </button>
            <img src={movie.Poster} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} • {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating size={24} maxRating={10} onSetRating={setRating} />
              {rating > 0 && (
                <button className="btn-add" onClick={addMovieToWatchList}>
                  + Add to list
                </button>
              )}
            </div>
            <p>{movie.Plot}</p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed: {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function ListItem({ movie, setSelectedId }) {
  return (
    <li onClick={() => setSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMovieList({ movies }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <WatchListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchListItem({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
