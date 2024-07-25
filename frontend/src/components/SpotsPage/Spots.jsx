import './SpotsPage.css'


const Spots = (spot) => {
    spot = spot.spots
    return (
        <div className="spot-card">
            <img src={spot.previewImage} alt="preview of spot" className="prevImg"/>
            <div className='spot-preview'>
                <div className="spot-addy">{spot.city},{spot.state}</div>
                <div className="spot-rating">{Math.round(spot.avgRating * 100) / 100}</div>
            </div>
                <div className="spot-price">${spot.price} night</div>
        </div>
    )
}

export default Spots
