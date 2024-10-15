import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    watchlist: [],
    watched: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
        const existingMovie = state.watchlist.find(movie => movie.id === action.payload.id);
        if (!existingMovie) {
            state.watchlist.push(action.payload);
        }
    },
    addToWatched: (state, action) => {
        const existingMovie = state.watched.find(movie => movie.id === action.payload.id);
        if (!existingMovie) {
            state.watched.push(action.payload);
        }
    },
    removeFromWatchlist: (state, action) => {
        state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload.id);
    },
    removeFromWatched: (state, action) => {
        state.watched = state.watched.filter(movie => movie.id !== action.payload.id);
    },
  },
});

export const { addToWatchlist, addToWatched, removeFromWatchlist, removeFromWatched } = movieSlice.actions;

export default movieSlice.reducer;