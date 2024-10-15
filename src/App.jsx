import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import Watchlist from './Watchlist';
import Watched from './Watched';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const filterByGenre = (genre) => {
        setSelectedGenres(prevGenres => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter(g => g !== genre);
            }
            return [...prevGenres, genre];
        });
    };
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 300) {
            setShowScrollToTop(true);
          } else {
            setShowScrollToTop(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY < document.documentElement.scrollHeight - window.innerHeight - 300) {
            setShowScrollToBottom(true);
          } else {
            setShowScrollToBottom(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);


    return (
        <Provider store={store}>
            <Router>
                <div className="app-container">
                    <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={`sidebar ${isMenuOpen ? "active" : ""}`}>
                        <h2>Menu</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/watchlist">Watchlist</a></li>
                            <li><a href="/watched">Watched List</a></li>
                        </ul>
                        <h3>Genres</h3>
                        <div className="genre-list">
                            <button
                                onClick={() => filterByGenre("Action")}
                                className={selectedGenres.includes("Action") ? "active-genre" : ""}
                            >
                                Action
                            </button>
                            <button
                                onClick={() => filterByGenre("Adventure")}
                                className={selectedGenres.includes("Adventure") ? "active-genre" : ""}
                            >
                                Adventure
                            </button>
                            <button
                                onClick={() => filterByGenre("Comedy")}
                                className={selectedGenres.includes("Comedy") ? "active-genre" : ""}
                            >
                                Comedy
                            </button>
                            <button
                                onClick={() => filterByGenre("Drama")}
                                className={selectedGenres.includes("Drama") ? "active-genre" : ""}
                            >
                                Drama
                            </button>
                            <button
                                onClick={() => filterByGenre("Thriller")}
                                className={selectedGenres.includes("Thriller") ? "active-genre" : ""}
                            >
                                Thriller
                            </button>
                            <button
                                onClick={() => filterByGenre("Horror")}
                                className={selectedGenres.includes("Horror") ? "active-genre" : ""}
                            >
                                Horror
                            </button>
                            <button
                                onClick={() => filterByGenre("Crime")}
                                className={selectedGenres.includes("Crime") ? "active-genre" : ""}
                            >
                                Crime
                            </button>
                            <button
                                onClick={() => filterByGenre("Science Fiction")}
                                className={selectedGenres.includes("Science Fiction") ? "active-genre" : ""}
                            >
                                Science Fiction
                            </button>
                            <button
                                onClick={() => filterByGenre("War")}
                                className={selectedGenres.includes("War") ? "active-genre" : ""}
                            >
                                War
                            </button>
                            <button
                                onClick={() => filterByGenre("Documentary")}
                                className={selectedGenres.includes("Documentary") ? "active-genre" : ""}
                            >
                                Documentary
                            </button>
                            <button
                                onClick={() => filterByGenre("Animation")}
                                className={selectedGenres.includes("Animation") ? "active-genre" : ""}
                            >
                                Animation
                            </button>
                            <button
                                onClick={() => filterByGenre("Western")}
                                className={selectedGenres.includes("Western") ? "active-genre" : ""}
                            >
                                Western
                            </button>
                            <button
                                onClick={() => filterByGenre("Mystery")}
                                className={selectedGenres.includes("Mystery") ? "active-genre" : ""}
                            >
                                Mystery
                            </button>
                            <button
                                onClick={() => filterByGenre("Romance")}
                                className={selectedGenres.includes("Romance") ? "active-genre" : ""}
                            >
                                Romance
                            </button>
                            <button
                                onClick={() => filterByGenre("Family")}
                                className={selectedGenres.includes("Family") ? "active-genre" : ""}
                            >
                                Family
                            </button>
                            <button
                                onClick={() => filterByGenre("History")}
                                className={selectedGenres.includes("History") ? "active-genre" : ""}
                            >
                                History
                            </button>
                        </div>
                        <button
                            className={`scroll-to-bottom ${showScrollToBottom ? "show" : ""}`}
                            onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
                            >↓ Go to Bottom
                        </button>
                        <button
                            className={`scroll-to-top ${showScrollToTop ? "show" : ""}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >↑ Back to Top
                        </button>
                            
                    </div>
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Movies selectedGenres={selectedGenres} />} />
                            <Route path="/movie/:id" element={<MovieDetails />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/watched" element={<Watched />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;