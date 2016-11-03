import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'
import FormMessage from './FormMessage'

@connect((store)=>{
	return {
		store: store.signup,
		auth: store.auth
	}
})

export default class SignupPage extends Component {

	componentWillMount(){
		// checking if logged in first
		if (this.loggedIn()){
			this.props.history.push('/profile');
		}
	}

	// runs on every re-render
	componentDidUpdate(){
		// after successful signup
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
		this.refs.name.value = '';
		this.refs.email.value = '';
		this.refs.password.value = '';
	}

	redirectTo(link){
		browserHistory.push(link);
	}

	submitForm(){
		let email = this.refs.email.value;
		let password = this.refs.password.value;
		let name = this.refs.name.value;

		// if both fields have content
		if ( this.validateFields(email, password) ){
			this.props.dispatch({
				type: 'SIGNUP',
				payload: axios.post('http://localhost:3000/api/users/', {
					email: email,
					password: password,
					name: name
				})
			});

			// clearing the fields
			this.clearFields();

		// if form validation fails
		} else {
			this.props.dispatch({
				type: 'FORM_VALIDATION',
				message: 'There was an error, please enter the email and password in correct format.'
			})
		}
	}

	render(){
		const { store, params } = this.props;
		let result = '', error = '';

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "";

		// error messaging
		if (store.error){
			error = <FormMessage error={true} message={store.message ? store.message : undefined} />
		}

		return (
			<div className="col-xs-12 col-sm-6 col-sm-offset-3">
				{error}
				<h3 className=" text-center">Sign Up for an Account</h3>
				<div className="form-group">
				  <label className="control-label" ></label>
				  <input className="form-control input-lg" type="text" ref="name" placeholder="name" name="name" />
				</div>
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
			      Already have an account? <Link to={'/login'}>Log In</Link>
			    </div>

				<div className={ loader }>
			   		<div className="ui large text loader"></div>
			 	</div>
			</div>
		)
	}
}