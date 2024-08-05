import '../CreateSpot/CreateSpot.css'
import { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as spotActions from '../../store/spot'


const UpdateSpot = () => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { spotId } = useParams();
    const [spot, setSpot] = useState({})
    const [errors, setErrors] = useState({});

    useEffect(() =>  {
        const getSingleSpot = async () => {
            const response = await fetch(`/api/spots/${spotId}`)

            if(response.ok) {
                const data = await response.json()
                setSpot(data)
            }
        }
        getSingleSpot()
    }, [spotId])

    useEffect(() => {
        setCountry(spot.country)
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setDescription(spot.description)
        setName(spot.name)
        setPrice(spot.price)
    }, [spot])

    const validateData = () => {
        const err ={}
        if(name.length == 0) err["name"] = "Name is required"
        if(name.length > 150) err["name"] = "Name must be less than 150 characters"
        if(address.length == 0) err["address"] = "Address is required"
        if(city.length == 0) err["city"] = "City is required"
        if(state.length == 0) err["state"] = "State is required"
        if(country.length == 0) err["country"] = "Country is required"
        if(description.length < 30) err["description"] = "Description needs a minimum of 30 characters"
        if(price < 1) err["price"] = "Price is required"
        if(price > 10000) err["price"] = "Price must be less than $10,000"
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})

        if(validateData()) {
            const newSpot = {
            id: spotId,
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

        dispatch(spotActions.updateSpot(newSpot))
        .then(data => {
            navigate(`/spots/${data.id}`)
        }).catch(async (err) => {
            const newErrs = await err.json()
            setErrors({ ...errors, ...newErrs.errors})

        })}
    }

    return (
        <>
        <form className='create-spot' onSubmit={handleSubmit}>
            <h1>Update Your Spot</h1>
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

                <div className='form-sec'>
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
                    {errors.name ? <span className='err'>Name is required</span> : <></>}
                </div>
                <div className='form-sec'>
                    <h2 className='subheading'>Set a base price for your spot</h2>
                    <div className='desc-head'>Comnpetitive pricing can help your listing stand out and rank higher in search results</div>
                    <label>
                        <div className='price'>
                            <span className='label'>$</span>
                            <input
                                className='input'
                                type="number"
                                placeholder="Price per night USD"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                />
                        </div>
                            {errors.price ? <span className='err'>{errors.price}</span> : <></>}
                    </label>
                </div>
                <button type="submit" className='submit-button'>Update Your Spot</button>

            </form>
        </>
    )
}

export default UpdateSpot
