import bcrypt from 'bcryptjs'


export const asyncHandler = async fn => {
	try {
		let result = await fn
		return result
	} catch (error) {
		return { error } 
	}
}

export const isMatch = (plain, hashed) => {
	return bcrypt.compareSync(plain, hashed)
}

export default {}
