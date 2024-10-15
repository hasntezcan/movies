import { useState, useEffect } from "react";
import axios from 'axios';
import MovieCard from "./MovieCard";
import './index.css';
import { useDispatch } from 'react-redux';
import { addToWatchlist, addToWatched } from './Redux';
import { useSelector } from 'react-redux';
import MovieSearch from './MovieSearch';

function Movies({ selectedGenres }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();

    const genreMap = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    const watchlist = useSelector((state) => state.movies.watchlist);
    const watched = useSelector((state) => state.movies.watched);


    const fetchDirector = async (movieId) => {
        try {
            const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a008dc6c44af615eb0cd84212de73eb3`);
            const director = creditsResponse.data.crew.find(member => member.job === 'Director');
            return director ? director.name : 'Unknown';
        } catch (error) {
            console.error(`Error fetching director for movie ID ${movieId}: `, error);
            return 'Unknown';
        }
    };

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=a008dc6c44af615eb0cd84212de73eb3&page=${currentPage}`);
            const movieData = response.data.results;
    
            let filteredMovies = [];
            if (selectedGenres.length > 0) {
                filteredMovies = movieData.filter(movie =>
                    movie.genre_ids.some(genreId => selectedGenres.includes(genreMap[genreId]))
                );
            } else {
                filteredMovies = movieData;
            }
    
            const moviesWithDirectors = await Promise.all(filteredMovies.map(async movie => {
                const director = await fetchDirector(movie.id);
                return { ...movie, director };  
            }));
    
            if (selectedGenres.length > 0 && currentPage === 1) {
                setMovies(moviesWithDirectors);
            } else {
                setMovies(prevMovies => [
                    ...prevMovies,
                    ...moviesWithDirectors.filter(newMovie =>
                        !prevMovies.some(movie => movie.id === newMovie.id)
                    )
                ]);
            }
            setTotalPages(response.data.total_pages); 
        } catch (error) {
            console.log("Error fetching movies: ", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearchResults = async (searchResults) => {
        const moviesWithDirectors = await Promise.all(
            searchResults.map(async (movie) => {
                const director = await fetchDirector(movie.id);
                return { ...movie, director };
            })
        );
        setMovies(moviesWithDirectors);  
    };

    useEffect(() => {
        fetchMovies();
    }, [currentPage, selectedGenres]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const scrollY = window.scrollY;
            setCurrentPage(prevPage => prevPage + 1);
            setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 550); 
        }
    };

    return (
        <div className="container">
            <h1 className="header"> 
                <a href="/">Top Rated's</a>
            </h1>
            <MovieSearch onSearchResults={handleSearchResults} />
            {loading ? (<div className="spinner"></div>) : (
                <>
                    {console.log("Rendered Movies:", movies)}
                    <div className="grid">
                        {movies.length > 0 ? (
                            movies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                    releaseYear={new Date(movie.release_date).getFullYear()}
                                    rating={movie.vote_average}
                                    director={movie.director}
                                    movie={movie}
                                    handleAddToWatchlist={() => dispatch(addToWatchlist(movie))}
                                    handleAddToWatched={() => dispatch(addToWatched(movie))}
                                    isAddedToWatchlist={watchlist.some(item => item.id === movie.id)}
                                    isAddedToWatched={watched.some(item => item.id === movie.id)}
                                />
                            ))
                        ) : (
                            <p>No movies found.</p>
                        )}
                    </div>
                    <div className="pagination">
                        <button className="load-more" onClick={handleNextPage} disabled={currentPage >= totalPages}>Load More</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Movies;