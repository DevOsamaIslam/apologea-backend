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
import auth from './state/actions/auth'
import routes from './lib/routes'
import View from './components/blog/view'
import CreateBlog from './components/blog/editBlog/create'

const blogs = async () => {
	let data = await asyncHandler(
		fetch.getFeed()
	)
	return data
}

const isAuthed = async () => {
	let data = await asyncHandler(
		fetch.isAuthed()
	)
	return data
}

const App = () => {

	let dispatch = useDispatch()

	blogs().then(data => {
		dispatch(blog.getFeed(data))
	})

	isAuthed().then(data => {
		dispatch(auth.authenticate(data))
	})

	return (
		<Fragment>
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path={`/${routes.blog}/:id`} element={<View />} />
					<Route path={'/blog/new'} element={<CreateBlog />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)

}

export default App


