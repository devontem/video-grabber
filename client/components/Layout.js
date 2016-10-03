
import React, { Component } from 'react'
import Header from './Header'
import { connect } from "react-redux"

export default class Layout extends Component {

	loggedIn(){
		return localStorage.getItem('v-grb') && localStorage.getItem('v-grab-uid');
	}

	render(){

		let isLoggedIn = this.loggedIn();

		return (
			<div>
				<Header loggedIn={isLoggedIn} />
				<div className="">
					{this.props.children}
				</div>

			</div>
		)
	}
} 