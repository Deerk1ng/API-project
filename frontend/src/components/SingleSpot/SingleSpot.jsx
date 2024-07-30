import { useParams } from 'react-router-dom'
import './SingleSpot.css'
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";


const SingleSpot = () => {
    const { spotId } = useParams();
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


    const imgLoop = (spotArr) => {
        const newImgArr = []
        for(let i = 0; i < 5; i++){
            const currImg = spotArr[i]
            if(currImg.preview) {
                newImgArr.push(<img key={currImg.id}  src={currImg.url} alt={`image belonging to the spot ${spot.name}`} className='preview' />)
            } else {
                newImgArr.push(<img key={currImg.id}  src={currImg.url} alt={`image belonging to the spot ${spot.name}`} className={` photo`} />)
            }

        }
        return newImgArr
    }

    return (
        <div className='spot-article'>
            <h1 className='spot-title'>{spot?.name}</h1>
            <div className='spot-location'>{spot?.city} , {spot?.state} , {spot?.country}</div>
            <div className='img-cont'>
                {spot.SpotImages ? imgLoop(spot.SpotImages) : <></>}
            </div>
            <div className='cont'>
                <div className='disc-container'>
                    <h2 className='spot-host'>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
                    <div className='spot-desc'>{spot?.description}</div>
                </div>
                <div className='reserve-cont'>
                    <div className='reserve-box'>
                        <div>$<span className='spot-price'>{spot?.price}</span> night</div>
                        <div><FaStar /> {spot?.avgStarRating > 0 ? spot?.avgStarRating + ' | ': ''} {spot?.numReviews > 0 ? spot?.numReviews + ' review(s)' : 'New'}</div>
                    </div>
                    <button className='reserve-button'>Reserve</button>
                </div>
            </div>
            <hr width='auto'/>

            <div className='spot-reviews'>
                <h2><FaStar /> {spot?.avgStarRating > 0 ? spot?.avgStarRating.toFixed(2) + ' | ': ''} {spot?.numReviews > 0 ? spot?.numReviews + ' review(s)' : 'New'}</h2>
                {/* map reviews here */}
            </div>
        </div>
    )
}

export default SingleSpot
