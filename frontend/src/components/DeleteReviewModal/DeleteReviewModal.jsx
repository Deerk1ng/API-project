import { useModal } from '../../context/Modal'
import './DeleteReviewModal.css'
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/reviews'

function DeleteReviewModal({prop}) {
    const {spotId, id} = prop
  const { closeModal } = useModal();
  const dispatch = useDispatch();

    const handleDelete = () => {
        console.log("prop ", spotId, id)
        dispatch(reviewsActions.deleteReview(spotId, id))
        .then(closeModal)
        // .then(window.location.reload())
    }

    return (
        <div className='modal'>
            <h1 className='delete-title'>Confirm Delete</h1>
            <div className='delete-desc'>Are you sure you want to delete this review?</div>
            <button className='delete-button' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='keep-button' onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal
