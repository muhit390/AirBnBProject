import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import for redux-thunk
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews'; // Add your reviewsReducer if you have one

// Combine your reducers
const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotsReducer,
    reviews: reviewsReducer, // Add reviews to the store
});

// Set up middleware and enhancer
let enhancer;

if (
    import.meta.env.MODE === 'production') {
    // In production, apply only Thunk middleware
    enhancer = applyMiddleware(thunk);
} else {
    // Dynamic import for redux-logger in development
    const logger = (await
        import ('redux-logger')).default;
    // Use Redux DevTools if available, or fallback to default compose
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // Apply Thunk and Logger middleware in development
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Configure the store
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer); // Create the store with the rootReducer, preloaded state, and enhancer
};

export default configureStore;