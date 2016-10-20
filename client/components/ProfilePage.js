import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'
import ArchivesPage from './ArchivesPage'
import FriendsPage from './FriendsPage'

@connect((store)=>{
	return {
		auth: store.auth
	}
})

export default class ProfilePage extends Component {

	// getFeed(){
	// 	var token = localStorage.getItem('v-grb');
	// 	var id = localStorage.getItem('v-grab-uid');

	// 	// dispatching action
	// 	this.props.dispatch({
	// 		type: 'GET_FEED',
	// 		payload: axios.get('http://localhost:3000/api/users/'+id+'/feed'),{
	// 			headers: {
	// 				'x-access-token': token
	// 			}
	// 	})
	// 	.catch(e=>{
	// 		console.log('Error: ', e);
	// 	})
	// }

	// componentWillMount(){

	// 	// get user info if not fetched
	// 	if (!this.props.auth){
	// 		this.props.dispatch({
	// 			type: 'GET_'
	// 		})
	// 	}
	// }

	render(){
		const { store, auth, params } = this.props;
		let result = ''
		let message = 'No User Is Logged In';

		// loader
		let loader = auth.pending ? "ui active inverted dimmer" : "";

		if (auth.user){
			message = <div className="ui segment content">
					<div className="ui huge header">User: {auth.user._id}</div>
					<div className="ui huge header">User Email: {auth.user.email}</div>
					

					{result}
				</div>
		}

		return(
			<div className="col-sm-12 col-md-8 col-md-offset-2">
			<div className="">
				<ul className="nav nav-tabs">
				  <li className="active"><a href="#home" data-toggle="tab" aria-expanded="false">Home</a></li>
				  <li className=""><a href="#friends" data-toggle="tab" aria-expanded="true">Friends</a></li>
				  <li className=""><a href="#archives" data-toggle="tab" aria-expanded="true">Archives</a></li>
				</ul>
				<div id="myTabContent" className="tab-content panel panel-default padding-10">
				  <div className="tab-pane fade active in" id="home">
				    <h2 className="text-center">Dashboard</h2>
				    <div className="btn-group btn-group-justified">
					  <a href="/#/" className="btn btn-default">Download Video</a>
					  <a href={'/#/'} className="btn btn-default">Public Profile</a>
					  <a href="#" className="btn btn-default disabled">Chrome Extension</a>
					</div>
					<div>
						<div className="center">
							<img className="" src="http://ketal.es/wp-content/uploads/2016/06/badge-simple-flat.png" />
							<h1><b>You have {auth.user.points} points!</b></h1>
							<p>* (Get 10 points for every video you convert)</p>
						</div>
					</div>
				  </div>
				  <div className="tab-pane fade" id="friends">
				    <FriendsPage friends={auth.user.friends} />
				  </div>
				  <div className="tab-pane fade" id="archives">
				    <ArchivesPage archives={auth.user.archives} />
				  </div>
				</div>

		 		<div className={ loader }>
		 		   <div className="ui large text loader"></div>
		 		</div>
		 	</div>
			</div>
		)
	}
}