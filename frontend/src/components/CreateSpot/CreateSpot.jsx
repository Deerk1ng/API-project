import { useState } from 'react'
import './CreateSpot.css'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as spotActions from '../../store/spot'


const CreateSpot = () => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [photo1, setPhoto1] = useState('')
    const [photo2, setPhoto2] = useState('')
    const [photo3, setPhoto3] = useState('')
    const [photo4, setPhoto4] = useState('')
    const [errors, setErrors] = useState({});
    //get user somehow, add firstname, lastname, id to create spot
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})

        const photoArr = [photo1, photo2, photo3, photo4]

        const newSpot = {
            address,
            city,
            state,
            country,
            lat: '50',
            lng: '50',
            name,
            description,
            price,
        }

        dispatch(spotActions.createSingleSpot(newSpot))
        .then(data => {
                dispatch(spotActions.uploadImage(data.id, {url: previewImage, preview: true}))
                photoArr.forEach(url => url? dispatch(spotActions.uploadImage(data.id, {url: url, preview: false})): url)
                navigate(`/spots/${data.id}`)
        }).catch(async (err) => {
            const newErrs = await err.json()
            setErrors({ ...errors, ...newErrs.errors})

        })
    }

    return (
        <>
        <form className='create-spot' onSubmit={handleSubmit}>
            <h1>Create a New Spot</h1>
            <h2>Where is your place located?</h2>
            <div>Guests will only get your exact address once they booked a reservation.</div>
                <label>
                    Country
                    {errors.country ? <span className='err'>{errors.country}</span> : <></>}
                    <input
                        type="text"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Street Address
                    {errors.address ? <span className='err'>{errors.address}</span> : <></>}
                    <input
                        type="text"
                        value={address}
                        placeholder="Street Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <div>
                    <label>
                        City
                    {errors.city ? <span className='err'>{errors.city}</span> : <></>}
                        <input
                            type="text"
                            value={city}
                            placeholder="City"
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        State
                        {errors.state ? <span className='err'>{errors.state}</span> : <></>}
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </div>
                <hr />

                <h2>Describe your place to guests</h2>
                <div>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</div>
                <input
                    type="text"
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description ? <span className='err'>{errors.description}</span> : <></>}
                <hr />

                <h2>Create a title for your spot</h2>
                <div>Catch guests attention with a spot title that highlights what makes your place special</div>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
                {errors.name ? <span className='err'>Name is required</span> : <></>}

                <h2>Sert a base price for your spot</h2>
                <div>Comnpetitive pricing can help your listing stand out and rank higher in search results</div>
                <label>
                    $
                    <input
                        type="number"
                        placeholder="Price per night USD"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price ? <span className='err'>{errors.price}</span> : <></>}

                </label>
                <hr />

                <h2>Liven up your spot with photos</h2>
                <div>Submit a link to at least one photo to publish your spot.</div>
                <input
                    type="text"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    placeholder='Preview Image URL'
                />
                <input
                    type="text"
                    value={photo1}
                    onChange={e => setPhoto1(e.target.value)}
                    placeholder='Image URL'
                />
                <input
                    type="text"
                    value={photo2}
                    onChange={e => setPhoto2(e.target.value)}
                    placeholder='Image URL'
                />
                <input
                    type="text"
                    value={photo3}
                    onChange={e => setPhoto3(e.target.value)}
                    placeholder='Image URL'
                />
                <input
                    type="text"
                    value={photo4}
                    onChange={e => setPhoto4(e.target.value)}
                    placeholder='Image URL'
                />
                <hr />
                <button type="submit">Create Spot</button>

            </form>
        </>
    )
}

export default CreateSpot
