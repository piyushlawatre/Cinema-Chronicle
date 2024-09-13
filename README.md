# cinema-chronicle
A simple React app for browsing movies, tracking watched movies, and rating them. This app fetches movie data from the OMDB API and provides a user-friendly interface for managing and reviewing movies.

Features
Movie Search: Search for movies by title using an input field.
Movie Details: View detailed information about a selected movie including rating, plot, and cast.
Watched List: Track movies you’ve watched, including personal ratings.
Ratings: Rate movies and add them to your watched list.
Summary: View a summary of watched movies, including average IMDb rating, user rating, and runtime.
Components
App: Main component managing state and rendering the application.
NavBar: Contains the logo and search functionality.
Search: Input field for searching movies.
MovieList: Displays a list of movies based on the search query.
MovieDetails: Shows detailed information for a selected movie, allows for rating and adding to the watched list.
WatchedSummary: Provides a summary of watched movies, including average ratings and runtime.
WatchedMoviesList: Lists all watched movies with options to remove them.
Loader: Displays a loading indicator when data is being fetched.
ErrorMessage: Displays error messages if data fetching fails.
Hooks
useMovies: Custom hook for fetching movies based on the search query.
useLocalStorageState: Custom hook for managing state that persists in local storage.
useKey: Custom hook for handling keypress events.
Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/movie-watchlist.git
Install Dependencies:

bash
Copy code
cd movie-watchlist
npm install
Start the Application:

bash
Copy code
npm start
Visit: Open your browser and navigate to http://localhost:3000 to use the app.

Note
Replace your-username with your actual GitHub username and make sure to have a valid OMDB API key for fetching movie data.
