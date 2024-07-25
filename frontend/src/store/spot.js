const GET_SPOT = "spots/getAllSpots"
const SINGLE_SPOT = '/spots/getSingleSpot'

//action creators
const loadSpots = (spots) => {
    return {
        type: GET_SPOT,
        spots
    }
}


//thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(loadSpots(data));
        return data;
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
        default:
            return state;
    }
}

export default spotsReducer
