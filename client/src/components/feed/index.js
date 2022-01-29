
import { useSelector } from 'react-redux'
import BlogCard from './blog/card'


export default () => {

	let feed = useSelector(state => state.feed)
	console.log(feed)

	if(feed)
		return (
			feed.map(blog => <BlogCard key={blog.id} data={blog} />)
		)
	else return (<h1>Loading...</h1>)
}