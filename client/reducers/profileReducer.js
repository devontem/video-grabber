// creating the profile reducer

const profileReducer = function(state = {}, action){

	switch (action.type) {
		case 'GET_PROFILE':
			return state
		case 'GET_PROFILE_PENDING':
			return {...state, pending: true}
		case 'GET_PROFILE_FULFILLED':
			return {...state, pending: false, user: action.payload.data}
		case 'GET_PROFILE_REJECTED':
			return {...state, pending: false, ...action.payload.data}
		
		case 'ADD_FRIEND':
			return state

		case 'UPDATE_ACCOUNT_PENDING':
			return {...state, pending: true}
		case 'UPDATE_ACCOUNT_FULFILLED':
			return {...state, pending: false, success: true}
		case 'UPDATE_ACCOUNT_REJECTED':
			return {...state, pending: false, success: false, error: true}
		default:
			return state
	}
}

export default profileReducer;