import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SimpleMovieCard from './BasicMovieCard'; 
import { removeFromWatched } from './Redux';

const Watched = () => {
    const watched = useSelector((state) => state.movies.watched);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>My Watched List</h1>
            {watched.length === 0 ? (
                <p>You haven't watched any movies yet.</p>
            ) : (
                <div className="simple-movie-list">
                    {watched.map((movie) => (
                        <SimpleMovieCard
                        key={movie.id}
                        movie={movie} 
                        handleRemove={() => dispatch(removeFromWatched(movie))}
                    />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watched;