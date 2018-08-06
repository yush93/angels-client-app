import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createContent } from '../../Actions/contentActions';

class AddContent extends Component {
    constructor(prop){
        super();
        this.state = {
            projectId: '',
            title: '',
            ctype: 'map'
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
            ctype: this.state.ctype,
            project_id: this.props.projectId
        }

        this.props.createContent(post["projectId"], post);
        
    }

  render() {
    return (
      <div>
        <h4>Add New Content</h4>
        <form onSubmit={this.onSubmit}>
            <div className="row">
                <div className="col-md-2 form-group">
                    <label htmlFor="projId">Project Id</label>
                    <input type="number" name="projectId" className="form-control form-control-sm" value={this.props.projectId} onChange={this.onChange} placeholder="Enter Owner Id" disabled/>
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control form-control-sm" value={this.state.title} onChange={this.onChange} placeholder="Enter Title"/>
                </div>
                <div className="col-md-2 form-group">
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
                <div className="col-md-2 form-group btn-holder">
                    <button type="submit" className="btn btn-sm btn-primary mb-0">Add New Content</button>
                </div>
            </div>
            
        </form>
      </div>
    )
  }
}


export default connect(null, { createContent })(AddContent)
