import React, { Component } from 'react'

export default class FriendsPage extends Component {

	render(){

		var data = this.props.friends.map(function(val, i){
					return (
						<div className="col-xs-6 col-sm-3" key={i}>
						<a href={'/#/users/'+ val._id} className="thumbnail">
						  <img src="http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/512/user.png" alt={val.name} />
						  <p className="text-center">{val.name}</p>
						</a>
						</div> );
					});

		return (
			<div className="">
				<p>Friends</p>

				{ data }
			</div>
		)
	}
}