import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  fetchMovieDetails,
  fetchRelatedMovies,
  fetchCredits,
  fetchVideos,
} from "../../util/API"
import "../../SingleMovie.css"
import "../../Design.css"

const SingleMovie = () => {
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
    return <p>Loading...</p>
  }

  return (
    <div className="single-movie-container">
      <div
        className="movie-details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="color-overlay"></div>
        <div className="movie-content">
          <div className="movie-header">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-info">
              {movie.release_date} | {movie.runtime} min | {movie.vote_average}{" "}
              / 10
            </p>
          </div>
          <div className="movie-desc">
            <p>{movie.overview}</p>
          </div>
          <div className="production-company">
            {company.logo_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
              />
            )}
            <p>{company.name}</p>
          </div>
        </div>
      </div>

      <div className="cast-position">
        <h2>Cast</h2>
        <ul className="cast-list">
          {credits.map((actor) => (
            <li key={actor.id} className="cast-item">
              <Link to={`/actors/${actor.id}`}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <p>{actor.name}</p>
                <p>
                  <strong>as {actor.character}</strong>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {videos.length > 0 && (
        <div className="trailer-container">
          <iframe
            title="trailer"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            allowFullScreen
          />
        </div>
      )}

      <div className="related-movies-container">
        <h2 className="related-title">Related Movies</h2>
        <div className="related-movies-grid">
          {relatedMovies.map((relatedMovie) => (
            <div key={relatedMovie.id} className="related-movie-card">
              <Link to={`/movie/${relatedMovie.id}`}>
                {relatedMovie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
                    alt={relatedMovie.title}
                  />
                ) : (
                  <p>No poster available</p>
                )}
                <h3>{relatedMovie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleMovie
