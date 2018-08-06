import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactJson from 'react-json-view'

export default class ContentItem extends Component {
  render() {
      let content = this.props.content
      // let contentAttr = content["attributes"]


    return (
      <div className="border border-info p-2">
        <ReactJson name="data" enableClipboard={false} iconStyle="triangle" src={content} />
        <Link to={"/" + this.props.projId + "/contents/" + content.id} className="btn btn-outline-primary btn-sm btn-block">View</Link>
      </div>
    )
  }
}
