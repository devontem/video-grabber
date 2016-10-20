
const downloadStatusReducer = function(state = {}, action){

	switch (action.type){
		case 'CHECK_STATUS':
			return state
		case 'CHECK_STATUS_PENDING':
			return {...state, pending: true}
		case 'CHECK_STATUS_FULFILLED':
			return {...state, ...action.payload.data, status: action.payload.data.status, message: action.payload.data.message, pending: false}
		case 'CHECK_STATUS_REJECTED':
			return {...state, error: true, pending: false}
		default:
			return state;
	}
}

export default downloadStatusReducer