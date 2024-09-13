import React, { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

// Utility to calculate average
const average = (arr) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0).toFixed(1);

const App = () => {
  const [query, setQuery] = useState("");
  const [movies] = useState(tempMovieData);
  const [watched] = useState(tempWatchedData);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(query.toLowerCase())
  );

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-600 text-white py-4 px-6 rounded-md">
        <h1 className="text-2xl font-bold">🎬 My Movie Collection</h1>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-md border-none w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </nav>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Available Movies Section */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Available Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex items-start bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-16 h-24 rounded-lg object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{movie.Title}</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Watched Movies Section */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Watched Movies</h2>
          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Movies Summary</h3>
            <p className="text-gray-600">
              <strong>{watched.length}</strong> movies watched
            </p>
            <p className="text-gray-600">
              Average IMDb Rating: <strong>⭐ {avgImdbRating}</strong>
            </p>
            <p className="text-gray-600">
              Average Runtime: <strong>⏳ {avgRuntime} min</strong>
            </p>
          </div>
          {/* Watched Movies List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {watched.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex items-start bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-16 h-24 rounded-lg object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{movie.Title}</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                  <p className="text-sm text-gray-500">⭐ {movie.imdbRating}</p>
                  <p className="text-sm text-gray-500">
                    ⏳ {movie.runtime} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

// TODO use dark shade
// Available Movies should have toogle button to coloaps and should have fixed height with scroll
// same for watched
