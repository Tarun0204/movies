import { useState, useEffect, useCallback } from 'react'
import './index.css'

const MovieCastDetails = ({ movieId }) => {
  const [movieCastDetailsList, setMovieCastDetailsList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth <= 767 ? 2 : 5,
  )
  
  const getMovieCastDetailsData = useCallback(async () => {
    const API_KEY = '01ca710ad13f33343ec30512b0563c3e'
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const responseData = await response.json()
        const updatedData = responseData.cast.map(eachCast => ({
          id: eachCast.id,
          originalName: eachCast.original_name,
          character: eachCast.character,
          profilePath: eachCast.profile_path,
        }))
        setMovieCastDetailsList(updatedData)
      } else {
        console.error('Failed to fetch data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [movieId])

  useEffect(() => {
    getMovieCastDetailsData()
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 767 ? 2 : 5)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getMovieCastDetailsData]) 

  const handleNext = () => {
    if (currentIndex + itemsPerPage < movieCastDetailsList.length) {
      setCurrentIndex(prevIndex => prevIndex + itemsPerPage)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - itemsPerPage)
    }
  }

  const visibleCast = movieCastDetailsList.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  )

  return (
    <div className="movie-cast">
      <h1 className="cast-heading">Top Billed Cast</h1>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-button previous-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="carousel-button next-button"
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= movieCastDetailsList.length}
        >
          Next
        </button>
      </div>
      <ul className="movie-cast-cards">
        {visibleCast.map(cast => (
          <li key={cast.id} className="cast-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${cast.profilePath}`}
              alt={cast.originalName}
              className="cast-profile-image"
            />
            <div className="cast-details">
              <h2 className="cast-name">{cast.originalName}</h2>
              <p className="cast-character">Character: {cast.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieCastDetails
