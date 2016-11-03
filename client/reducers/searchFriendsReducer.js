// creating the profile reducer

const searchFriendsReducer = function(state = {}, action){

	switch (action.type) {
		case 'SEARCH_FRIENDS':
			return state
		case 'SEARCH_FRIENDS_PENDING':
			return {...state, pending: true}
		case 'SEARCH_FRIENDS_FULFILLED':
			return {...state, pending: false, ...action.payload.data}
		case 'SEARCH_FRIENDS_REJECTED':
			return {...state, pending: false, success: false, ...action.payload.data}

		case 'LOGOUT':
			return {};
		
		default:
			return state
	}
}

export default searchFriendsReducer;