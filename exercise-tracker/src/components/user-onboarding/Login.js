import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChanges = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/user/login', {
            "email": user.email,
            "password": user.password
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            {console.log(user)}
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input type="text" name="email" placeholder="Email" value={user.email} onChange={e => handleChanges(e)}/>
                <input type="text" name="password" placeholder="Password" value={user.password} onChange={e => handleChanges(e)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login