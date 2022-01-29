import mongoose from 'mongoose'

const { ObjectId } = mongoose.SchemaTypes

const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true
	},
	author: {
		type: ObjectId,
		ref: 'User',
		required: true
	}
})

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: Object,
		required: true
	},
	excerpt: {
		type: String,
		default: function() {
			return this.body.substr(0, 100) + '...'
		} 
	},
	author: {
		type: ObjectId,
		ref: 'User',
		required: true	
	},
	responseTo: {
		type: ObjectId,
		ref: 'Blog'
	},
	likes: [{
		type: ObjectId,
		ref: 'User',
		default: []
	}],
	affirms: [{
		type: ObjectId,
		ref: 'User',
		default: []
	}],
	comments: [commentSchema],
	visible: {
		type: Boolean,
		default: false
	}
}, { timestamps: true})

export default mongoose.model('Blog', schema)