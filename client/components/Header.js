
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
  		result = <ul className="nav navbar-nav navbar-right">
                <li><a href="/#/profile">Dashboard</a></li>
                <li><a href="/#/" onClick={this.logOut.bind(this)}>Log Out</a></li>
              </ul>
  	} else {
  		result =  <ul className="nav navbar-nav navbar-right">
                  <li><a href="/#/login">Log In</a></li>
                </ul>
  	}

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="/#/" className="navbar-brand" >
             <span className="img-logo"></span> 
            Video Grabber
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              { result }
          </div>
        </div>
      </nav>
    )
  } 
}