
import React, { Component } from 'react'

export default class FormMessage extends Component {


	createData(status, downloadUrl){
		let data = {};

		if (status === 'error'){
			data.heading = 'Ooops...'
			data.messaging = "There was an error please try again"
		} else if (status === 'success'){
			data.heading = "Congrats..."
			data.messaging = "Your file has been converted! -> "+ downloadUrl;
		}
		
		return data;
	}

	render(){

		const { downloadUrl, status } = this.props

		const data = this.createData(status, downloadUrl);
		const classes = "ui "+status+" message"

		return (
			<div className={classes}>
			    <div className="header">{data.heading}</div>
				<p>{data.messaging}</p>
			</div>
		)
	}
}