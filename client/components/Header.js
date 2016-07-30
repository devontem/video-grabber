
import React, { Component } from 'react'

export default class Header extends Component {

  render(){
    
    return (
      <div className="ui  segment nav-bar">
        <div className="ui  secondary menu">
          <a className="active item">
            Home
          </a>
          <a className="item">
            Messages
          </a>
          <a className="item">
            Friends
          </a>
        </div>
      </div>
    )
  } 
}