import React, { useState } from 'react';
import axios from 'axios';
function MovieSearch({ onSearchResults }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            try {
                const response = await axios.get
                (`https://api.themoviedb.org/3/search/movie?api_key=a008dc6c44af615eb0cd84212de73eb3&query=${query}`);
                const searchResults = response.data.results;
                setSuggestions(searchResults.slice(0, 5));
            } catch (error) {console.error("Error fetching movie suggestions: ", error);}
        } else { setSuggestions([]);}
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleFullSearch();  
        }
    };
    const handleFullSearch = async () => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get
                (`https://api.themoviedb.org/3/search/movie?api_key=a008dc6c44af615eb0cd84212de73eb3&query=${searchQuery}`);
                const searchResults = response.data.results;
                onSearchResults(searchResults); 
            } catch (error) {
                console.error("Error fetching movie results: ", error);
            }
        }
    };
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            />
            {isFocused && suggestions.length > 0 && (
            <ul className="suggestions-list">
                {suggestions.map(movie => (
                    <li key={movie.id} onClick={() => handleFullSearch(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}
export default MovieSearch;