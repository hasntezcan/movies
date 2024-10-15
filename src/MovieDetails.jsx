import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';  //
import { addToWatchlist , addToWatched , removeFromWatched, removeFromWatchlist } from './Redux';
import './index.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const dispatch = useDispatch(); 

    const watchlist = useSelector(state => state.movies.watchlist);
    const watched = useSelector(state => state.movies.watched);

    const isAddedToWatchlist = watchlist.some(item => item.id === parseInt(id));
    const isAddedToWatched = watched.some(item => item.id === parseInt(id));


    useEffect(() => {
        const fetchMovieDetails = async () => {
            console.log('Fetching movie details for ID:', id);
            try {
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a008dc6c44af615eb0cd84212de73eb3`);
                setMovie(movieResponse.data);
                console.log('Movie Response:', movieResponse.data);
            
                const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=a008dc6c44af615eb0cd84212de73eb3`);
                setCredits(creditsResponse.data);
                console.log('Credits Response:', creditsResponse.data);
            } catch (error) {
                console.log(error);
                return <div>Error fetching movie details. Please try again later.</div>;
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie||!credits) return <div>Loading...</div>;

    const director = credits.crew.find(member => member.job === 'Director');

    return (
        <div className="movie-details-container">
        <div className="movie-details-box">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`||'unknown'} alt={movie.title} />
            <div className="movie-info">
                <h1>{movie.title}</h1>
                <p className="overview"><strong>Overview:</strong> {movie.overview||'Unknown'}</p>
                <p><strong>Release Date:</strong> {movie.release_date||'Unknown'}</p>
                <p><strong>Rating:</strong> {movie.vote_average||'Unknown'}</p>
                <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')||'Unknown'}</p>
                <p className="cast"><strong>Cast:</strong> {credits.cast.slice(0, 5).map(actor => actor.name).join(', ')||'Unknown'}</p>
                <p className="director"><strong>Director:</strong> {director ? director.name : 'Unknown'}</p>
                <p className="budget"><strong>Budget:</strong> ${movie.budget.toLocaleString() || 'Unknown'}</p>
                <p className="runtime"><strong>Runtime:</strong> {movie.runtime||'Unknown'} minutes</p>
                <div className="button-group">
                    <button
                            className={isAddedToWatchlist ? "button-added" : "button-default"}
                            onClick={() => {
                                if (isAddedToWatchlist) {
                                    dispatch(removeFromWatchlist(movie));
                                } else {
                                    dispatch(addToWatchlist(movie));  
                                }
                            }}
                        >
                            {!isAddedToWatchlist ? "Add to Watchlist" : ""}
                        </button>
                        
                        <button
                            className={isAddedToWatched ? "button-added" : "button-default"}
                            onClick={() => {
                                if (isAddedToWatched) {
                                    dispatch(removeFromWatched(movie));  
                                } else {
                                    dispatch(addToWatched(movie));  
                                }
                            }}
                        >
                            {!isAddedToWatched ? "Add to Watched" : ""}
                    </button>
                </div>
            
            </div>
        </div>
    </div>
    );
}

export default MovieDetails;