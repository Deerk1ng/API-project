import { useModal } from '../../context/Modal'
import './DeleteSpotModal.css'
import * as spotActions from '../../store/spot';
import { useDispatch } from 'react-redux';

function DeleteSpotModal({id}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(spotActions.deleteSpot(id))
        .then(closeModal)
    }

    return (
        <div className='modal'>
            <h1 className='delete-title'>Confirm Delete</h1>
            <div className='delete-desc'>Are you sure you want to remove this spot from the listings?</div>
            <button className='delete-button' onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className='keep-button' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal
