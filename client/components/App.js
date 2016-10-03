
import { connect } from "react-redux"
import React, { Component } from 'react'
import axios from 'axios'
import FormMessage from './FormMessage'
import VideoInfo from './VideoInfo'


// connecting redux store with react component
@connect((store)=>{
	return {
		store: store.download
	}
})

class App extends Component {

	convertLink(){
		var val = this.refs.link.value;

		// if value has content
		if (val.trim()){
			this.props.dispatch({
				type: 'CONVERT_URL', 
				baseUrl: val,
				payload: axios.post('http://localhost:3000/api/download/', {
					baseUrl: val })
			}).catch(function(e){
				console.log('Error: '+ e)
			})
			this.refs.link.value = '';
		} else {
			this.props.dispatch({type: 'FORM_VALIDATION', message: "Please enter a valid link"})
		}
	}

	render(){
		let result;
		const { store } = this.props

		// form message
		if (store.message){
			result = <FormMessage error={store.error} message={store.message ? store.message : undefined} />
		}

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "ui inverted dimmer";

		// video info
		let show_video_info = ''
		if (store.success) show_video_info = <VideoInfo hash={ store.hash } info={store.videoInfo} />

		return (
			<div className="main-wrapper">
				<div className="main-card ui card">
				  <div className="content">
				    <div className="ui big icon input search-bar">
					  <input type="text" ref='link' placeholder="Please enter the base URL" />
					  <i className="search icon"></i>
					</div>

				  </div>
				  <div className="extra content convert-btn">
				    <button className="ui button" onClick={this.convertLink.bind(this)} >Convert Link</button>
				  </div>
				</div>

				<div className={ loader }>
				   <div className="ui large text loader">Converting File</div>
				 </div>

				{ result }

				{ show_video_info }

			</div>
		)
	}
}


export default App



