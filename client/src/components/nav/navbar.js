import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {

	const isAuthed = useSelector(state => state.isAuthed)
	return (
		<nav>
			<div className="branding">
				<h1><Link to='/'>Blog app</Link></h1>
			</div>
			<div className="nav-items">
				{isAuthed ? 
					<Link to="/new">New Blog</Link> || <Link to="/profile"></Link> :
					<Link to="/login">Login</Link> || <Link to="/register">Register</Link>
				}
				
			</div>
		</nav>
	)
}

export default Navbar