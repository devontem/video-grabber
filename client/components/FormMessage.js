import React, { Component } from 'react'

export default class FormMessage extends Component {


	createData(error, message){
		let data = {};

		data.messaging = message;
		data.heading = error ? 'Ooops...' : "Congrats!";
		
		return data;
	}

	render(){

		const { message, error } = this.props

		const data = this.createData(error, message);
		let status = error ? 'danger' : 'success';

		// return (
		// 	<div className={classes}>
		// 	    <div className="header">{data.heading}</div>
		// 		<p>{data.messaging}</p>
		// 	</div>
		// )

		return (
			<div className={'text-center alert alert-dismissible alert-'+ status}>
			  <button type="button" className="close" data-dismiss="alert">&times;</button>
			  <h4>{data.heading}</h4>
			  <p>{data.messaging}</p>
			</div>
		)
	}
}