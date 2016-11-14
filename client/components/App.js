
import { connect } from "react-redux"
import React, { Component } from 'react'
import axios from 'axios'
import FormMessage from './FormMessage'
import VideoInfo from './VideoInfo'


// connecting redux store with react component
@connect((store)=>{
	return {
		store: store.download,
		auth: store.auth
	}
})

class App extends Component {

	componentWillMount(){

		// if coming back from a redirect on downloadPage, populate the link (logical AND for async)
		// if (this.store && this.store.baseUrl){
		// 	this.refs.link.value = "this.store.baseUrl;"
		// 	alert(this.refs.link.value)
		// 	console.log('hey', this.store.baseUrl)
		// 	$('.convert-url').val(this.store.baseUrl)
		// }
	}

	convertLink(){
		var val = this.refs.link.value;
		var id = localStorage.getItem('v-grab-uid') || null;

		// if value has content
		if (val.trim()){
			this.props.dispatch({
				type: 'CONVERT_URL', 
				baseUrl: val,
				payload: axios.post('/api/download/', {
					baseUrl: val,
					id: id 		})
			}).catch(function(e){
				console.log('Error: '+ e)
			})
			this.refs.link.value = '';
		} else {
			this.props.dispatch({type: 'FORM_VALIDATION', message: "Please enter a valid link"})
		}
	}

	render(){
		let status_message;
		const { store } = this.props

		// form message
		if (store.message){
			status_message = <FormMessage error={store.error} message={store.message ? store.message : undefined} />
		}

		// loader
		let loader = store.pending ? "ui active inverted dimmer full-dim" : "";

		// video info
		let show_video_info = ''
		if (store.success) show_video_info = <VideoInfo hash={ store.hash } info={store.videoInfo} />

		return (
			<div className="col-sm-12 col-md-8 col-md-offset-2">
				<div className="center-only main-img">
					<img className="" src="./../assets/img/player.png" />
					<h1 className="jumbo-font">Video Grabber</h1>
				</div>
			    <p className="clean-font">A simple tool designed (completely in React.js) to help you download youtube videos on the fly!</p>
			    <div className="form-group">
					<div className="input-group">
				 		<span className="input-group-addon" >Link</span>
				    	<input type="text" className="form-control input-lg convert-url" ref='link' placeholder="Please enter the youtube link"  />
				  	</div>
				</div>
				<p className="overflow-auto"><a className="btn btn-primary btn-lg pull-right" onClick={this.convertLink.bind(this)}>Convert</a></p>

				{ status_message }

				{ show_video_info }

				<div className={ loader }>
				   <div className="ui large text loader">Converting File</div>
				</div>
			</div>
		)
	}
}


export default App



