import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularActors } from '../util/API';

const Actors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      const response = await fetchPopularActors();
      setActors(response.results);
    };

    fetchActors();
  }, []);

  return (
    <div>
      <h1>Popular Actors</h1>
      <div>
        {actors.map((actor) => (
          <div key={actor.id}>
            <Link to={`/actors/${actor.id}`}>
              <h2>{actor.name}</h2>
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
              ) : (
                <p>No picture available</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actors;
