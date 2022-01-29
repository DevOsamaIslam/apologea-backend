import { Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './App.css'
import Navbar from './components/nav/navbar'
import Register from './components/forms/register'
import Login from './components/forms/login'
import Feed from './components/feed'

import fetch from './controllers/api/fetch'
import asyncHandler from './lib/utils'
import blog from './state/actions/blog'

const blogs = async () => {
	let data = await asyncHandler(
		fetch.getFeed()
	)
	return data
}

const App = () => {

	let dispatch = useDispatch()

	blogs().then(({data}) => {
		dispatch(blog.getFeed(data))
	})

	return (
		<Fragment>
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)

}

export default App


