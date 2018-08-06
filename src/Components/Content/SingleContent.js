import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchContent } from '../../Actions/contentActions'
import { Link } from 'react-router-dom'
import ReactJson from 'react-json-view'


export class SingleContent extends Component {

    componentWillMount(){
        this.props.fetchContent(this.props.projId, this.props.cid)
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.newContent){
        
        this.props.contents.unshift(nextProps.newContent);        
      } else {
      }
    }





  render() {
      let test = this.props.contents.shift();

          let val, divStyle, link
        if(localStorage.getItem("jwt")){
          divStyle = {
            color: 'green',
            fontWeight: 'bold'
          }
          val = "Logged In"
          link = <Link to={"/"+ test["attributes"]["project-id"] + "/contents/" + test.id + "/edit" } className="btn btn-sm btn-block btn-outline-primary">Edit</Link>
        } else {
          divStyle = {
            color: 'red',
            fontWeight: 'bold'
          }
          val = "Not Logged In"
          link = ""
        }
        return (
          <div>
            <div className="lead text-center" style={divStyle}>{val}</div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Projects</Link></li>
                  <li className="breadcrumb-item" aria-current="page"><Link to={"/" + test["attributes"]["project-id"]}>Contents(Project {test["attributes"]["project-id"]})</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">View</li>
              </ol>
            </nav>
            <h3>Content</h3>
            <div className="wrapper">
              <div className=" border border-info p-2">
              <ReactJson name="data" enableClipboard={false} iconStyle="triangle" src={test} />
              {link}
              </div>
              
            </div>
          </div>
        )
      
      
    
  }
}

const mapStateToProps = (state) => ({
  contents: state.contents.items,
  newContent: state.contents.gitem
})


export default connect(mapStateToProps, { fetchContent })(SingleContent)
