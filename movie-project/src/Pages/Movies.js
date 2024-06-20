import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../util/API';

const Movies = () => {
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const topRatedResponse = await fetchMovies('/movie/top_rated');
      setTopRated(topRatedResponse.results);

      const popularResponse = await fetchMovies('/movie/popular');
      setPopular(popularResponse.results);

      const latestResponse = await fetchMovies('/movie/latest');
      setLatest([latestResponse]);

      const nowPlayingResponse = await fetchMovies('/movie/now_playing');
      setNowPlaying(nowPlayingResponse.results);

      const upcomingResponse = await fetchMovies('/movie/upcoming');
      setUpcoming(upcomingResponse.results);
    };

    fetchAllMovies();
  }, []);

  return (
    <div>
      <div>
        <h2>Top Rated</h2>
        <div>
          {topRated.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
        <h2>Popular</h2>
        <div>
          {popular.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
        <h2>Latest</h2>
        <div>
          {latest.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
        <h2>Now Playing</h2>
        <div>
          {nowPlaying.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
        <h2>Upcoming</h2>
        <div>
          {upcoming.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
