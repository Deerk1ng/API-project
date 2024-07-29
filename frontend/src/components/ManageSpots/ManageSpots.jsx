import '../SpotsPage/SpotsPage.css'
import { useEffect } from 'react'
import Spots from '../Spots/Spots';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageSpots = () => {
    const [spots, setSpots] = useState([]) // get current user spots
    const navigate = useNavigate()
    useEffect(() => {
        const getCurrentSpots = async () => {
            const response = await fetch('/api/spots/current')
            const data = await response.json()
            setSpots(data.Spots)
        }
        getCurrentSpots()
    }, [spots])

    return (
        <>
            <div className='header-container'>
                <h1>Manage Spots</h1>
                <button className='curr-button' onClick={() => navigate('/spots/new')} >Create a New Spot</button>
            </div>
            <div className='spots-container'>
                {spots.map((spot) => <Spots key={spot.id} spots={spot} isCurrent={true}/>)}
            </div>
        </>
    )
}

export default ManageSpots;
