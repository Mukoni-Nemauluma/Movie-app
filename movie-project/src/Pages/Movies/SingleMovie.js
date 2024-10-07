import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  fetchMovieDetails,
  fetchRelatedMovies,
  fetchCredits,
  fetchVideos,
} from "../../util/API"
import useScrollToTop from "../../ScrollToTop"

const SingleMovie = () => {
  useScrollToTop()
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [relatedMovies, setRelatedMovies] = useState([])
  const [credits, setCredits] = useState([])
  const [videos, setVideos] = useState([])
  const [director, setDirector] = useState("")
  const [company, setCompany] = useState({ name: "", logo_path: "" })

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieResponse = await fetchMovieDetails(id)
        setMovie(movieResponse)

        const relatedResponse = await fetchRelatedMovies(id)
        setRelatedMovies(relatedResponse.results.slice(0, 8) || [])

        const creditsResponse = await fetchCredits(id)
        const mainCast = creditsResponse.cast.slice(0, 5) || []
        setCredits(mainCast)

        const directorInfo = creditsResponse.crew.find(
          (member) => member.job === "Director",
        )
        setDirector(directorInfo ? directorInfo.name : "N/A")

        const productionCompany = movieResponse.production_companies[0] || {
          name: "N/A",
          logo_path: null,
        }
        setCompany(productionCompany)

        const videosResponse = await fetchVideos(id)
        setVideos(videosResponse.results || [])
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }

    fetchDetails()
  }, [id])

  if (!movie) {
    return <p className="text-center text-lg text-gray-500">Loading...</p>
  }

  return (
    <div className="single-movie-container">
      {/* Movie Details Section */}
      <div
        className="movie-details bg-cover bg-center text-white relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="color-overlay absolute inset-0 bg-black bg-opacity-75"></div>
        <div className="container mx-auto py-16 px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {movie.poster_path && (
              <img
                className="rounded-lg w-72 mb-6 md:mb-0 md:mr-8"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg mb-2">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className="text-lg mb-2">
                <strong>Runtime:</strong> {movie.runtime} minutes
              </p>
              <p className="text-lg mb-2">
                <strong>Language:</strong> {movie.original_language}
              </p>
              <p className="text-lg mb-2">
                <strong>Rating:</strong> {movie.vote_average} (
                {movie.vote_count} votes)
              </p>
              <p className="text-lg mb-4">
                <strong>Overview:</strong> {movie.overview}
              </p>
              <p className="text-lg mb-2">
                <strong>Director:</strong> {director}
              </p>
              {company.logo_path && (
                <div className="mt-4">
                  <p className="text-lg">
                    <strong>Production Company:</strong> {company.name}
                  </p>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mx-auto py-12 px-8">
        <h2 className="text-3xl font-semibold text-black mb-6">Cast</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {credits.map((actor) => (
            <li key={actor.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <Link to={`/actors/${actor.id}`}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-md mb-2"
                  />
                ) : (
                  <p className="text-gray-400">No image available</p>
                )}
                <h3 className="text-lg font-semibold text-white">
                  {actor.name}
                </h3>
                <p className="text-gray-400">Role: {actor.character}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Trailer Section */}
      {videos.length > 0 && (
        <div className="container mx-auto py-12 px-8 flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-black mb-4 text-center">
            Watch the Trailer
          </h2>
          <div className="trailer-container w-full max-w-4xl h-96 md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="trailer"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videos[0].key}`}
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Related Movies Section */}
      <div className="container mx-auto py-12 px-8">
        <h2 className="text-3xl font-semibold text-black mb-6">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedMovies.map((relatedMovie) => (
            <div
              key={relatedMovie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Link to={`/movie/${relatedMovie.id}`}>
                {relatedMovie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}`}
                    alt={relatedMovie.title}
                    className="rounded-lg mb-2"
                  />
                ) : (
                  <p className="text-gray-400">No poster available</p>
                )}
                <h3 className="text-lg font-semibold text-white text-center">
                  {relatedMovie.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleMovie
