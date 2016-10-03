// creating the signup reducer

const signupReducer = function(state = {}, action){

	switch (action.type) {
		case "SIGNUP":
			return state
		case "SIGNUP_PENDING":
			return {...state, pending: true}
		case "SIGNUP_FULFILLED":
			return {...state, success: true, pending: false, ...action.payload.data}
		case "SIGNUP_REJECTED":
			return {...state, error: true, pending: false, message: "There was an unexpected error on your file conversion. Please try again later."}
		case "LOGOUT":
			return {}
		default:
			return state
	}
}

export default signupReducer;