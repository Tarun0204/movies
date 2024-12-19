import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { ThreeDots } from "react-loader-spinner";
import MovieCastDetails from "../MovieCastDetails";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import "./index.css";

const SingleMoviePage = () => {
  const { id } = useParams();
  const [singleMoviePage, setSingleMoviePage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSingleMoviePageData = async () => {
      const API_KEY = "01ca710ad13f33343ec30512b0563c3e";
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const responseData = await response.json();
          setSingleMoviePage({
            id: responseData.id,
            posterPath: responseData.poster_path,
            originalTitle: responseData.original_title,
            overview: responseData.overview,
            popularity: responseData.popularity,
            tagline: responseData.tagline,
            releaseDate: responseData.release_date,
            genres: responseData.genres,
            runtime: responseData.runtime,
            revenue: responseData.revenue,
            voteAverage: responseData.vote_average,
            voteCount: responseData.vote_count,
            homepage: responseData.homepage,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getSingleMoviePageData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="single-movie-page">
        {isLoading ? (
          <div className="loader-container">
            <ThreeDots type="TailSpin" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <>
            <div className="back-button-container">
              <Link to="/">
                <button type="button" className="back-btn">
                  Back to Home
                </button>
              </Link>
            </div>
            <div className="movie-details">
              <img
                src={`https://image.tmdb.org/t/p/w500${singleMoviePage.posterPath}`}
                alt={singleMoviePage.originalTitle}
              />
              <div className="movie-content">
                <h1 className="title">{singleMoviePage.originalTitle}</h1>
                <p className="title-para">{singleMoviePage.overview}</p>
                <p className="title-para"><strong>Tagline: </strong>{singleMoviePage.tagline}</p>
                <p className="title-para">
                <strong>Release Date: </strong> {singleMoviePage.releaseDate}
                </p>
                <p className="title-para">
                <strong>Popularity: </strong>{singleMoviePage.popularity}
                </p>
                <p className="title-para">
                <strong>Runtime: </strong>{singleMoviePage.runtime} minutes
                </p>
                <p className="title-para">
                <strong>Revenue: </strong>${singleMoviePage.revenue}
                </p>
                <p className="title-para">
                <strong>Vote Average: </strong>{singleMoviePage.voteAverage}
                </p>
                <p className="title-para">
                <strong>Vote Count: </strong>{singleMoviePage.voteCount}
                </p>

                <h3>Genres:</h3>
                <ul>
                  {singleMoviePage.genres.map((genre) => (
                    <li className="genres-list" key={genre.id}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="cast-details">
        <MovieCastDetails movieId={id} />
      </div>
    </>
  );
};

export default SingleMoviePage;
