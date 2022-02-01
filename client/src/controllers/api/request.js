import axios from 'axios'
import asyncHandler from '../../lib/utils'

const defaultHeaders = {
	'Content-Type': 'application/json'
}

axios.defaults.withCredentials = true


export const GET = async (url, {query=null, headers=defaultHeaders}) => {
	if(query) {
		url += `?${query.join('&')}` 
	}
	let result = await asyncHandler(axios.get(url, {
		headers
	}))
	console.log('GET', result.data)
	return result.data
}

export const POST = async (url, {query=null, body={}, headers=defaultHeaders}) => {
	if(query) {
		url += `?${query.join('&')}` 
	}
	body = JSON.stringify(body)
	let result = await asyncHandler(axios.post(url, body, {
		headers,
	}))
	console.log('POST', result.data)
	return result.data
}

export default {
	GET,
	POST
}