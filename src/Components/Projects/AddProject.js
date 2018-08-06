import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from '../../Actions/projectActions';

class AddProject extends Component {
    constructor(prop){
        super();
        this.state = {
            user: '',
            title: '',
            thumbnail: '',
            description: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const post = {
            title: this.state.title,
            thumbnail: this.state.thumbnail,
            description: this.state.description,
            user_id: localStorage.getItem("id")
        }

        this.props.createProject(post);
        
    }

  render() {
    return (
      <div>
        <h4>Add New Project</h4>
        <form onSubmit={this.onSubmit}>
            <div className="row">
                {/* <div className="col-md-1 form-group">
                    <label htmlFor="userid">User Id</label> */}
                    <input type="number" name="user" className="form-control form-control-sm" value={localStorage.getItem("id")} onChange={this.onChange} placeholder="Enter Owner Id" disabled hidden/>
                {/* </div> */}
                <div className="col-md-4 form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control form-control-sm" value={this.state.title} onChange={this.onChange} placeholder="Enter Title"/>
                </div>
                <div className="col-md-5 form-group">
                    <label htmlFor="thumbnail">Thumbnail URL</label>
                    <input type="text" name="thumbnail" className="form-control form-control-sm" value={this.state.thumbnail} onChange={this.onChange} placeholder="Enter Image URL"/>
                </div>
                <div className="col-md-3 form-group">
                    <label htmlFor="desc">Description</label>
                    <textarea className="form-control form-control-sm" name="description" value={this.state.description} onChange={this.onChange} placeholder="Enter Description"/>
                </div>
            </div>
            
            
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}


export default connect(null, { createProject })(AddProject)