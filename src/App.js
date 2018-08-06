import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux'

import Projects from './Components/Projects/Projects'
import Contents from './Components/Content/Contents'
import SingleContent from './Components/Content/SingleContent'

import Signin from './Components/Session/Signin'
import Signup from './Components/Session/Signup'
// import Signout from './Components/Session/Signout'
import './App.css';
import store from './store';
import $ from 'jquery'
import EditContent from './Components/Content/EditContent';


class App extends Component {
  constructor(){
    super();
    global.base_url = "http://localhost:3000/";
  }

  logout(){
    if(window.confirm("Leaving? Are you sure?")){
      let id = localStorage.getItem("id");
      $.ajax({
        url: global.base_url + "users/" + id,
        contentType: 'application/json',
        dataType: 'json',
        method: 'PUT',
        data: JSON.stringify({
          user: {
            token: null
          }
        }),
        success: function(data, statusText, xhr){
          console.log(xhr.status)
        },
        error: function(xhr, statusText, error) {
          console.log(error, xhr.status)
        }
      })
      localStorage.setItem("jwt", "");
      localStorage.setItem("id", "");
      <Redirect to="/session/signin" />
    } else {
      <Redirect to="/" />
    }
      
  }

  render() {
    
    
   
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <div className="row mt-2">
              {/* <Link to="/projects" className="col-md-2 btn btn-outline-primary">Projects</Link> */}
              <div className="col-md-12">
                <Link to="/" className="btn btn-sm btn-primary">View Projects</Link>
                <div className="btn-group float-right">
                  <Link to="/session/signin" onClick={this.logout} className="btn btn-sm btn-warning float-right">Log Out</Link>
                  <Link to="/session/signin" className="btn btn-sm btn-info float-right">Log in</Link>
                </div>
              </div>
              
            </div>
            
            <hr className="my-1"/>
            <div className="row">
              <div className="col-md-12">
              <Switch>
                <Route exact path="/" render={(props) => (
                  <Projects {...props} />
                )} />
                <Route exact path="/session/signin" render={(props) => (
                  <Signin {...props} />
                )} />
                <Route exact path="/session/signup" render={(props) => (
                  <Signup {...props} />
                )} />
                <Route exact path="/:id" render={({props, match}) => (
                    <Contents pid={match.params.id} />
                )} />
                <Route exact path="/:pid/contents/:cid/edit" render={({props, match}) => (
                  <EditContent pid={match.params.pid} cid={match.params.cid} />
                )} />
                <Route exact path="/:pid/contents/:cid" render={({props, match}) => (
                  <SingleContent projId={match.params.pid} cid={match.params.cid} />
                )} />
                </Switch>
              </div>
              
            </div>
            
          </div>
        </BrowserRouter>
      </Provider>
      // <Root>
      //   <Home></Home>
      // </Root>
      
    );
  }
}



export default App;
 