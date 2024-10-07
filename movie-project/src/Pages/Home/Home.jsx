import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  fetchMoviesByCategory,
  fetchMoviesByGenre,
  fetchTopRatedMovies,
  fetchPopularMovies,
} from "../../util/API"

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [comedyMovies, setComedyMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const latestResponse = await fetchMoviesByCategory("now_playing")
        const popularResponse = await fetchPopularMovies()
        const topRatedResponse = await fetchTopRatedMovies()
        const comedyResponse = await fetchMoviesByGenre(35)

        setLatestMovies(latestResponse.results)
        setPopularMovies(popularResponse.results)
        setTopRatedMovies(topRatedResponse.results)
        setComedyMovies(comedyResponse.results)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchLatestMovies()
  }, [])

  if (loading)
    return <div className="text-center text-lg text-gray-500">Loading...</div>
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="hero bg-gray-800 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Browse through the latest, top-rated, and most popular movies.
        </p>
      </section>

      {/* Movies Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Latest Movies */}
          <h2 className="text-3xl font-semibold mb-6">Latest Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {latestMovies.map((movie) => (
              <div key={movie.id} className="movie-card bg-gray-800 rounded-lg">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <h3 className="text-lg font-semibold text-center p-2">
                    {movie.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Popular Movies */}
          <h2 className="text-3xl font-semibold mb-6 mt-10">Popular Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="movie-card bg-gray-900 rounded-lg">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <h3 className="text-lg font-semibold text-center p-2">
                    {movie.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Top-Rated Movies */}
          <h2 className="text-3xl font-semibold mb-6 mt-10">
            Top-Rated Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="movie-card bg-gray-800 rounded-lg">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <h3 className="text-lg font-semibold text-center p-2">
                    {movie.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Comedy Movies */}
          <h2 className="text-3xl font-semibold mb-6 mt-10">Comedy Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {comedyMovies.map((movie) => (
              <div key={movie.id} className="movie-card bg-gray-900 rounded-lg">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <h3 className="text-lg font-semibold text-center p-2">
                    {movie.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
