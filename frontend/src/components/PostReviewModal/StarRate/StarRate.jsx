import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRate.css'

export default function StarRate() {
    const [rating , setRating] = useState(null)
    const [hover, setHover] = useState(null)
    return (
        <div className='star-container'>
            {[...Array(5)].map((star , index) => {
                const currentRate = index + 1
                return (
                    <label key={`star${currentRate}`}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRate}
                            onClick={() => setRating(currentRate)}
                        />
                        <FaStar
                            className='star'
                            size={25}
                            color={currentRate <= (hover || rating) ? '#5985E1' : '#cccccc'}
                            border-color={"black"}
                            onMouseEnter={() => setHover(currentRate)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </div>
    )
}
