import React, { useState, useCallback, useEffect } from "react";
import { RingLoader } from "react-spinners";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setloading(true);
    try {
      const Response = await fetch("https://swapi.dev/api/films");
      // console.log(Response);
      if (Response.status !== 200) {
        throw new Error("Something went Wrong");
      }
      const data = await Response.json();
      // console.log(data);
      const tranformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(tranformedMovies);
    } catch (error) {
      seterror(error.message);
    }
    setloading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No Movies Found</p>;
  if (error) content = <p>{error}</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (loading)
    content = (
      <div className="d-flex justify-content-center">
        <RingLoader color={"#000000"}></RingLoader>
      </div>
    );

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
