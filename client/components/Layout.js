
import React, { Component } from 'react'

export default class Layout extends Component {

	render(){

		return (
			<div>
				<h1>Header!</h1>
					{this.props.children}
				<h1>Footer</h1>
			</div>
		)
	}
} 