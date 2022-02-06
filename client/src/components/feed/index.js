
import { useSelector } from 'react-redux'

import BlogCard from '../blog/card'
import './feed.css'


export default () => {

	let feed = useSelector(state => state.blogs)

	if(feed)
		return (
			<div className='feed'>
				{	feed.map(blog => <BlogCard 
					key={blog._id} 
					data={blog} 
					feed={true}/>)}
			</div>
		)
	else return (<h1>Loading...</h1>)
}