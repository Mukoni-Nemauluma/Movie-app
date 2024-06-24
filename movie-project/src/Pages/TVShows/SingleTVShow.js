import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTVShowDetails, fetchRelatedTVShows, fetchTVCredits, fetchTVVideos } from '../../util/API';
import '../../Design.css';
import useScrollToTop from "../../ScrollToTop";

const SingleTVShow = () => {
  useScrollToTop();
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [relatedTVShows, setRelatedTVShows] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [director, setDirector] = useState("");
  const [company, setCompany] = useState({ name: "", logo_path: "" });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const tvShowResponse = await fetchTVShowDetails(id);
        setTVShow(tvShowResponse);

        const relatedResponse = await fetchRelatedTVShows(id);
        setRelatedTVShows(relatedResponse.results.slice(0, 8) || []);

        const creditsResponse = await fetchTVCredits(id);
        const mainCast = creditsResponse.cast.slice(0, 5) || [];
        setCredits(mainCast);

        const directorInfo = creditsResponse.crew.find(
          (member) => member.job === "Director"
        );
        setDirector(directorInfo ? directorInfo.name : "N/A");

        const productionCompany = tvShowResponse.production_companies[0] || { name: "N/A", logo_path: null };
        setCompany(productionCompany);

        const videosResponse = await fetchTVVideos(id);
        setVideos(videosResponse.results || []);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!tvShow) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-tvshow-container">
      <div
        className="tvshow-details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
        }}
      >
        <div className="color-overlay"></div>
        <div className="tvshow-content">
          <h1 className="tvshow-title">{tvShow.name}</h1>
          {tvShow.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.name} />
          ) : (
            <p>No poster available</p>
          )}
          <p className="tvshow-info"><strong>First Air Date:</strong> {tvShow.first_air_date}</p>
          <p className="tvshow-info"><strong>Number of Seasons:</strong> {tvShow.number_of_seasons}</p>
          <p className="tvshow-info"><strong>Number of Episodes:</strong> {tvShow.number_of_episodes}</p>
          <p className="tvshow-info"><strong>Language:</strong> {tvShow.original_language}</p>
          <p className="tvshow-info"><strong>Rating:</strong> {tvShow.vote_average} ({tvShow.vote_count} votes)</p>
          <p className="tvshow-desc"><strong>Overview:</strong> {tvShow.overview}</p>
          <p className="tvshow-info"><strong>Director:</strong> {director}</p>
          <div className="production-company">
            <p className="tvshow-info"><strong>Production Company:</strong> {company.name}</p>
            {company.logo_path && (
              <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} />
            )}
          </div>
        </div>
      </div>

      <h2 className="related-title">Cast</h2>
      <ul className="cast-list">
        {credits.map((actor) => (
          <li key={actor.id} className="cast-item">
            <Link to={`/actors/${actor.id}`}>
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              ) : (
                <p>No image available</p>
              )}
              <h3 className="actor-name"><strong>{actor.name}</strong></h3>
              <p>Role: {actor.character}</p>
            </Link>
          </li>
        ))}
      </ul>

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

      <h2 className="related-title">Related TV Shows</h2>
      <div className="related-tvshows-grid">
        {relatedTVShows.map((relatedTVShow) => (
          <div key={relatedTVShow.id} className="related-tvshow-card">
            <Link to={`/tv/${relatedTVShow.id}`}>
              {relatedTVShow.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${relatedTVShow.poster_path}`} alt={relatedTVShow.name} />
              ) : (
                <p>No poster available</p>
              )}
              <h3>{relatedTVShow.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleTVShow;
