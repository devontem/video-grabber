import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'

@connect((store)=>{
	return {
		store: store.status,
		auth: store.auth
	}
})

export default class ProfilePage extends Component {

	// updates auth store with user credentials if logged in
	// componentWillMount(){
	// 	if (!this.props.auth.user){

	// 		var userId = localStorage.getItem('v-grab-uid');
	// 		var token = localStorage.getItem('v-grb');

	// 		// if there is a userId, get user information
	// 		if (userId){
	// 			this.props.dispatch({
	// 				type: 'GET_USER',
	// 				payload: axios.get('http://localhost:3000/api/users/'+userId, {
	// 					headers: {
	// 						'x-access-token': token
	// 					}
	// 				})
	// 			});
	// 		}
	// 	}
	// }

	render(){
		const { store, auth, params } = this.props;
		let result = ''
		let la = 'No User Is Logged In'

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "ui inverted dimmer";

		if (auth.user){
			la = <div className="ui segment content">
					<div className="ui huge header">User: {auth.user._id}</div>
					<div className="ui huge header">User Email: {auth.user.email}</div>
					
					<div className={ loader }>
				   		<div className="ui large text loader"></div>
				 	</div>

					{result}
				</div>
		}

		return(
			<div className="main-wrapper center">
				{la }
			</div>
		)
	}
}