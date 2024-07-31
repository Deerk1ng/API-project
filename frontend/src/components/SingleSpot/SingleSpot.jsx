import { useParams } from 'react-router-dom'
import './SingleSpot.css'
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import PostReviewModal from '../PostReviewModal/PostReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import * as spotActions from '../../store/spot'


const SingleSpot = () => {
    const { spotId } = useParams();
    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => state.spots[spotId]?.reviews)
    const [spot, setSpot] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() =>  {
        const getSingleSpot = async () => {
            const response = await fetch(`/api/spots/${spotId}`)

            if(response.ok) {
                const data = await response.json()
                dispatch(spotActions.getReviews(spotId))
                setSpot(data)
            }
        }

        dispatch(spotActions.getAllSpots())
        .then(getSingleSpot())
        .then(setIsLoaded(true))
    }, [dispatch, spotId])

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

    const checkCritics = (reviews =[]) => {
        const idLog = []
        reviews.forEach(review => idLog.push(review.userId))
        return idLog.includes(user.id)
    }

    return (
        <>
        {isLoaded ? <div className='spot-article'>
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
                        <div><FaStar /> {spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(2) + ' · ': ''} {spot.numReviews > 0 ? spot.numReviews + (spot.numReviews > 1 ? ' reviews' : ' review') : 'New'}</div>
                    </div>
                    <button className='reserve-button' onClick={() => alert("Feature coming soon.")}>Reserve</button>
                </div>
            </div>
            <hr width='auto'/>

            <div className='spot-reviews'>
                <h2><FaStar /> {spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(2) + ' · ': ''} {spot.numReviews > 0 ? spot.numReviews + (spot.numReviews > 1 ? ' reviews' : ' review') : 'New'}</h2>
                { (user && user.id !== spot.id && !checkCritics(reviews)) ?
                    <OpenModalButton
                    buttonText="Post Your Review"
                    className='newSpot-button'
                    modalComponent={<PostReviewModal id={spot.id}/>} />
                    : <></>}
                 {(!reviews?.length) ? ( user ? <div>Be the first to post a review!</div> : <></> ) : reviews.map(review => {
                   return ( <div key={review.firstName} className='review-container'>
                        <div className='review-name'>{review.firstName}</div>
                        <div className='review-month'>{review.date}</div>
                        <div className='spot-desc'>{review.review}</div>
                        {user?.id == review.userId ? <OpenModalButton
                            buttonText="Delete"
                            className='delete-rev'
                            modalComponent={<DeleteReviewModal prop={{spotId, id: review.id}}/>} /> : <></>}
                            </div>)
                }) }
            </div>
        </div> : <></>}
        </>
    )
}

export default SingleSpot
