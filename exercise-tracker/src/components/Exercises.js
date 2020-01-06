import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Exercises = () => {

    const [exercises, setExercises] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
            .then(res => setExercises(res.data))
    }, [])

    return (
        <div>
            {console.log(exercises)}
            <h1>Exercises</h1>
            {exercises ? exercises.map(exercise => {
                return <div key={exercise._id}>
                    <h3>{exercise.username}</h3>
                    <h4>{exercise.description}</h4>
                    <h5>{exercise.duration}</h5>
                </div>
            }) : null}
        </div>
    )
}

export default Exercises