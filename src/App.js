import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=d33ee346";

function App() {
  // d33ee346

  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    let response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <>
      <div className="app">
        <h1>MoviesHouse</h1>
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <i
            className="fa-solid fa-magnifying-glass searchicon"
            onClick={() => {
              searchMovies(searchItem);
            }}
            style={{ color: "white" }}
          ></i>
        </div>
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie, index) => {
              return <MovieCard movie={movie} key={index} />;
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
