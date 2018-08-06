import React, { Component } from 'react'
import ContentItem from './ContentItem'
import AddContent from './AddContent'

import { connect } from 'react-redux'
import { fetchContents } from '../../Actions/contentActions'
import { Link } from 'react-router-dom'

export class Contents extends Component {
  
  componentWillMount(){
    
    this.props.fetchContents(this.props.pid);
  }

  componentWillReceiveProps(nextProp) {
    if(nextProp.newContent){
      this.props.contents.unshift(nextProp.newContent)
    }
  }

  render() {
    let contentItems;
    if(this.props.contents){
      contentItems = this.props.contents.map((content, i) => {
        return(
          <ContentItem key={i} content={content} projId={this.props.pid} />
        )
      })
    }

    let val, divStyle, form
    if(localStorage.getItem("jwt")){
      divStyle = {
        color: 'green',
        fontWeight: 'bold'
      }
      val = "Logged In"
      form = <AddContent projectId={this.props.pid} />
    } else {
      divStyle = {
        color: 'red',
        fontWeight: 'bold'
      }
      val = "Not Logged In"
      form = ""
    }
    return (

      <div>
        <div className="lead text-center" style={divStyle}>{val}</div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
              <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Projects</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contents(Project {this.props.pid})</li>
          </ol>
        </nav>
        {form}
        <hr />
        <h2>Contents</h2>
        <div className="wrapper">
          {contentItems}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  contents: state.contents.items,
  newContent: state.contents.item
})

export default connect(mapStateToProps, { fetchContents })(Contents)

