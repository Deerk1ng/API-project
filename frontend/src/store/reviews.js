import { csrfFetch } from './csrf.js'

const GET_REVIEW = "reviews/getAllReviews"
const ADD_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

//action creators
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




export const getReviews = (spotId) => async (dispatch) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
        const data = await response.json()
        const arr = data.Reviews
        const reviewsArr = (arr.map(el => {
            const { review, User, createdAt, id, stars } = el
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
                dateFormatted,
                stars,
            }
        }))
        dispatch(loadReviews(spotId,reviewsArr))
        return reviewsArr
    }
}

export const postReview = (el, user) => async (dispatch) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const {spotId, review, stars} = el
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars,
        })
    })

    const data = await response.json();
    if(response.ok){
        const { review, createdAt, id } = data
        const firstName = user.firstName
        const userId = user.id
        const dateFormatted = new Date(createdAt)
        const date = months[dateFormatted.getMonth()] + " " + dateFormatted.getFullYear()
        const newRev = {
            id,
            firstName,
            userId,
            date,
            review,
            dateFormatted,
            stars,
        }
        dispatch(addReview(spotId,newRev))
        return newRev
    } else {
        return data.errors
    }

}

export const deleteReview = (spotId, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(removeReview(spotId, id))
        return response
    }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEW: {
            const newState = {};
            action.reviews.forEach((review) => newState[review.id] = review);
            return newState;
        }
        case ADD_REVIEW: {
            const newState = {...state}
            newState[action.review.id] = action.review
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
