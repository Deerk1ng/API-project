import { csrfFetch } from './csrf.js'

export const postReview = (el) => async (dispatch) => {
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
        return data
    } else return data.errors

}

export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })

    return response
}
