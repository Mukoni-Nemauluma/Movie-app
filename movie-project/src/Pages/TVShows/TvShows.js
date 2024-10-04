import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTVShows } from '../../util/API';
import useScrollToTop from '../../ScrollToTop';

const TVShows = () => {
  useScrollToTop();
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const fetchAllTVShows = async () => {
      try {
        const response = await fetchTVShows();
        setTVShows(response.results || []);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchAllTVShows();
  }, []);

  return (
    <div className="movies-page">
      <h2>TV Shows</h2>
      <div className="movies-grid">
        {tvShows.map((tvShow) => (
          <div key={tvShow.id} className="movie-card">
            <Link to={`/tv/${tvShow.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
              />
              <h3>{tvShow.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
