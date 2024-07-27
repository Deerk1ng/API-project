import './UpdateSpot.css'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdateSpot = () => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    //get user somehow, add firstname, lastname, id to create spot
    const dispatch = useDispatch()
    const navigate = useNavigate()



    return (
        <>
        <form className='create-spot' >
            <h1>Create a New Spot</h1>
            <h2>Where is your place located?</h2>
            <div>Guests will only get your exact address once they booked a reservation.</div>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Street Address
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
                        <input
                            type="text"
                            value={city}
                            placeholder="City"

                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        State
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
                <hr />

                <h2>Create a title for your spot</h2>
                <div>Catch guests attention with a spot title that highlights what makes your place special</div>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name of your spot'
                />

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
                </label>

                <button type="submit">Update Spot</button>

            </form>
        </>
    )
}

export default UpdateSpot
