
import { connect } from "react-redux"
import React, { Component } from 'react'
import axios from 'axios'
import FormMessage from './FormMessage'


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
			this.props.dispatch({
				type: 'CONVERT_URL', 
				baseUrl: val,
				payload: axios.post('http://localhost:3000/api/download/', {
					baseUrl: val })
			})
			this.refs.link.value = '';
		}
	}

	render(){
		let result;
		const { store } = this.props

		if (store.baseUrl && store.downloadUrl){
			result = <FormMessage status={store.status} downloadUrl={store.downloadUrl} />
		}
		console.log(this.props)

		return (
			<div>
				<div className="ui card">
				  <div className="content">
				    <h4 className="ui sub header">Activity</h4>
				    <div className="ui big icon input">
					  <input type="text" ref='link' placeholder="Please enter the base URL" />
					  <i className="search icon"></i>
					</div>

				  </div>
				  <div className="extra content">
				    <button className="ui button" onClick={this.convertLink.bind(this)} >Convert Link</button>
				  </div>
				</div>

				{ result }

			</div>
		)
	}
}


export default App



