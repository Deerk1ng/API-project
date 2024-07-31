import { csrfFetch } from './csrf.js'

const GET_REVIEW = "reviews/getAllReviews"
const ADD_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

//action creators
const loadReviews = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const removeReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}




export const getReview = (spotId) => async (dispatch) => {
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
        dispatch(loadReviews(reviewsArr))
        return reviewsArr
    }
}

export const postReview = (el) => async (dispatch) => {
    const {id, review, stars} = el
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars,
        })
    })

    const data = await response.json();
    if(response.ok){
        dispatch(addReview(data))
        return data
    } else {
        return data.errors
    }

}

export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(removeReview(id))
        return response
    }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEW: {
            const newState = {...state};
            action.spots?.Spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        }
        case ADD_REVIEW: {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}

export default reviewsReducer
