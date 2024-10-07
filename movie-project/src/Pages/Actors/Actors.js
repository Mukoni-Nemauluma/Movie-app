import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchPopularActors } from "../../util/API"
import useScrollToTop from "../../ScrollToTop"

const Actors = () => {
  useScrollToTop()
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

  if (loading)
    return <div className="text-center text-lg text-gray-500">Loading...</div>
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Popular Actors
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actors.map((actor) => (
          <div
            key={actor.id}
            className="actor-card bg-gray-800 p-2 rounded-lg shadow-lg" // Reduced padding
          >
            <Link to={`/actors/${actor.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} // Reduced image size
                alt={actor.name}
                className="w-full h-auto rounded-md mb-2 transition-transform transform hover:scale-105 duration-300" // Full width
              />
              <h2 className="text-md font-semibold text-white text-center">
                {" "}
                {/* Reduced font size */}
                {actor.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Actors
