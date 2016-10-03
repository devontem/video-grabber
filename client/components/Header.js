
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from "react-redux"

@connect((store)=>{
  return {
    auth: store.auth
  }
})

export default class Header extends Component {

  logOut(){
    localStorage.removeItem('v-grb');
    localStorage.removeItem('v-grab-uid');

    // clearing the stores of user information
    this.props.dispatch({
      type: 'LOGOUT'
    });
  }

  render(){
  	let result;

  	if (this.props.loggedIn){
  		result = <div><button className="ui blue button try-again"><Link to={'/profile'}>Profile</Link></button><button className="ui blue button try-again" onClick={this.logOut.bind(this)}><Link to={'/'}>Log Out</Link></button></div>
  	} else {
  		result = <button className="ui blue button try-again"><Link to={'/login'}>Log In</Link></button>
  	}

    // add this back for title
    //<h1 className="header-text">Video Grabber</h1>
    
    return (
      <div className="ui  segment nav-bar">

        { result }
      </div>
    )
  } 
}