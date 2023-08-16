import React, { useState, useCallback, useEffect } from "react";
import { RingLoader } from "react-spinners";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setloading(true);
    try {
      const Response = await fetch(
        "https://test1-398b5-default-rtdb.firebaseio.com/movies.json"
      );
      // console.log(Response);
      if (Response.status !== 200) {
        throw new Error("Something went Wrong");
      }
      const data = await Response.json();
      const moviesloaded = [];
      for (const key in data) {
        moviesloaded.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      setMovies(moviesloaded);
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
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://test1-398b5-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
