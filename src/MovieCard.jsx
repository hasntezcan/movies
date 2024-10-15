import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromWatched, removeFromWatchlist } from './Redux';
import './Movies';

function MovieCard({ title, posterPath, releaseYear, rating, director, handleAddToWatchlist, handleAddToWatched, movie, isAddedToWatchlist, isAddedToWatched }) {
    const dispatch = useDispatch();
    console.log('Movie ID:', movie.id);
    
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`} className="movie-card-link">
                <img
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`|| 'Unknown'}
                    alt={title}
                    className="image"
                />
                <h2 className="title">{title}</h2>
                <p className="director"><strong>Director:</strong> {director || 'Unknown'}</p>
                <p className="rating"><strong>Rating:</strong>  {rating ? rating.toFixed(1) : 'No rating available'}</p>
                <p className="date">{releaseYear || 'Unknown'}</p>
            </Link>
            <div className="button-group">
                <button
                    className={isAddedToWatchlist ? "button-added" : "button-default"}
                    onClick={isAddedToWatchlist ? () => dispatch(removeFromWatchlist(movie)) : handleAddToWatchlist}
                >
                    {!isAddedToWatchlist && "Add to Watchlist"}
                </button>
                
                <button
                    className={isAddedToWatched ? "button-added" : "button-default"}
                    onClick={isAddedToWatched ? () => dispatch(removeFromWatched(movie)) : handleAddToWatched}
                >
                    {!isAddedToWatched && "Add to Watched"}
                </button>
            </div>
        </div>
    );
}

export default MovieCard;