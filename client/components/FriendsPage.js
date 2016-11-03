import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'

// connecting redux store with react component
@connect((store)=>{
	return {
		searchFriends: store.searchFriends
	}
})
export default class FriendsPage extends Component {

	search(){
		var username = this.refs.username.value;

		// dispatching search friend action
		if (username.length){
			this.props.dispatch({
				type: 'SEARCH_FRIENDS',
				payload: axios.post('http://localhost:3000/api/users/search', {
					username: username
				})
			});
		}

		// resetting value
		this.refs.username.value = '';
	}

	render(){
		var searchFriends;

		var data = this.props.friends.map(function(val, i){
					return (
						<div className="col-xs-6 col-sm-4" key={i}>
						<a href={'/#/users/'+ val._id} className="thumbnail">
						  <img src="./../assets/img/user.png" alt={val.name} />
						  <p className="text-center">{val.name}</p>
						</a>
						</div> );
					});


		// Search Friends messaging (if there are results vs no results)
		if (this.props.searchFriends.friends && this.props.searchFriends.friends.length > 0){
			searchFriends = this.props.searchFriends.friends.map(function(val, i){
				return (
					<a href={'/#/users/'+ val._id} className="list-group-item">{val.name}</a>
					)
			});
		} else if (this.props.searchFriends.friends && this.props.searchFriends.friends.length < 1) {
			searchFriends = (<a className="list-group-item center-only disabled">
							    No user with that email was found!
							  </a>)
		}

		// If no search has been done
		if (this.props.searchFriends.friends === undefined){
			searchFriends = (<a className="list-group-item center-only disabled">
							    Find friends by inputting their email address!
							  </a>)
		}

		var message = (!data.length) ? <p className="center">You have no friends right now. Search for some!</p>: '';

		return (
			<div className="">
				<div className="col-xs-12 col-sm-5">
					<div className="panel panel-default">
					  <div className="panel-heading">

					  	<div className="form-group">
						  <div className="input-group">
						    <input type="text" ref="username" placeholder="friend's email" className="form-control"/>
						    <span className="input-group-btn">
						      <button className="btn btn-default" onClick={this.search.bind(this)} type="button">Search</button>
						    </span>
						  </div>
						</div>

					  </div>
					  <div className="panel-body extend-body">
					    
					  	<div className="list-group">
						  
					  		{ searchFriends }

						</div>

					  </div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-7">
					{ message }
					{ data }
				</div>
			</div>
		)
	}
}