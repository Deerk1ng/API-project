import { useState } from 'react'
import './CreateSpot.css'


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
    //get user somehow, add firstname, lastname, id to create spoi
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})

        const newSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            previewImage
        }
        return newSpot
    }

    return (
        <>
            <form className='create-spot' onSubmit={handleSubmit}>
                {errors}
            <h1>Create a New Spot</h1>
            <h2>Where is your place located?</h2>
            <div>Guests will only get your exact address once they booked a reservation.</div>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        defaultValue="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        defaultValue="Street Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <div>
                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            defaultValue="City"

                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        State
                        <input
                            type="text"
                            defaultValue="State"
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
                    defaultValue='Please write at least 30 characters'
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
                    defaultValue='Name of your spot'
                />

                <h2>Sert a base price for your spot</h2>
                <div>Comnpetitive pricing can help your listing stand out and rank higher in search results</div>
                <label>
                    $
                    <input
                        type="number"
                        defaultValue="Price per night USD"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                </label>
                <hr />

                <h2>Liven up your spot with photos</h2>
                <div>Submit a link to at least one photo to publish your spot.</div>
                <input
                    type="text"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    defaultValue='Preview Image URL'
                />
                <input
                    type="text"
                    value={photo1}
                    onChange={e => setPhoto1(e.target.value)}
                    defaultValue='Image URL'
                />
                <input
                    type="text"
                    value={photo2}
                    onChange={e => setPhoto2(e.target.value)}
                    defaultValue='Image URL'
                />
                <input
                    type="text"
                    value={photo3}
                    onChange={e => setPhoto3(e.target.value)}
                    defaultValue='Image URL'
                />
                <input
                    type="text"
                    value={photo4}
                    onChange={e => setPhoto4(e.target.value)}
                    defaultValue='Image URL'
                />
                <hr />
                <button type="submit">Create Spot</button>

            </form>
        </>
    )
}

export default CreateSpot
