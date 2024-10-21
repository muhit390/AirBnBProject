import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action Creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

// Thunk Action for login
export const login = (user) => async(dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//Thunk action for Signup

export const signup = (user) => async(dispatch) => {
        const { username, firstName, lastName, email, password } = user;
        const response = await csrfFetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                username,
                firstName,
                lastName,
                email,
                password
            })
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
    //Thunk action for Logout

export const logout = () => async(dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser()); // Remove user from the state
    return response;
};

// Initial State
const initialState = { user: null };

// Session Reducer
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload };
        case REMOVE_USER:
            return {...state, user: null };
        default:
            return state;
    }
};

// Restore Session Thunk Action
export const restoreUser = () => async(dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export default sessionReducer;