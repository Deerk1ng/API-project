import { useModal } from '../../context/Modal'
import './DeleteSpotModal.css'
import * as reviewActions from '../../store/reviews';
import { useDispatch } from 'react-redux';

function DeleteReviewModal({id}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(reviewActions.deleteReview(id))
        .then(closeModal)
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
