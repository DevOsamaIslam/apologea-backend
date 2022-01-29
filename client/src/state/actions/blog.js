import strings from '../../lib/strings'

const keys = strings.state.actions

const actions = {}

actions.getFeed = feed => {
	return {
		type: keys.blog.getFeed,
		data: feed
	}
}



export default actions