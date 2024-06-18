import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActorDetails } from '../util/API';

const SingleActor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetchActorDetails(id);
      setActor(response);
    };

    fetchDetails();
  }, [id]);

  return (
    <div>
      {actor ? (
        <div>
          <h1>{actor.name}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
          <p>{actor.biography}</p>
          <h2>Movies</h2>
          <ul>
            {actor.movie_credits.cast.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleActor;
