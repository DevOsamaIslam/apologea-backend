import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import routes from '../../lib/routes'
import actionService from '../../controllers/services/action.service'

import Comment from '../forms/comment'

import './blog.css'

export default props => {
	let user = useSelector(state => state.auth.user)
	return fill(user, {...props.data, ...props.feed})
}

const fill = (user, data) => {
	let dispatch = useDispatch()
	return (
		<div className='blog-card'>
			<div className='meta'>
				<span>author: 
					<Link 
						to={'/users/' + data.author.username}
						onClick={
							() => actionService.authorClicked(data.author._id, dispatch)
						}>{data.author.username}</Link></span>
				{data.responseTo && <Link to={data.responseTo}><span>{data.responseTo}</span></Link>}

			</div>
			<Link to={routes.blog + '/' + data._id}><h3>{data.title}</h3></Link>
			<p className='content'>{data.feed ? data.excerpt : data.body}</p>
			<div className='meta'>
				<div className='actions'>

					<button className={'like ' + (actionService.isLiked(data, user) && 'liked')}
						onClick={() => actionService.likeClicked(dispatch, data, user) }
					>
						Like: {data.likes.length}
					</button> 

					<button className={'affirm ' + (actionService.isLiked(data, user) && 'affirmed')}
						onClick={() => actionService.affirmClicked(dispatch, data, user) }
					>
						Affirm: {data.likes.length}
					</button> 
				</div>
				<hr />
				{!data.feed && displayComments(data.comments)}
				<Comment blogId={data._id} />
			</div>
		</div>
	)
}

const displayComments = comments => {
	return (
		<div className='comments-container'>
			{
				comments.map(({_id, comment, author}) => {
					console.log('comment', {_id, comment, author})
					return (
						<div key={_id} className='comment'>
							<Link to={`/users/${author._id}`}>{author.username}</Link>
							<p>	
								{comment}
							</p>
						</div>
					)
				})
			}
		</div>
	)
}
