// creating the download reducer

const downloadReducer = function(state = {}, action){

	switch (action.type) {
		case "CONVERT_URL":
			return state
		case "CONVERT_URL_PENDING":
			return {...state, pending: true}
		case "CONVERT_URL_FULFILLED":

			return {...state, success: true, pending: false, ...action.payload.data}
		case "CONVERT_URL_REJECTED":
			return {...state, error: true, pending: false, message: "There was an unexpected error on your file conversion. Please try again later."}
		case "CLEAR_DOWNLOAD_STATE":
			return {}
		case 'FORM_VALIDATION':
			return {...state, message: action.message, error: true}
		default:
			return state
	}
}

export default downloadReducer;