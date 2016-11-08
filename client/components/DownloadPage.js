import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'
import VideoInfo from './VideoInfo'

@connect((store)=>{
	return {
		store: store.status
	}
})

export default class DownloadPage extends Component {

	componentWillMount(){
		this.checkStatus();
	}

	checkStatus(){
		var id = this.props.params.id;

		this.props.dispatch({
			type: 'CHECK_STATUS',
			payload: axios.get('/api/download/check/id/'+id)
			})
			.catch(e=>{
				console.log('Error: ', e);
			})
	}

	clearDownloadState(){
		this.props.dispatch({type: 'CLEAR_DOWNLOAD_STATE'})
	}

	openDl(id){

		var wnd = window.open("/api/download/id/"+id, "mywindow","menubar=1,resizable=1,width=350,height=250");
	    setTimeout(function() {
	      wnd.close();
	    }, 2000);


	    this.checkStatus();
	    this.clearDownloadState();
	}

	// sets up video URL to be re-converted, then redirected to conversion page
	redownload(link){
		if (link){
			// send action to re-convert video
			this.props.dispatch({
				type: 'CONVERT_AGAIN',
				baseUrl: link
			})
			.then(function(){
				// redirect to download page
				this.props.history.push('/');
			});

			// redirect to download page
			// this.props.history.push('/');

		}
	}

	render(){
		const { store, params } = this.props;
		let result = '', show_video_info = '';
		let error_message = 'This video has already been downloaded or has expired! Please try to convert again.';

		// video info
		if (store.videoInfo) show_video_info = <VideoInfo hash={ store.videoInfo.hash } hideButton={true} info={store.videoInfo} />

		// messaging 
		if (store.status === true){
			result = 
				<div className="">
					<h1 className="text-center">{store.message}</h1>
					<div className="btn-group btn-group-justified">
	          			<a className="btn btn-success btn-lg btn-block" onClick={this.openDl.bind(this, params.id)} id="target">Click to download!</a>
	          			<a className="btn btn-danger btn-lg btn-block" target="_blank" href={store.videoInfo.webpage_url } id="target">Youtube Link</a>
	          		</div>
				</div>

		} else {
			// async issues
			// var link = store.videoInfo ? store.videoInfo.webpage_url : undefined;
			// onClick={this.redownload.bind(this, link)

			result =
			<div className="">
				<h1 className="text-center">{store.message || error_message }</h1>
					<div className="btn-group btn-group-justified">
        			<a className="btn btn-default btn-lg btn-block" href="/#/">Try Again?</a>
        			</div>
				</div>
		}

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "";

		return(
	      <div className="col-sm-12 col-md-8 col-md-offset-2">
	  			<div className="panel panel-primary">
	  			  <div className="panel-heading">
	  			    <h1 className="panel-title">Video ID: { params.id }</h1>
	  			  </div>
	  			  <div className="panel-body">
	  			    {result}
	  			  </div>

	  			  	<div className={ loader }>
	  			   		<div className="ui large text loader"></div>
	  			 		</div>
	  			</div>

	  			{ show_video_info }
	      </div>
		)
	}
}