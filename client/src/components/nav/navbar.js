/* eslint-disable react/jsx-key */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './nav.css'

const Navbar = () => {

	const isAuthed = useSelector(state => state.auth.isAuthed)
	let navItems = ''
	if(isAuthed) {
		navItems = [
			<Link key={0} to="/blog/new">New Blog</Link>,
			<Link key={1} to="/profile">Profile</Link>,
			<Link key={2} to={'/logout'}>Logout</Link>,
		]
	}
	else navItems = [
		<Link key={0} to={'/login'}>Login</Link>
	]
	return (
		<nav>
			<div className="branding">
				<h1><Link to='/'>Blog app</Link></h1>
			</div>
			<div className="nav-items">
				{navItems.map(item => item)}
			</div>
		</nav>
	)
}

export default Navbar