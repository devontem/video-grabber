import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

// @connect((store)=>{
// 	return {
// 		auth: store.auth
// 	}
// })

export default function requireAuthentication(Component) { 

	class AuthenticatedComponent extends React.Component {

		componentWillMount(){
	        this.checkAuth();
	        console.log(this.props)
	    }

	    checkAuth() {
	    	// if there is a user in the store, exit function
	    	if (this.props.auth.user) return true;

			var userId = localStorage.getItem('v-grab-uid');
			var token = localStorage.getItem('v-grb');

			// if there is uid & token in local storage, retrieve user info
			if (userId && token){
				this.props.dispatch({
					type: 'GET_USER',
					payload: axios.get('http://localhost:3000/api/users/'+userId, {
						headers: {
							'x-access-token': token
						}
					})
				});

			// if there is no uid/token, redirect to login
			} else {
				this.props.history.push('/login');
			}
	    }

	    render() {

			return (
				<div>
					{ this.props.auth.user ? <Component {...this.props}/> : null}
				</div>)
		}
	}
	const mapStateToProps = (state) => ({
        auth: state.auth
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}