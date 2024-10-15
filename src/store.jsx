import { configureStore } from '@reduxjs/toolkit';
import { movieSlice } from './Redux'; 
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
    },
    preloadedState: loadState()  
});
store.subscribe(() => {
    saveState(store.getState());
});
export default store;