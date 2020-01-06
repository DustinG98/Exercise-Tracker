import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const NavBar = ({ token, setToken }) => {
    const [isToken, setIsToken] = useState(false)
    useEffect(() => {
        if(token === "") setIsToken(false)
        if(token !== "") setIsToken(true)
    }, [token])

    const loginOrSignOut = () => {
        if(!isToken) return <Link to="/login">Login</Link>;
        if(isToken) return <Link to="/" onClick={() => setToken("")}>Sign Out</Link>
    }

    return (
        <div>
            <nav>
                <Link to="/exercises">Exercises</Link>
                <Link to="/users">Users</Link>
                <Link to="/signup">Sign Up</Link>
                {loginOrSignOut()}
            </nav>
        </div>
    )
}

export default NavBar