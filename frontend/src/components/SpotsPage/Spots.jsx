import './SpotsPage.css'
import { FaStar } from 'react-icons/fa'


const Spots = (spot) => {
    spot = spot.spots
    return (
        <div title={spot.name} className="spot-card" onClick={e => onClick(spot.id)}>
            <img src={spot.previewImage} alt="preview of spot" className="prevImg"/>
            <div className='spot-preview'>
                <div className="spot-addy">{spot.city},{spot.state}</div>
                <div className="spot-rating"><FaStar /> {spot.avgRating > 0 ? Math.round(spot.avgRating * 100) / 100 : 'New'}</div>
            </div>
                <div className="spot-price">${spot.price} night</div>
        </div>
    )
}

export default Spots
