import bcrypt from 'bcryptjs'

export default function (next){
	// hash
	this.salt = bcrypt.genSaltSync()
	this.password = bcrypt.hashSync(this.password, this.salt)

	// check

	next()
}