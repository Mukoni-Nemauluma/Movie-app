import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTVShows } from '../../util/API';

const TVShows = () => {
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
    <div>
      <h2>TV Shows</h2>
      <div className="tvshows-grid">
        {tvShows.map((tvShow) => (
          <div key={tvShow.id} className="tvshow-card">
            <Link to={`/tv-show/${tvShow.id}`}>
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
