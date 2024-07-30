import { useParams } from 'react-router-dom'
import './SingleSpot.css'
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';


const SingleSpot = () => {
    const { spotId } = useParams();
    const user = useSelector((state) => state.session.user)
    const [spot, setSpot] = useState({})
    const [reviews, setReviews] = useState([])
    const [critics, setCritics] = useState([])

    useEffect(() =>  {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const getSingleSpot = async () => {
            const response = await fetch(`/api/spots/${spotId}`)

            if(response.ok) {
                const data = await response.json()
                setSpot(data)
            }
        }
        const getReviews = async () => {
            const response = await fetch(`/api/spots/${spotId}/reviews`)

            if(response.ok) {
                const data = await response.json()
                const arr = data.Reviews
                const idLog = []
                const reviewsArr = (arr.map(el => {
                    const { review, User, createdAt } = el
                    const firstName = User.firstName
                    const userId = User.id
                    const dateFormatted = new Date(createdAt)
                    const date = months[dateFormatted.getMonth()] + " " + dateFormatted.getFullYear()
                    idLog.push(userId)
                    return {
                        firstName,
                        userId,
                        date,
                        review,
                        dateFormatted
                    }
                }))
                reviewsArr.sort((a, b) => a.dateFormatted - b.dateFormatted)
                setReviews(reviewsArr)
                setCritics(idLog)
                console.log(reviewsArr, user.id)
            }
        }
        getSingleSpot()
        getReviews()
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
                        <div><FaStar /> {spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(2) + ' · ': ''} {spot.numReviews > 0 ? spot.numReviews + (spot.numReviews > 1 ? ' reviews' : ' review') : 'New'}</div>
                    </div>
                    <button className='reserve-button' onClick={() => alert("Feature coming soon.")}>Reserve</button>
                </div>
            </div>
            <hr width='auto'/>

            <div className='spot-reviews'>
                <h2><FaStar /> {spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(2) + ' · ': ''} {spot.numReviews > 0 ? spot.numReviews + (spot.numReviews > 1 ? ' reviews' : ' review') : 'New'}</h2>
                { (user && user.id !== spot.id && !critics.includes(user.id)) ? <button>Post Your Review</button> : <></>}
                {(!reviews.length && user) ? ( <div>Be the first to post a review!</div> ) : reviews.map(review => {
                   return ( <div key={review.firstName} className='review-container'>
                        <div className='review-name'>{review.firstName}</div>
                        <div className='review-month'>{review.date}</div>
                        <div className='review-text'>{review.review}</div>
                    </div>)
                }) }
            </div>
        </div>
    )
}

export default SingleSpot
