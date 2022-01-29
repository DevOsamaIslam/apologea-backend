import { Link } from 'react-router-dom'

export default props => {
	let {
		_id,
		author,
		title,
		excerpt,
		likes,
		affirms,
		comments,
		type,
		responseTo
	} = props.data

	return (
		<div className='blog-card'>
			<div className='meta'>
				<Link to={_id}><span>{author}</span></Link> || 
				<Link to={_id}><span>{type}</span></Link> || 
				<Link to={_id}><span>{responseTo}</span></Link>
			</div>
			<Link to={_id}><h3>{title}</h3></Link>
			<p>{excerpt}</p>
			<div className='meta'>
				<span>Likes: {likes? likes.length : 0}</span>
				<span>Comments: {comments? comments.length: 0}</span>
				<span>affirms: {affirms ? affirms.length : 0}</span>
			</div>
		</div>
	)
}