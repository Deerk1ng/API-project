import { csrfFetch } from './csrf.js'

const GET_SPOT = "spots/getAllSpots"
const ADD_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'
////////////////////////////////////////////////////////////////
const GET_REVIEW = "reviews/getAllReviews"
const ADD_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'
////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////
const loadReviews = (spotId, reviews) => {
    return {
        type: GET_REVIEW,
        spotId,
        reviews
    }
}

const addReview = (spotId,review) => {
    return {
        type: ADD_REVIEW,
        spotId,
        review
    }
}

const removeReview = (spotId,id) => {
    return {
        type: DELETE_REVIEW,
        spotId,
        id
    }
}
///////////////////////////////////////////////////////
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
        console.log('delete response ok')
        dispatch(removeSpot(id))
        return response
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getReviews = (spotId) => async (dispatch) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
        const data = await response.json()
        const arr = data.Reviews
        const reviewsArr = (arr.map(el => {
            const { review, User, createdAt, id } = el
            const firstName = User.firstName
            const userId = User.id
            const dateFormatted = new Date(createdAt)
            const date = months[dateFormatted.getMonth()] + " " + dateFormatted.getFullYear()
            return {
                id,
                firstName,
                userId,
                date,
                review,
                dateFormatted
            }
        }))
        reviewsArr.sort((a, b) => a.dateFormatted - b.dateFormatted)
        dispatch(loadReviews(spotId,reviewsArr))
        return reviewsArr
    }
}

export const postReview = (el) => async (dispatch) => {
    console.log("el: ", el)
    const {id, review, stars} = el
    console.log("postReview id: ", id)
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars,
        })
    })

    const data = await response.json();
    console.log("postReview id: ", id)
    if(response.ok){
        dispatch(addReview(id,data))
        return data
    } else {
        return data.errors
    }

}

export const deleteReview = (spotId, id) => async (dispatch) => {
    console.log('before response. this is spotId + id: ', spotId, id)
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        console.log('delete response ok. this is spotId: ', spotId, id)
        dispatch(removeReview(spotId, id))
        return response
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        case GET_REVIEW: {
            const newState = {...state};
            newState[action.spotId]["reviews"] = action.reviews?.map((review) => review)
            // action.spots?.Spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        }
        case ADD_REVIEW: {
            const newState = {...state}
            const newSpot = newState[action.spotId]
            console.log("newSpot: ",newSpot)
            console.log("newstate[id]: ",newState[action.spotId])
            console.log('newState: ', newState, "spotId: ", action.spotId)
            // if(!newSpot?.reviews.length) newSpot['reviews'] = []
            newSpot.reviews.push(action.review)
            // newState[action.spotId]['reviews'].push(action.review)
            // newState[action.spot.id] = action.spot
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            console.log("new state reviews: ", action.spotId)
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer
