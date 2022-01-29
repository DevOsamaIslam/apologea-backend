const reducers = {}

import strings from '../../lib/strings'

const { actions } = strings.state

reducers.feed = (state = [], { type, data }) => {
	switch(type) {
	case actions.blog.getFeed:
		return data
	default:
		return state
	}
}



export default reducers