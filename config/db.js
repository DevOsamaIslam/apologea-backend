import mongoose from 'mongoose'


const db = {} 

db.connect = () => mongoose.connect('mongodb://127.0.0.1:27017/social')
	.then(() => console.log('connected to db'))
	.catch(error => console.log('something went wrong while connecting to DB', error))

db.connection = mongoose.connection

export default db