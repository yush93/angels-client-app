import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
import AddProject from './AddProject'


import { connect } from 'react-redux'
import { fetchProjects } from '../../Actions/projectActions'

class Projects extends Component {

  componentWillMount(){
    this.props.fetchProjects();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newProject){
      this.props.projects.unshift(nextProps.newProject);
    }
  }
    
  render() {
    
    let projectItems;
    if(this.props.projects){
        projectItems = this.props.projects.map((project, i) => {
            return(
                <ProjectItem key={i} project={project}/>
            );
        })
    }
    let val, divStyle, form
    if(localStorage.getItem("jwt")){
      divStyle = {
        color: 'green',
        fontWeight: 'bold'
      }
      val = "Logged In"
      form = <AddProject />
    } else {
      divStyle = {
        color: 'red',
        fontWeight: 'bold'
      }
      val = "Not Logged In"
      form = ""
    }
    return (
      
      <div className="Projects">
        <div className="lead text-center" style={divStyle}>{val}</div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">Projects</li>
          </ol>
        </nav>
        {form}
        <hr/>
        <h2>Projects</h2>
        <div className="wrapper">
            {projectItems}
        </div>
          
      </div>
    );
  }
}

// the projects in state.projects is the reducer key in rootReducer
const mapStateToProps = state => ({
  projects: state.projects.items,
  newProject: state.projects.item
})

export default connect(mapStateToProps, { fetchProjects })(Projects);