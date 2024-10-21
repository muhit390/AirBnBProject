import { csrfFetch } from './csrf';

// Action Types
const LOAD_SPOT = 'spots/loadSpot';
const LOAD_SPOTS = 'spots/loadSpots';
const CREATE_SPOT = 'spots/createSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const LOAD_USER_SPOTS = 'spots/loadUserSpots';

// Action Creators
const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
});

const loadUserSpots = (spots) => ({
    type: LOAD_USER_SPOTS,
    spots,
});

const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot,
});

const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot,
});

const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
});

const updateSpotAction = (spot) => ({
    type: UPDATE_SPOT,
    spot,
});

// Thunk Action to Fetch All Spots
export const fetchSpots = () => async(dispatch) => {
    try {
        const response = await csrfFetch('/api/spots');
        if (response.ok) {
            const spotsData = await response.json();
            dispatch(loadSpots(spotsData.Spots)); // Dispatch spots data
        }
    } catch (err) {
        console.error('Error fetching spots:', err);
    }
};

// Thunk to Fetch Spots for Logged-in User
export const fetchUserSpots = () => async(dispatch) => {
    try {
        const response = await csrfFetch('/api/spots/current');  // Fetch spots for current user
        if (response.ok) {
            const userSpotsData = await response.json();
            dispatch(loadUserSpots(userSpotsData.Spots)); // Dispatch user spots data
        }
    } catch (err) {
        console.error('Error fetching user spots:', err);
    }
};

// Thunk Action to Delete a Spot
export const deleteSpot = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeSpot(spotId)); // Dispatch remove spot action
    }
};

// Thunk Action to Update a Spot
export const updateSpot = (spotId, spotData) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
    });

    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpotAction(updatedSpot)); // Dispatch updated spot
        return updatedSpot;
    }
};

// Thunk Action to Fetch a Single Spot by ID
export const fetchSpotById = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSpot(spot)); // Dispatch the spot
    }

};

// Thunk Action to Create a New Spot
export const createSpot = (spotData) => async(dispatch) => {
    try {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(spotData),
        });

        if (response.ok) {
            const newSpot = await response.json();
            dispatch(createSpotAction(newSpot)); // Dispatch the new spot
            return newSpot; // Return new spot to navigate to its details
        } else {
            const errorData = await response.json();  // Handle error
            return { errors: errorData.errors };
        }
    } catch (err) {
        console.error('Error creating spot:', err);
    }
};

// Initial State
const initialState = {};

// Spots Reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {};
            action.spots.forEach((spot) => {
                newState[spot.id] = spot; // Index spots by their ID
            });
            return newState; // Return updated state with all spots
        }
        case LOAD_USER_SPOTS: {
            const newState = {};
            action.spots.forEach((spot) => {
                newState[spot.id] = spot; // Index user spots by their ID
            });
            return newState;
        }
        case LOAD_SPOT: {
            return { ...state, [action.spot.id]: action.spot }; // Load single spot
        }
        case CREATE_SPOT: {
            return { ...state, [action.spot.id]: action.spot }; // Add new spot to state
        }
        case REMOVE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId]; // Remove deleted spot
            return newState;
        }
        case UPDATE_SPOT: {
            return { ...state, [action.spot.id]: action.spot }; // Update spot in state
        }
        default:
            return state;
    }
};

export default spotsReducer;
