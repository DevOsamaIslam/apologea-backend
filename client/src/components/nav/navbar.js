/* eslint-disable react/jsx-key */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import logoutService from '../../controllers/services/auth/logout.service'

import './nav.css'

const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {isAuthed, user} = useSelector(state => state.auth)
	let navItems = ''
	if(isAuthed) {
		navItems = [
			<Link key={0} to="/blog/new">New Blog</Link>,
			<Link key={1} to={`/users/${user.username}`}>Profile</Link>,
			<button 
				key={2} 
				onClick={
					() => logoutService.logout(dispatch, navigate) 
				}>Logout</button>,
		]
	}
	else navItems = [
		<Link key={0} to={'/login'}>Login</Link>,
		<Link key={1} to={'/register'}>Register</Link>
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