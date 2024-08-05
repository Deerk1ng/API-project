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


    const validateData = () => {
        const err ={}
        if(name.length == 0) err["name"] = "Name is required"
        if(name.length > 150) err["name"] = "Name must be less than 150 characters"
        if(address.length == 0) err["address"] = "Address is required"
        if(city.length == 0) err["city"] = "City is required"
        if(state.length == 0) err["state"] = "State is required"
        if(country.length == 0) err["country"] = "Country is required"
        if(description.length < 30) err["description"] = "Description needs a minimum of 30 characters"
        if(price < 0) err["price"] = "Price is required"
        if(price > 10000) err["price"] = "Price must be less than $10,000"
        if(previewImage.length == 0) err["previewImage"] = "Preview image is required"
        if(!(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg'))) err["previewImage"] = "Preview image URL must end in .png, .jpg, or .jpeg"
        if(photo1.length > 0 && !(photo1.endsWith('.png') || photo1.endsWith('.jpg') || photo1.endsWith('.jpeg'))) err["photo1"] = "Image URL must end in .png, .jpg, or .jpeg"
        if(photo2.length > 0 && !(photo2.endsWith('.png') || photo2.endsWith('.jpg') || photo2.endsWith('.jpeg'))) err["photo2"] = "Image URL must end in .png, .jpg, or .jpeg"
        if(photo3.length > 0 && !(photo3.endsWith('.png') || photo3.endsWith('.jpg') || photo3.endsWith('.jpeg'))) err["photo3"] = "Image URL must end in .png, .jpg, or .jpeg"
        if(photo4.length > 0 && !(photo4.endsWith('.png') || photo4.endsWith('.jpg') || photo4.endsWith('.jpeg'))) err["photo4"] = "Image URL must end in .png, .jpg, or .jpeg"
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validateData()) {
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
                setErrors(...errors, ...newErrs.errors)
            })
        }
    }

    return (
        <>
        <form className='create-spot' onSubmit={handleSubmit}>
            <h1 >Create a New Spot</h1>
            <div className='form-sec'>
            <h2 className='subheading'>Where is your place located?</h2>
            <div className='desc-head'>Guests will only get your exact address once they booked a reservation.</div>
                <label>
                    <div className='label-err'>
                        <span className='label'>Country</span>
                        {errors.country ? <span className='err'>{errors.country}</span> : <></>}
                    </div>
                    <input
                        className='input'
                        type="text"
                        minLength={1}
                        maxLength={30}
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    <div className='label-err'>
                        <span className='label'>Street Address</span>
                        {errors.address ? <span className='err'>{errors.address}</span> : <></>}
                    </div>
                    <input
                        className='input'
                        type="text"
                        minLength={1}
                        maxLength={30}
                        value={address}
                        placeholder="Street Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <div className='input city-state'>
                    <label>
                        <div className='label-err'>
                        <span className='label'>City</span>
                            {errors.city ? <span className='err'>{errors.city}</span> : <></>}
                        </div>
                        <div>
                            <input
                                className='city'
                                type="text"
                                minLength={1}
                                maxLength={30}
                                value={city}
                                placeholder="City"
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <span className='comma'>  ,</span>
                        </div>
                    </label>
                    <label>
                        <div className='label-err'>
                        <span className='label'>State</span>
                            {errors.state ? <span className='err'>{errors.state}</span> : <></>}
                        </div>
                        <input
                            className='state'
                            type="text"
                            minLength={1}
                            maxLength={30}
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </div>
            </div>

            <div className='form-sec' >
                <h2 className='subheading'>Describe your place to guests</h2>
                <div className='desc-head'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</div>
                <textarea
                    className='input desc'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description ? <span className='err'>{errors.description}</span> : <></>}

            </div>
            <div className='form-sec'>
                <h2 className='subheading'>Create a title for your spot</h2>
                <div className='desc-head'>Catch guests attention with a spot title that highlights what makes your place special</div>
                <input
                    className='input'
                    type="text"
                    minLength={1}
                    maxLength={50}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
                {errors.name ? <span className='err'>{errors.name}</span> : <></>}
            </div>
            <div className='form-sec'>
                 <h2 className='subheading'>Sert a base price for your spot</h2>
                <div className='desc-head'>Comnpetitive pricing can help your listing stand out and rank higher in search results</div>
                <label>
                    <div className='price'>
                    <span className='label'>$</span>
                    <input
                        className='input'
                        type="number"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                        {errors.price ? <span className='err'>{errors.price}</span> : <></>}

                </label>
            </div>
            <div className='form-sec'>
                 <h2 className='subheading'>Liven up your spot with photos</h2>
                <div className='desc-head'>Submit a link to at least one photo to publish your spot.</div>
                <input
                    className='input'
                    type="text"
                    minLength={1}
                    maxLength={255}
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    placeholder='Preview Image URL'
                />
                {errors.previewImage ? <span className='err'>{errors.previewImage}</span> : <></>}
                {errors.image ? <span className='err'>{errors.image}</span> : <></>}
                <input
                    className='input'
                    type="text"
                    minLength={1}
                    maxLength={255}
                    value={photo1}
                    onChange={e => setPhoto1(e.target.value)}
                    placeholder='Image URL'
                />
                {errors.photo1 ? <span className='err'>{errors.photo1}</span> : <></>}
                <input
                    className='input'
                    type="text"
                    minLength={1}
                    maxLength={255}
                    value={photo2}
                    onChange={e => setPhoto2(e.target.value)}
                    placeholder='Image URL'
                />
                {errors.photo2 ? <span className='err'>{errors.photo2}</span> : <></>}
                <input
                    className='input'
                    type="text"
                    minLength={1}
                    maxLength={255}
                    value={photo3}
                    onChange={e => setPhoto3(e.target.value)}
                    placeholder='Image URL'
                />
                {errors.photo3 ? <span className='err'>{errors.photo3}</span> : <></>}
                <input
                    className='input'
                    type="text"
                    minLength={1}
                    maxLength={255}
                    value={photo4}
                    onChange={e => setPhoto4(e.target.value)}
                    placeholder='Image URL'
                />
                {errors.photo4 ? <span className='err'>{errors.photo4}</span> : <></>}
            </div>
                <button type="submit" className='submit-button'>Create Spot</button>

            </form>
        </>
    )
}

export default CreateSpot
