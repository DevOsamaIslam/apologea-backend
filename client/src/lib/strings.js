export default {
	state: {
		actions: {
			auth: {
				authenticate: 'AUTHENTICATE',
				isAuthed: 'IS_AUTHENTICATED'
			},
			blog: {
				getFeed: 'GET_FEED',
				getBlog: 'GET_BLOG',
				create: 'CREATE_BLOG',
				update: 'UPDATE_BLOG',
				delete: 'DELETE_BLOG',
				like: 'LIKE',
				unlike: 'UNLIKE',
				affirm: 'AFFIRM',
				unaffirm: 'UNAFFIRM',
				comment: 'COMMENT',
			},
			getUser: 'GET_USER',
		}
	}
}