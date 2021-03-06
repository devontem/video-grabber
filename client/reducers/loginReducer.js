// creating the login reducer

const loginReducer = function(state = {}, action){

	switch (action.type) {
		case "LOGIN":
			return state
		case "LOGIN_PENDING":
			return {...state, pending: true}
		case "LOGIN_FULFILLED":
			return {...state, success: true, pending: false, ...action.payload.data}
		case "LOGIN_REJECTED":
			return {...state, error: true, pending: false, message: "Credentials aren't matching! Please try again.", ...action.payload.data}
		case "LOGOUT":
			return {}
		default:
			return state
	}
}

export default loginReducer;