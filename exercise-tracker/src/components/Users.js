import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Users = () => {
    const [users, setUsers] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <h1>Users</h1>
            {loading === false ? (users ? users.map(user => {
                return <div key={user._id}>
                    <h2>{user.username}</h2>
                </div>
            }) : <h2>No users found</h2>) : <h2>Loading...</h2>}
        </div>
    )
}

export default Users