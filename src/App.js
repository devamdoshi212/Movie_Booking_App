import React, { useState } from "react";
import { RingLoader } from "react-spinners";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const fetchMoviesHandler = async () => {
    setloading(true);
    const Response = await fetch("https://swapi.dev/api/films");
    const data = await Response.json();
    const tranformedMovies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl,
      };
    });
    setMovies(tranformedMovies);
    setloading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && <p>No Movies Found</p>}
        {loading && (
          <div className="d-flex justify-content-center">
            <RingLoader color={"#000000"}></RingLoader>
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
