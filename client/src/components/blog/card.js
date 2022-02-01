import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import actions from '../../state/actions/blog'
import fetch from '../../controllers/api/fetch'
import routes from '../../lib/routes'
import './card.css'

export default props => {
	let user = useSelector(state => state.auth.user)
	return fill(user, {...props.data})
}

const fill = (user, data) => {
	console.log('card:', data)
	let dispatch = useDispatch()
	return (
		<div className='blog-card'>
			<div className='meta'>
				<span>author: <Link to={data.author.username}>{data.author.username}</Link></span>
				{data.responseTo && <Link to={data.responseTo}><span>{data.responseTo}</span></Link>}
			</div>
			<Link to={routes.blog + '/' + data._id}><h3>{data.title}</h3></Link>
			<p className='content'>{data.body || data.excerpt}</p>
			<div className='meta'>
				<span>
					<button className={isLiked(data, user) ? 'liked' : 'like'}
						onClick={() => likeClicked(dispatch, data, user) }
					>
						Like: {data.likes.length}
					</button> 
				</span>
				<span>Comments: {data.comments? data.comments.length: 0}</span>
				<span>affirms: {data.affirms ? data.affirms.length : 0}</span>
			</div>
		</div>
	)
}

const likeClicked = (dispatch, blog, user) => {
	if(user) {
		if(blog.likes.includes(user._id)) {
			dispatch(actions.unlike({blogId: blog._id, userId: user._id}))
			fetch.like(blog._id, 'remove')
		}
		else {
			dispatch(actions.like({blogId: blog._id, userId: user._id}))
			fetch.like(blog._id, 'add')
		} 
	}

		
}

const isLiked = (blog, user) => {
	if(user) 
		return blog.likes.includes(user._id)
	return false
}

