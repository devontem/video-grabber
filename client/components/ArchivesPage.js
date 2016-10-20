import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import axios from 'axios'

@connect((store)=>{
	return {
		auth: store.auth
	}
})

export default class ArchivesPage extends Component {

	deleteVideo(video){
		// collecting user id and token
		let id = localStorage.getItem('v-grab-uid');
		let token = localStorage.getItem('v-grb');

		// making AJAX request
		this.props.dispatch({
			type: 'UPDATE_ACCOUNT',
			payload: axios.put('http://localhost:3000/api/users/'+id, {
				action: 'REMOVE',
				video: video },
				{ 
					headers: {'x-access-token': token }
			})
		})
	}

	msg(){
		alert('working!');
	}

	// <Link to={'/download/id/' + val.hash}></Link>
	// {val.webpage_url}


	render(){

		// function that takes 'this' context, and displays archive data in an array
		function data(context){
			return context.props.archives.map(function(val, i){
					return (
						<div className="col-xs-6 col-sm-3" key={i}>
						<a className="thumbnail">
						  <img src={val.thumbnail} alt={val.title} />
						  <p className="text-center">{val.title}</p>
						  <div className="btn-group btn-group-justified">
							  <a href={'/#/download/id/' + val.hash} className="btn btn-primary btn-xs">DETAILS</a>
							  <a onClick={context.deleteVideo.bind(context, val)} className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-remove color-red" aria-hidden="true"></span></a>
							</div>
						</a>
						</div> );
					});
		}

		return (
			<div className="">
				<p>Archives</p>
			  { data(this) }
			</div>
		)
	}
}