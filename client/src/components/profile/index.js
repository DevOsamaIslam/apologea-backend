import { useSelector } from 'react-redux'

import Bio from './bio'

export default () => {
	let profile = useSelector(state => state.profile)
	if(profile)
		return <Bio data={profile}/>
	else return <h1>Loading...</h1>
}