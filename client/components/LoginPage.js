import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'

@connect((store)=>{
	return {
		store: store.login
	}
})

export default class LoginPage extends Component {

	componentWillMount(){
		
	}

	submitForm(){
		var name = this.refs.name.value;
		var email = this.refs.email.value;
		var password = this.refs.password.value;
	}

	render(){
		const { store, params } = this.props;
		let result = ''

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "ui inverted dimmer";

		return(
			<div className="main-wrapper center">
				<div className="ui segment content">
					<div className="ui huge header">Login</div>

					<form>
						<input type="text" ref="name" name="name" />
						<input type="text" ref="email" name="email" />
						<input type="password" ref="password" name="password" />
						<button type="submit" onClick={this.submitForm.bind(this)} >Submit</button>
					</form>
					
					<div className={ loader }>
				   		<div className="ui large text loader"></div>
				 	</div>

					{result}
				</div>
			</div>
		)
	}
}