import React from 'react'

import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <nav>
                <Link to="/">Exercises</Link>
                <Link to="/users">Users</Link>
            </nav>
        </div>
    )
}

export default NavBar