
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
				<div className="container">
					<div className="">
					{this.props.children}
					</div>
				</div>

				<footer>
					<div className="col-xs-6">
						<p className="header">Video Grabber</p>
						<p className="slogan">Download all the videos!</p>
						<p>© 2016 Copyright</p>
					</div>
					<div className="col-xs-6">
						<p className="made-by">
							Made by Devonte <br />
							<a href="http://github.com/devontem">@devontem</a>
						</p>
					</div>
				</footer>
			</div>
		)
	}
} 