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
		let status = error ? 'error' : 'success';
		const classes = "ui "+status+" message"

		return (
			<div className={classes}>
			    <div className="header">{data.heading}</div>
				<p>{data.messaging}</p>
			</div>
		)
	}
}