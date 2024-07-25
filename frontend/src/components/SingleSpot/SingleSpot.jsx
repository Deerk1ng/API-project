import { useParams } from 'react-router-dom'
import './SingleSpot.css'
import { useEffect, useState } from 'react';

const SingleSpot = () => {
    const { spotId } = useParams();
    // const singleSpot = useSelector((state) => state.spot[spotId])
    const [spot, setSpot] = useState({})

    useEffect(() =>  {
        const getSingleSpot = async () => {
            const response = await fetch(`/api/spots/${spotId}`)

            if(response.ok) {
                const data = await response.json()
                setSpot(data)
            }
        }
        getSingleSpot()
    }, [spotId])

    return (
        <div className='spot-article'>
            <h1 className='spot-title'>{spot?.name}</h1>
            <div className='spot-location'>{spot?.city} , {spot?.state} , {spot?.country}</div>
            <div>
                {spot?.SpotImages?.map(image => <img key={image.id}  src={image.url} alt={`image ${image.id} belonging to the spot ${spot.name}`}/>  )}
            </div>
            <h2 className='spot-host'>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
            <div className='spot-desc'>{spot?.description}</div>
            <div>
                <div className='spot-price'>
                    <span>{spot?.price}</span> <span>night</span>
                </div>
                <div className='reserve-box'>
                    <div>{spot?.avgStarRating}</div>
                    <div>{spot?.numReviews}</div>
                    <button className='reserve-button'>Reserve</button>
                </div>
            </div>

            <hr width='auto'/>

            <div className='spot-reviews'>
                <span>{spot.avgStarRating} </span>
                <span>{spot.numReviews}</span>
                {/* map reviews here */}
            </div>
        </div>
    )
}

export default SingleSpot
