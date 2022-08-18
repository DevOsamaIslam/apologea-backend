// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncHandler = async (fn: any) => {
	try {
		const result = await fn
		return result
	} catch (error) {
		return { error }
	}
}
