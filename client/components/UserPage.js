import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'

@connect((store)=>{
	return {
		auth: store.auth,
		profile: store.profile
	}
})

export default class UserPage extends Component {

	componentWillMount(){
		var id = this.props.params.id;
		var token = localStorage.getItem('v-grb');

		// getting user information
		this.props.dispatch({
			type: 'GET_PROFILE',
			payload: axios.get('/api/users/'+id, {
				headers: {
					'x-access-token': token
				}
			})
		});
	}

	addFriend(){
		// collecting user id and token
		let id = localStorage.getItem('v-grab-uid');
		let token = localStorage.getItem('v-grb');

		// collecting friend info
		let { _id, name, email } = this.props.profile.user; //deconstruct important properties
		let friend = { _id, name, email }; // create an object with important properties

		// making AJAX request
		this.props.dispatch({
			type: 'UPDATE_ACCOUNT',
			payload: axios.put('/api/users/'+id, {
				action: 'ADD',
				friend: friend },
				{ 
					headers: {'x-access-token': token }
			})
		})

		// trigger animation to show friend added, disable button if in friend
	}

	removeFriend(){
		// collecting user id and token
		let id = localStorage.getItem('v-grab-uid');
		let token = localStorage.getItem('v-grb');

		// collecting friend info
		let { _id, name, email } = this.props.profile.user; //deconstruct important properties
		let friend = { _id, name, email }; // create an object with important properties

		// making AJAX request
		this.props.dispatch({
			type: 'UPDATE_ACCOUNT',
			payload: axios.put('/api/users/'+id, {
				action: 'REMOVE',
				friend: friend },
				{ 
					headers: {'x-access-token': token }
			})
		})
	}

	render(){
		const { auth, profile, params } = this.props;
		let result, friendButton, archives, profile_name, warning, profile_points;
		let la = 'Error showing profile page'

		// checking if a friend of user
		var isFriend = auth.user.friends.find(function(item){
			return item._id === ( profile.user ? profile.user._id : null ) // due to async loading issue
		}) !== undefined;

		console.log('is Friend?', isFriend, auth.user.friends)

		// friend button
		if (isFriend){
			friendButton = <div>
								<button className="btn btn-danger" onClick={this.removeFriend.bind(this)}>Remove Friend?</button>
						   </div>
		} else {
			friendButton = <button className="btn btn-primary" onClick={this.addFriend.bind(this)}>Add Friend</button>
		}

		// loader
		let loader = auth.pending ? "ui active inverted dimmer" : "";

		if (profile.user){
			la = <div className="ui segment content">
					<div className="ui huge header">User: {profile.user._id}</div>
					<div className="ui huge header">User Email: {profile.user.email}</div>
					{ friendButton }


				</div>
		}

		// async checking
		if (profile.user){

			// modifies and displays archive data
			archives = profile.user.archives.map(function(val, i){
				return <div className="media" key={i}>
							<a href={val.webpage_url}>
							  <div className="media-left">
							    <img className="media-object" src={val.thumbnail} alt="..." />
							  </div>
							  <div className="media-body">
							    <h4 className="media-heading">{val.title}</h4>
							    { (val.description) ? val.description.substr(0, 200) + '...' : '' }
							  </div>
						  	</a>
						</div>
			});

			if (!archives.length) archives = <p className="center-only">{profile.user.name} has no download history yet!</p>
			
			// setting name
			profile_name = profile.user.name;

			// setting points
			profile_points = profile.user.points;

			//checking if viewing own profile
			if (auth.user._id === profile.user._id){
				warning = (<div className="alert alert-dismissible alert-warning text-center">
				  <button type="button" className="close" data-dismiss="alert">&times;</button>
				  <h4>Warning!</h4>
				  <p>You are viewing your own account. Some functionality disabled.</p>
				</div>)

				// disabling add friend button
				friendButton = <button className="btn btn-primary disabled">Add Friend</button>
			}


		}

		return(
			<div className="col-sm-12 col-md-8 col-md-offset-2 marg-top-15">
				{warning}
				<div className="panel panel-default user-page">
				  <div className="panel-body">
				    <div className="col-xs-12 col-sm-4">
				    	<img className="img-responsive" src="./../assets/img/user.png" />
				    	<h3>User: <b>{ profile_name }</b></h3>
				    	<h3>Points: <b>{ profile_points }</b></h3>
				    	<hr />
				    	{ friendButton }
				    </div>
				    <div className="col-xs-12 col-sm-8">
				    	<h2>Latest Downloads</h2>
				    	<hr />

				    	{ archives }
				    </div>
				  </div>
				</div>

		 		<div className={ loader }>
		 	   		<div className="ui large text loader"></div>
		 	 	</div>
			</div>
		)
	}
}