import React, { Component } from 'react'
import { connect } from 'react-redux';
import { editContent, deleteContent } from '../../Actions/contentActions';
import $ from 'jquery'
import { Redirect, Link } from 'react-router-dom'

class EditContent extends Component {
    constructor(){
        
        super();
        
        this.state = {
            projectId: '',
            title: '',
            ctype: '',
            done: false,
            actionType: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        let cid = this.props.cid
        let pid = this.props.pid
        $.ajax({
            url: global.base_url + "projects/" + pid + "/contents/" + cid,
            contentType: 'application/json',
            dataType: 'json',
            method: 'GET',
            success: function(content, statusText, xhr){
                this.setState({
                    projectId: content["data"]["attributes"]["project-id"],
                    title: content["data"]["attributes"]["title"],
                    ctype: content["data"]["attributes"]["ctype"]
                })
            }.bind(this),
            error: function(xhr, statusText, err){
                console.log(err);
            } 
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        let cid = this.props.cid
        const post = {
            title: this.state.title,
            ctype: this.state.ctype,
            project_id: this.state.projectId
        }

        this.props.editContent(post["project_id"], cid, post);

        this.setState({
            done: true,
            actionType: 'edit'
        })
        
    }


    handleDelete(pid, cid){
      this.props.deleteContent(pid, cid)
      this.setState({
            done: true,
            actionType: 'delete'
        })
    }

  render() {
      
    
    let contentId = this.props.cid
    let projectId = this.props.pid
      if (this.state.done){
          let ret
          switch (this.state.actionType) {
            case 'edit':
                ret = <Redirect to={"/" + projectId + "/contents/" + contentId } />
                break;
            case 'delete':
                ret = <Redirect to={"/" } />
                break;
              default:
                break;
          }
          return (
              ret
          )
      } else {
        
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Projects</Link></li>
                        <li className="breadcrumb-item" aria-current="page"><Link to={"/" + projectId}>Contents(Project {projectId})</Link></li>
                        <li className="breadcrumb-item" aria-current="page"><Link to={"/" + projectId + "/contents/" + contentId}>View</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Content</li>
                    </ol>
                </nav>
                
              <h4>Edit Content</h4>
              <form onSubmit={this.onSubmit}>
                  <div className="row">
                      <div className="col-md-2 form-group">
                          <label htmlFor="projId">Project Id</label>
                          <input type="number" name="projectId" className="form-control form-control-sm" value={projectId} placeholder="Enter Owner Id" disabled/>
                      </div>
                      <div className="col-md-7 form-group">
                          <label htmlFor="title">Title</label>
                          <input type="text" name="title" className="form-control form-control-sm" value={this.state.title} onChange={this.onChange} placeholder="Enter Title"/>
                      </div>
                      <div className="col-md-3 form-group">
                          <label htmlFor="title">Title</label>
                          <select name="ctype" value={this.state.ctype} onChange={this.onChange} className="form-control form-control-sm">
                              <option value="map">map</option>
                              <option value="blueprint">blueprint</option>
                              <option value="marker">marker</option>
                              <option value="mapping">mapping</option>
                              <option value="length">length</option>
                              <option value="area">area</option>
                              <option value="volume">volume</option>
                          </select>
                      </div>
                  </div>
                  <div className="wrapper small">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button onClick={
                      (e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(projectId, contentId) }
                      } type="button" className="btn btn-danger">Delete</button>
                  </div>
                  
              </form>
            </div>
          )
      }
    //   let title = this.props.edit["attributes"].title
    //   let ctype = this.props.edit["attributes"].ctype
      
    
  }
}

const mapStateToProps = (state) => ({
    contents: state.contents.items,
    newContent: state.contents.gitem
})


export default connect(null, { editContent, deleteContent })(EditContent)
