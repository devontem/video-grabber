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

			// Setting the token & user is
			localStorage.setItem('v-grb', this.props.store.token);
			localStorage.setItem('v-grab-uid', this.props.auth.user._id);

			//showing the confirmation message
			swal("Welcome Back", "You are now logged in", "success")

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
				payload: axios.post('/api/authenticate/login', {
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
		let loader = store.pending ? "ui active inverted dimmer" : "";

		// error messaging
		if (store.error){
			error = <FormMessage error={true} message={store.message ? store.message : undefined} />
		}

		return (
			<div className="col-xs-12 col-sm-6 col-sm-offset-3">
				{error}
				<h3 className=" text-center">Login to your Account</h3>
				<div className="form-group">
				  <label className="control-label" ></label>
				  <input className="form-control input-lg" type="text" ref="email" placeholder="email" name="email" />
				</div>
				<div className="form-group">
				  <label className="control-label" ></label>
				  <input className="form-control input-lg"  type="password" ref="password" placeholder="password" name="password" />
				</div>
				<a className="btn btn-default btn-lg btn-block" onClick={this.submitForm.bind(this)}>Submit</a>

				<div className="text-center spacing">
			      New to us? <Link to={'/signup'}>Sign Up</Link>
			    </div>

				<div className={ loader }>
			   		<div className="ui large text loader"></div>
			 	</div>
			</div>
		)
	}
}