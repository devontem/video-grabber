
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
                <li><a href="#"><Link to={'/profile'}>Dashboard</Link></a></li>
                <li><a href="#" onClick={this.logOut.bind(this)}><Link to={'/'}>Log Out</Link></a></li>
              </ul>
  	} else {
  		result =  <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"><Link to={'/login'}>Log In</Link></a></li>
                </ul>
  	}

    // add this back for title
    //<h1 className="header-text">Video Grabber</h1>
    
    // return (
    //   <div className="ui  segment nav-bar">

    //     { result }
    //   </div>
    // )

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