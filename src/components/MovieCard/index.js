import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = ({movie}) => {
  const {id, posterPath, title, voteAverage} = movie

  return (
    <li className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="movie-poster"
      />
      <div className="movie-details-card">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
      <div className="details-button">
        <Link to={`/movie/${id}`} className="details-link">
          <button type="button" className="details">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
