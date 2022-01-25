import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	body: {
		type: Object,
		required: true
	}
})

export default mongoose.model('User', schema)