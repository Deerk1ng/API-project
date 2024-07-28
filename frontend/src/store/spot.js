import { csrfFetch } from './csrf.js'

const GET_SPOT = "spots/getAllSpots"
const ADD_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'

//action creators
const loadSpots = (spots) => {
    return {
        type: GET_SPOT,
        spots
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

const removeSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

//thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(loadSpots(data));
        return data;
    }
}

export const createSingleSpot = (spot) => async (dispatch) => {
    const {address, city, state, country, lat, lng, name, description, price,} = spot
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        })
    })

    const data = await response.json();
    if(response.ok) {
        dispatch(addSpot(data))
        return data
    } else {
        return data.errors
    }
}

export const uploadImage = (id, img) => async () => {
    const {url, preview} = img
    const response = await csrfFetch(`/api/spots/${id}/images`,{
        method: 'POST',
        body: JSON.stringify({
            url,
            preview
        })
    })

    const data = await response.json()
    if(!response.ok) {
        return data.errors
    }
}

export const updateSpot = (spot) => async (dispatch) => {
    const {id, address, city, state, country, lat, lng, name, description, price,} = spot
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        })
    })

    const data = await response.json();
    if(response.ok) {
        dispatch(addSpot(data, spot.id))
        return data
    } else {
        return data.errors
    }
}

export const deleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(removeSpot(id))
        return response
    }
}

//state object

const initialState = {}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SPOT: {
            const newState = {};
            action.spots?.Spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        }
        case ADD_SPOT: {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        case DELETE_SPOT: {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer
