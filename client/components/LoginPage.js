import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'
import FormMessage from './FormMessage'

@connect((store)=>{
	return {
		store: store.login,
		auth: store.auth
	}
})

export default class LoginPage extends Component {

	componentWillMount(){
		// checking if logged in first
		if (this.loggedIn()){
			this.props.history.push('/profile');
		}
	}

	// runs on every re-render
	componentDidUpdate(){
		if (this.props.store.success){

			// Setting the token
			localStorage.setItem('v-grb', this.props.store.token);
			localStorage.setItem('v-grab-uid', this.props.auth.user._id);
			// redirecting to the user's home page
			this.props.history.push('/profile');
		}
	}

	loggedIn(){
		return localStorage.getItem('v-grb') && localStorage.getItem('v-grab-uid');
	}

	validateFields(email, password){
		return email.trim() && password.trim();
	}

	clearFields(){
		this.refs.email.value = '';
		this.refs.password.value = '';
	}

	redirectTo(link){
		browserHistory.push(link);
	}

	submitForm(){
		let email = this.refs.email.value;
		let password = this.refs.password.value;

		// if both fields have content
		if ( this.validateFields(email, password) ){
			this.props.dispatch({
				type: 'LOGIN',
				payload: axios.post('http://localhost:3000/api/authenticate/login', {
					email: email,
					password: password
				})
			});

			// clearing the fields
			this.clearFields();

		// if form validation fails
		} else {
			this.props.dispatch({
				type: 'FORM_VALIDATION',
				error: true,
				message: 'There was an error, please enter the email and password in correct format.'
			})
		}
	}


	render(){
		const { store, params } = this.props;
		let error = ''

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "ui inverted dimmer";

		// error messaging
		if (store.error){
			error = <FormMessage error={true} message={store.message ? store.message : undefined} />
		}

		return(
			<div className="main-wrapper center">
				{error}
				<div className="ui segment content">
					<div className="ui huge header">Login</div>

					<form>
						<input type="text" ref="email" placeholder="email" name="email" />
						<input type="password" ref="password" placeholder="password" name="password" />
						<button type="submit" onClick={this.submitForm.bind(this)} >Submit</button>
					</form>
					
					<div className={ loader }>
				   		<div className="ui large text loader"></div>
				 	</div>

				</div>
			</div>
		)
	}
}