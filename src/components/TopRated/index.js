import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import "./index.css";

class TopRated extends Component {
  state = {
    topRatedData: [],
    isLoading: true,
    currentPage: 1,
    totalPages: 1,
    searchQuery: "",
  };

  componentDidMount() {
    this.getTopRatedData();
  }

  getTopRatedData = async () => {
    const { currentPage, searchQuery } = this.state;
    const API_KEY = "01ca710ad13f33343ec30512b0563c3e";
    const apiUrl = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${currentPage}&query=${searchQuery}`
      : `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.results.map((eachMovie) => ({
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          voteAverage: eachMovie.vote_average,
          title: eachMovie.title,
        }));
        this.setState({
          topRatedData: updatedData,
          isLoading: false,
          totalPages: responseData.total_pages,
        });
      } else {
        console.error("Failed to fetch data:", response.status);
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ isLoading: false });
    }
  };

  handlePageChange = (pageNumber) => {
    this.setState(
      {
        currentPage: pageNumber,
        isLoading: true,
      },
      this.getTopRatedData
    );
  };

  handleSearch = (searchQuery) => {
    this.setState(
      { searchQuery, currentPage: 1, isLoading: true },
      this.getTopRatedData
    );
  };

  render() {
    const { topRatedData, isLoading, currentPage, totalPages } = this.state;
    return (
      <>
        <Navbar onSearch={this.handleSearch} />
        <div className="topRated-container">
          {isLoading ? (
            <div className="jobs-loader-container" data-testid="loader">
              <ThreeDots
                type="ThreeDots"
                color="#0000"
                height="50"
                width="50"
              />
            </div>
          ) : (
            <ul className="movies-list">
              {topRatedData.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default TopRated;
