import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/reviews'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import PostReviewModal from '../PostReviewModal/PostReviewModal';
import { useEffect, useState } from 'react';

const ReviewsComponent = ({props}) => {
    const {spotId, spot} = props
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const reviewsList = Object.values(reviews).sort((a, b) => b.dateFormatted - a.dateFormatted) //get spots here

    useEffect(() => {
        dispatch(reviewsActions.getReviews(spotId))
        .then(setIsLoaded(true))
    },[dispatch, spotId])

    const checkCritics = (reviews =[]) => {
        const idLog = []
        Object.values(reviews).forEach(review => idLog.push(review.userId))
        return idLog.includes(user.id)
    }

    return (
        <>
            {isLoaded ?
            <>
                {(user && user.id !== spot.ownerId && !checkCritics(reviews)) ?
                <OpenModalButton
                buttonText="Post Your Review"
                className='newSpot-button'
                modalComponent={<PostReviewModal spotId={spotId}/>} />
                : <></>}
                { !reviewsList.length ? ( user ? <div className='spot-desc'>Be the first to post a review!</div> : <></> ) :
                    reviewsList.map(review => {
                        return ( <div key={review.firstName} className='review-container'>
                            <div className='review-name'>{review.firstName}</div>
                            <div className='review-month'>{review.date}</div>
                            <div className='spot-desc'>{review.review}</div>
                            {user?.id == review.userId ? <OpenModalButton
                                buttonText="Delete"
                                className='delete-rev'
                                modalComponent={<DeleteReviewModal prop={{spotId, id: review.id}}/>} /> : <></>}
                                </div>)
                })}
            </> : <></>}
        </>
    )
}

export default ReviewsComponent
