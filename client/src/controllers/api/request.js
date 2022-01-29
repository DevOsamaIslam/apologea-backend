import axios from 'axios'
import asyncHandler from '../../lib/utils'

const defaultHeaders = {
	'Content-Type': 'application/json'
}


export const GET = async (url, {query=null, body={}, headers={}}) => {
	if(query) {
		url += `?${query.join('&')}` 
	}
	body = JSON.stringify(body)
	let result = await asyncHandler(axios.get(url, body, {
		headers: {
			...defaultHeaders,
			...headers
		}
	}))
	return result
}

export const POST = async (url, {query=null, body={}, headers={}}) => {
	if(query) {
		url += `?${query.join('&')}` 
	}
	body = JSON.stringify(body)
	let result = await asyncHandler(axios.post(url, body, {
		headers: {
			...defaultHeaders,
			...headers
		}
	}))
	return result
}

export default {
	GET,
	POST
}