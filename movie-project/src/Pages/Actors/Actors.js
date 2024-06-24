import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPopularActors } from "../../util/API";
import useScrollToTop from "../../ScrollToTop";
import '../../Design.css';

const Actors = () => {
  useScrollToTop();
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const data = await fetchPopularActors()
        setActors(data.results)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchActors()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="actors-list">
      {actors.map((actor) => (
        <div key={actor.id} className="actor-card">
          <Link to={`/actors/${actor.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
            />
            <h2>{actor.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Actors;