
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class VideoInfo extends Component {

  handleClick(){
    this.props.history.pushState(null, '/download/id/'+this.props.info.hash)
  }

  render(){

    const { info, hash } = this.props;

    // show download button is 'hide flag' is false/undefined
    let downloadButton = '';
    if (!this.props.hideButton){
        downloadButton = <div className="ui right floated button text-right">
                            <button type="button" className="btn btn-default"><Link to={'/download/id/'+hash}> Download Video! </Link></button>
                        </div>
    }

    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h4><strong>{info.title}</strong></h4>
            </div>
            <div className="panel-body">
                <div className="col-xs-12 col-sm-6">
                    <a href={info.webpage_url} target="_blank" className="thumbnail">
                      <img src={info.thumbnail} alt="Video Thumbnail"/>
                    </a>
                </div>

                { downloadButton }
                
                <div className="col-xs-12 col-sm-6">
                    <strong>Description: </strong> {info.description.substr(0, 200) + '...'}
                </div>
            </div>
        </div>
    )
  } 
}