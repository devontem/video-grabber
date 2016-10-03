import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'

@connect((store)=>{
	return {
		store: store.status
	}
})

export default class ProfilePage extends Component {

	componentWillMount(){
		
	}

	render(){
		const { store, params } = this.props;
		let result = ''

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "ui inverted dimmer";

		return(
			<div className="main-wrapper center">
				<div className="ui segment content">
					<div className="ui huge header">User ID: {params.id}</div>
					
					<div className={ loader }>
				   		<div className="ui large text loader"></div>
				 	</div>

					{result}
				</div>
			</div>
		)
	}
}