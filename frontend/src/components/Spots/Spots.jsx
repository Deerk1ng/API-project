import './Spots.css'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'



const Spots = (spot) => {
    const navigate = useNavigate();
    console.log(spot.isCurrent)
    const isCurrent = spot.isCurrent
    console.log(isCurrent)
    spot = spot.spots
    return (
        <div className='curr-container'>
        <div title={spot.name} className="spot-card" onClick={() => navigate(`/spots/${spot.id}`)}>
            <img src={spot.previewImage} alt="preview of spot" className="prevImg"/>
            <div className='spot-preview'>
                <div className="spot-addy">{spot.city},{spot.state}</div>
                <div className="spot-rating"><FaStar /> {spot.avgRating > 0 ? Math.round(spot.avgRating * 100) / 100 : 'New'}</div>
            </div>
                <div className="spot-price">${spot.price} night</div>
        </div>
            {isCurrent == true ? (
                <span className='button-container'>
                    <button className='newSpot-button' onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                    <button className='newSpot-button' >Delete</button>
                </span>
            ) : (<></>)}
        </div>

    )
}

export default Spots
