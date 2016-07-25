
import { connect } from "react-redux"
import React, { Component } from 'react'

// connecting redux store with react component
@connect((store)=>{
	return {
		store: store.download
	}
})

class App extends Component {

	convertLink(){
		var val = this.refs.link.value;

		if (val.trim()){
			this.props.dispatch({type: 'CONVERT_URL', baseUrl: this.refs.link.value })
			this.refs.link.value = '';
		}
	}

	render(){
		let result;

		if (this.props.store.baseUrl && this.props.store.downloadUrl){
			result = (
				<div>
					<h2>Here is your download link! => { this.props.store.downloadUrl }</h2>
				</div>
				)
		}
		console.log(this.props)

		return (
			<div>
				<input ref='link' placeholder="Please enter the base URL" />
				<button onClick={ this.convertLink.bind(this) }>Convert Link!</button>


				{ result }
			</div>
		)
	}
}


export default App



