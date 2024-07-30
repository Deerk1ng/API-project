import './PostReviewModal.css'

import { useModal } from '../../context/Modal'
import * as reviewActions from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function PostReviewModal({id}) {
  const { closeModal } = useModal();
  const [text, setText] = useState('');
  const [stars, setStars] = useState(0)
  const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(spotActions.postReview(id))
        .then(closeModal)
    }

    return (
        <div className='modal'>
            <form className='review-form' onSubmit={handleSubmit}>
                <h1 className='review-title'>How was your stay?</h1>
                <textarea name="review-text" placeholder='Just a quick review.'/>
                <button className='review-button' >Yes (Delete Spot)</button>
            </form>
        </div>
    )
}

export default PostReviewModal
