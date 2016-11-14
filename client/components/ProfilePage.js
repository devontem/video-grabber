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

	render(){
		const { store, auth, params } = this.props;
		let profile_name, profile_points, profile_email;
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

			profile_name = auth.user.name;
			profile_email = auth.user.email;
			profile_points = auth.user.points;

		}
		/*<div className="btn-group btn-group-justified">
					  <a href="/#/" className="btn btn-default">Download Video</a>
					  <a href={'/#/users/'+auth.user._id} className="btn btn-default">Public Profile</a>
					  <a href="#" className="btn btn-default disabled">Chrome Extension</a>
					</div>*/

		return(
			<div className="col-sm-12 col-md-8 col-md-offset-2 marg-top-15">
			<div className="">
				<ul className="nav nav-tabs">
				  <li className="active"><a href="#home" data-toggle="tab" aria-expanded="false">Dashboard</a></li>
				  <li className=""><a href="#friends" data-toggle="tab" aria-expanded="true">Friends</a></li>
				  <li className=""><a href="#archives" data-toggle="tab" aria-expanded="true">Archives</a></li>
				  <li className=""><a target="_blank" href={'/#/users/'+auth.user._id} >View Profile</a></li>
				</ul>
				<div id="myTabContent" className="tab-content panel panel-default padding-10">
				  <div className="tab-pane fade active in" id="home">
				  	<div className="col-xs-12 col-sm-4 side-border word-break">
					  	<img className="img-responsive" src="./../assets/img/user.png" />
					  	<hr />
				    	<h3>User: <b>{ profile_name }</b></h3>
				    	<h3>Email: <b>{ profile_email }</b></h3>
				    </div>
					<div className="col-xs-12 col-sm-8">
						<div className="center">
							<img className="badge-img" src="./../assets/img/badge-simple-flat.png" />
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