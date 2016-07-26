// creating the download reducer

const downloadReducer = function(state = {}, action){
	switch (action.type) {
		case "CONVERT_URL":
			return state
		case "CONVERT_URL_PENDING":
			return state
		case "CONVERT_URL_FULFILLED":
			let { data } = action.payload

			return Object.assign({}, state, { baseUrl: data.baseUrl, downloadUrl: data.downloadUrl, status: 'success' })
		case "CONVERT_URL_REJECTED":
			return {...state, baseUrl: action.baseUrl, status: 'error'}
		default:
			return state
	}
}

export default downloadReducer;