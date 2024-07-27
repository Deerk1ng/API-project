import './SpotsPage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spot'
import Spots from '../Spots/Spots';


const SpotsPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots)
    const spotList = Object.values(spots) //get spots here

    useEffect(() => {
        dispatch(spotActions.getAllSpots())
    }, [dispatch])

    return (
        <div className='spots-container'>
            {spotList?.map((spot) => <Spots key={spot.id} spots={spot} isCurrent={'false'} />)}
        </div>
    )
}

export default SpotsPage;
