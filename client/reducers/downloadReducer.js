// creating the download reducer

const downloadReducer = function(state = {}, action){
	switch (action.type) {
		case "CONVERT_URL":
			return Object.assign({}, state, { baseUrl: action.baseUrl, downloadUrl: '!!--'+action.baseUrl+'--!!' })
		case "CONVERT_URL_PENDING":
			return 'pending!'
		case "CONVERT_URL_FULFILLED":
			return 'fulfilled!'
		case "CONVERT_URL_REJECTED":
			return 'rejected!'
		default:
			return state
	}
}

export default downloadReducer;