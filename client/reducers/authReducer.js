// creating the auth reducer

const authReducer = function(state = {}, action){

	switch (action.type) {
		case 'GET_USER':
			return state
		case 'GET_USER_PENDING':
			return {...state, pending: true, loggedIn: false}
		case 'GET_USER_FULFILLED':
			return {...state, pending: false, loggedIn: true, user: action.payload.data}
		case 'GET_USER_REJECTED':
			return {...state, pending: false, loggedIn: false, ...action.payload}

		case 'GET_FEED':
			return state;
		case 'GET_FEED_PENDING':
			return {...state, pending: true}
		case 'GET_FEED_FULFILLED':
			return {...state, pending: false, success: true, feed: action.payload.data.feed }
		case 'GET_FEED_REJECTED':
			return {...state, pending: false, success: false, error: true}

		// set's the user's ID after successful login
		case "SIGNUP_FULFILLED":
			return {...state, loggedIn: true, ...action.payload.data}
		case "LOGIN_FULFILLED":
			return {...state, loggedIn: true, ...action.payload.data}
		case "LOGOUT":
			return {}

		// when a new friend is added, update auth store (to show updates)
		case 'UPDATE_ACCOUNT_FULFILLED':
			return {...state, pending: false, success: true, user: action.payload.data}
		case "CONVERT_URL_FULFILLED":
			return {...state, success: true, pending: false, user: action.payload.data.user}
		default:
			return state
	}
}

export default authReducer;