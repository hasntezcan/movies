
function SimpleMovieCard({ movie, handleRemove }) {
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
    if (!movie || !movie.title) {
        return <div>Invalid movie data</div>;
    }
    return (
        <div className="simple-movie-card">
            <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`||'unknown'}
                alt={movie.title}
            />
            <div>
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre_ids && movie.genre_ids.length > 0 
                    ? movie.genre_ids.map(id => genreMap[id] || 'Unknown').join(', ') 
                    : 'No genres available'}</p>
                <p>Director: {movie.director || 'Unknown'}</p>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
}
export default SimpleMovieCard;