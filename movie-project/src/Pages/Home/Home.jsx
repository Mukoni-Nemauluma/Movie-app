import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  fetchMoviesByCategory, 
  fetchMoviesByGenre, 
  fetchTopRatedMovies, 
  fetchPopularMovies 
} from "../../util/API";

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const latestResponse = await fetchMoviesByCategory("now_playing");
        const popularResponse = await fetchPopularMovies();
        const topRatedResponse = await fetchTopRatedMovies();
        const comedyResponse = await fetchMoviesByGenre(35);
        const crimeResponse = await fetchMoviesByGenre(80);

        setLatestMovies(latestResponse.results);
        setPopularMovies(popularResponse.results);
        setTopRatedMovies(topRatedResponse.results);
        setComedyMovies(comedyResponse.results);
        setCrimeMovies(crimeResponse.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <section className="hero-section">
        <div className="tv-container">
          <img
            className="tv-image"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
            alt=""
          />
          <video autoPlay playsInline muted loop className="tv-video">
            <source
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hero-content">
          <h1>Welcome to Movie Time</h1>
          <p>
            Discover a world of entertainment. Watch your favorite movies now.
          </p>
        </div>
      </section>

      <section>
        <div className="movie-section">
          <h1>Latest</h1>
          <div className="movies-grid">
            {latestMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="movie-section">
          <h1>Popular</h1>
          <div className="movies-grid">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="movie-section">
          <h1>Top-Rated</h1>
          <div className="movies-grid">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="movie-section">
          <h1>Comedy</h1>
          <div className="movies-grid">
            {comedyMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
