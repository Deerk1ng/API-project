import './PostReviewModal.css'
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import * as reviewsActions from '../../store/reviews'



function PostReviewModal({spotId}) {
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0)
  const [hover, setHover] = useState(null)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            spotId,
            review,
            stars
        }

        return dispatch(reviewsActions.postReview(newReview, user))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
            setErrors(data.errors);
            } else setErrors(data)
        });
    }

    return (
        <div className='modal'>
            <form className='review-form' onSubmit={handleSubmit}>
                <h2 className='review-title'>How was your stay?</h2>
                {errors.message ? <div className='err'>{errors.message}</div> : <></> }
                <textarea className="review-text" placeholder='Leave your review here...' onChange={(e) => setReview(e.target.value)} />
                <div className='star-container'>
                    {[...Array(5)].map((star , index) => {
                        const currentRate = index + 1
                        return (
                            <label key={`star${currentRate}`}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={currentRate}
                                    onClick={() => setStars(currentRate)}
                                />
                                <FaStar
                                    className='star'
                                    size={25}
                                    color={currentRate <= (hover || stars) ? '#5985E1' : '#cccccc'}
                                    border-color={"black"}
                                    onMouseEnter={() => setHover(currentRate)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        )
                    })}<div className='stars-text'> Stars</div>
                </div>
                <button className='review-button' disabled={(review.length < 10 || !stars) ? true : false} >Submit Your Review</button>
            </form>
        </div>
    )
}

export default PostReviewModal
