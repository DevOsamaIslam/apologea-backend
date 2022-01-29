export const asyncHandler = async fn => {
	try {
		let result = await fn
		return result
	} catch (error) {
		return { error } 
	}
}

export default asyncHandler