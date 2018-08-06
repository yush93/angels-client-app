import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import ReactJson from 'react-json-view'

class ProjectItem extends Component {

    
  render() {
    let project = this.props.project;
    // let projectAttr = project["attributes"];
    
    return (
      <div className="border border-info p-2">
        <ReactJson name="data" enableClipboard={false} iconStyle="triangle" src={project} />
        <Link to={"/" + project.id} className="btn btn-outline-primary btn-sm btn-block">View</Link>
      </div>
      
    );
  }
}



export default ProjectItem;
