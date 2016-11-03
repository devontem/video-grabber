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

	deleteConfirm(video){
		var context = this;

		swal({
		  title: "Are you sure?",
		  text: "This archive will be removed from your history, and you will need to re-download it.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: false
		},
		function(){

			// deleting video
			context.deleteVideo(video);

		  swal("Deleted!", "Your video archive has been deleted.", "success");
		});
	}


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
							  <a onClick={context.deleteConfirm.bind(context, val)} className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-remove color-red" aria-hidden="true"></span></a>
							</div>
						</a>
						</div> );
					});
		}

		var message = (!this.props.archives.length) ? <p className="center">You currently have no archives.</p>: '';

		return (
			<div className="">
				
				{ message }

			  	{ data(this) }
			</div>
		)
	}
}