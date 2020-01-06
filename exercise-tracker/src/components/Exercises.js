import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Exercises = ({ userID, token }) => {

    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/user/${userID}/exercises`, { headers: { "auth-token": token } })
            .then(res => {
                setExercises(res.data)
                setLoading(false)
            })
    }, [userID, token])

    return (
        <div>
            <h1>Exercises</h1>
            {loading === false ? (exercises ? exercises.map(exercise => {
                return <div key={exercise._id}>
                    <p>{exercise.date}</p>
                    <h4>{exercise.description}</h4>
                    <h5>{exercise.duration}</h5>
                </div>
            }) : <h2>Add an exercise...</h2>) : <h2>Loading...</h2>}
        </div>
    )
}

export default Exercises