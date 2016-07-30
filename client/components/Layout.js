
import React, { Component } from 'react'
import Header from './Header'

export default class Layout extends Component {

	render(){

		return (
			<div>
				<Header />
				<div className="">
					{this.props.children}
				</div>

			</div>
		)
	}
} 