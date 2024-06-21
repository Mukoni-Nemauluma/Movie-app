import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActorDetails } from '../util/API';

const SingleActor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchActorDetails(id);
        setActor(response);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!actor) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{actor.name}</h1>
      {actor.profile_path ? (
        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
      ) : (
        <p>No picture available</p>
      )}
      <p><strong>Gender:</strong> {actor.gender === 1 ? 'Female' : 'Male'}</p>
      <p><strong>Popularity:</strong> {actor.popularity}</p>
      <p><strong>Birthday:</strong> {actor.birthday}</p>
      <p><strong>Biography:</strong> {actor.biography}</p>
      <h2>Movies</h2>
      <ul>
        {actor.movie_credits?.cast.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleActor;
