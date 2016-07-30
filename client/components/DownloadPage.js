import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Link } from 'react-router'

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

	download(id){
		window.open('/api/download/id/'+id)
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

	render(){
		const { store, params } = this.props;
		let result = ''

		// messaging 
		if (store.status === true){
			result = 
				<div>
					<div className="ui large header">{store.message}</div>
					<button className="ui massive green button" onClick={this.openDl.bind(this, params.id)} id="target">Click to Download!</button>
				</div>
			
		} else {
			result = <div>
				<div className="ui large header">{store.message}</div>
				<button className="ui massive blue button try-again"><Link to={'/'}>Try Again?</Link></button>
				</div>
			
		}

		// loader
		let loader = store.pending ? "ui active inverted dimmer" : "ui inverted dimmer";

		return(
			<div className="main-wrapper center">
				<div className="ui segment content">
					<div className="ui huge header">Video ID: {params.id}</div>
					
					<div className={ loader }>
				   		<div className="ui large text loader"></div>
				 	</div>

					{result}
				</div>
			</div>
		)
	}
}