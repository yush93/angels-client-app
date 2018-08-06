import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
// import Signin from './Signin';

export default class Signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      done: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault()
   
    $.ajax({
      url: global.base_url + "users",
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
          user: {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
      }),
      success: function(data, statusText, xhr) {
        this.setState({done: true})
      }.bind(this),
      error: function(xhr, statusText, error){
        console.log(error);
        switch (xhr.status) {
          case 401:
              alert("Woah There! You are not authorized! Naughty!");
              break;
          case 403:
              alert("STOP! You were DENIED!");
              break;
          case 404:
              alert("Uh oh! Something seems to have misplaced!");
              break;
          case 422:
              alert("Email already registered");
              break;
      
          default:
              break;
      }
        
      }
    })
    
  }

  render() {
      if (this.state.done) {
          return(
            <Redirect to="/session/signin" />
          )
      } else {
        return (
            <div className="row justify-content-center">
              <form onSubmit={this.onSubmit} className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input name="email" type="email" className="form-control" id="email" value={this.state.email} onChange={this.onChange} placeholder="Enter email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input name="name" type="text" className="form-control" id="name" value={this.state.name} onChange={this.onChange} placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input name="password" type="password" className="form-control" id="password" value={this.state.username} onChange={this.onChange} placeholder="Password"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password_confirmation">Password</label>
                  <input name="password_confirmation" type="password" className="form-control" id="password_confirmation" value={this.state.username} onChange={this.onChange} placeholder="Password"/>
                </div>
                
                <button type="submit" className="btn btn-block btn-success">Sign Up</button>
                
              </form>
            </div>
          )
      }
    
  }
}
