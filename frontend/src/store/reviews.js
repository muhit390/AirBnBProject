import { csrfFetch } from './csrf';

// Action Types
const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const EDIT_REVIEW = 'reviews/editReview';
const REMOVE_REVIEW = 'reviews/removeReview';

// Action Creators
const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review,
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId,
});

// Thunk to Fetch Reviews for a Spot
export const fetchSpotReviews = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews.Reviews));
    }
};

// Thunk to Add a Review
export const postReview = (spotId, reviewData) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));


        return newReview;
    } else {
        const error = await response.json();
        throw error;
    }
};

// Thunk to Edit a Review
export const updateReview = (reviewId, reviewData) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updatedReview));
    }
};

// Thunk to Delete a Review
export const deleteReview = (reviewId) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
};

// Initial State
const initialState = {};

// Reviews Reducer
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {

        // Wrap LOAD_REVIEWS case block in curly braces to avoid the lexical declaration error
        case LOAD_REVIEWS: {
            const newState = {};  // Declare newState inside the block
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;  // Return the new state
        }

        // Wrap ADD_REVIEW case block in curly braces
        case ADD_REVIEW: {
            return { ...state, [action.review.id]: action.review };
        }

        // Wrap EDIT_REVIEW case block in curly braces
        case EDIT_REVIEW: {
            return { ...state, [action.review.id]: action.review };
        }

        // Wrap REMOVE_REVIEW case block in curly braces
        case REMOVE_REVIEW: {
            const newStateAfterDelete = { ...state };  // Declare newStateAfterDelete inside the block
            delete newStateAfterDelete[action.reviewId];
            return newStateAfterDelete;
        }

        default:
            return state;
    }
};

export default reviewsReducer;
