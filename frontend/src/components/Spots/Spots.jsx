import './Spots.css'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal'


const Spots = (spot) => {
    const navigate = useNavigate();
    const isCurrent = spot.isCurrent
    spot = spot.spots

    return (
        <div className='curr-container'>
        <div title={spot.name} className="spot-card" onClick={() => navigate(`/spots/${spot.id}`)}>
            <img src={spot.previewImage} alt="preview of spot" className="prevImg"/>
            <div className='spot-preview'>
                <div className="spot-addy">{spot.city},{spot.state}</div>
                <div className="spot-rating"><FaStar /> {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}</div>
            </div>
                <div className="spot-price">${spot.price} night</div>
        </div>
            {isCurrent == true ? (
                <span className='button-container'>
                    <button className='newSpot-button' onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                    <OpenModalButton
                    buttonText="Delete"
                    className='newSpot-button'
                    modalComponent={<DeleteSpotModal id={spot.id}/>}
                    />
                </span>
            ) : (<></>)}
        </div>

    )
}

export default Spots
