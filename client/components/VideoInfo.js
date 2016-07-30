
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class VideoInfo extends Component {

  handleClick(){
    this.props.history.pushState(null, '/download/id/'+this.props.info.hash)
  }

  render(){

    const { info, hash } = this.props;

    return (
      <div className="ui items">
        <div className="item">
          <div className="ui small image">
            <img src={info.thumbnail} />
          </div>
          <div className="middle aligned content">
            <div className="header">
              {info.title}
            </div>
            <div className="description">
              <p><strong>Description:</strong> {info.description}</p>
            </div>
            <div className="extra">
              <div className="ui right floated button">
                <Link to={'/download/id/'+hash}> Download Video! </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 
}