import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SimpleMovieCard from './BasicMovieCard';
import { removeFromWatchlist } from './Redux';

const Watchlist = () => {
    const watchlist = useSelector((state) => state.movies.watchlist);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>My Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="simple-movie-list">
                    {watchlist.map((movie) => (
                        <SimpleMovieCard
                        key={movie.id}
                        movie={movie} 
                        handleRemove={() => dispatch(removeFromWatchlist(movie))}
                    />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;