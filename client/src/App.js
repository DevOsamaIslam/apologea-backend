import { Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './App.css'
import Navbar from './components/nav/navbar'
import Register from './components/forms/register'
import Login from './components/forms/login'
import Feed from './components/feed'
import Alert from './components/alert'
import fetch from './controllers/api/fetch'
import asyncHandler from './lib/utils'
import blog from './state/actions/blog'
import auth from './state/actions/auth'
import routes from './lib/routes'
import View from './components/blog/view'
import CreateBlog from './components/blog/create'
import Edit from './components/blog/edit'
import Profile from './components/profile'

const blogs = async dispatch => {
	let data = await asyncHandler(
		fetch.getFeed()
	)
	dispatch(blog.getFeed(data))
}

const isAuthed = async dispatch => {
	let data = await asyncHandler(
		fetch.isAuthed()
	)
	dispatch(auth.isAuthed(data))
}

const App = () => {

	let dispatch = useDispatch()

	blogs(dispatch)

	isAuthed(dispatch)

	return (
		<Fragment>
			<BrowserRouter>
				<Navbar/>
				<Alert />
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/users/:id" element={<Profile />} />
					<Route path={`/${routes.blog}/:id`} element={<View />} />
					<Route path={`/${routes.blog}/edit/:id`} element={<Edit />} />
					<Route path={'/blog/new'} element={<CreateBlog />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)

}

export default App


