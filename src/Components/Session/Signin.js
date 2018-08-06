import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import $ from 'jquery'
import jwt_decode from 'jwt-decode'

export default class Signin extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      success: false
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
      url: global.base_url + "user_token",
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        auth: {
          email: this.state.email,
          password: this.state.password
        }
      }),
      success: function(data, statusText, xhr) {
        let token = data.jwt
        localStorage.setItem("jwt", token)
        let id = jwt_decode(data.jwt)["sub"]
        localStorage.setItem("id", id)
        this.storeToken(id, token);
        
        this.setState({
          success: true
        })
      }.bind(this),
      error: function(xhr, statusText, error){
        console.log(xhr.status, statusText);
        
        this.setState({success: false})
        switch (xhr.status) {
          case 401:
              alert("Woah There! You are not authorized! Naughty!");
              break;
          case 403:
              alert("STOP! You were DENIED!");
              break;
          case 404:
              alert("Email/Password Incorrect");
              break;
      
          default:
              break;
      }
      }.bind(this)
    })
  }

  storeToken(id, tok){
   
    $.ajax({
      url: global.base_url + "users/" + id,
      contentType: 'application/json',
      dataType: 'json',
      method: 'PUT',
      data: JSON.stringify({
        user: {
          token: tok
        }
      }),
      success: function(data, statusText, xhr){
        console.log( xhr.status)
      },
      error: function(xhr, statusText, error) {
        console.log(error, xhr.status)
      }
    })
  }
  

  render() {
    if (localStorage.getItem("jwt")){
      return (
        <div>
          <Redirect to="/" />
        </div>
        
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
              <label htmlFor="password">Password</label>
              <input name="password" type="password" className="form-control" id="password" value={this.state.username} onChange={this.onChange} placeholder="Password"/>
            </div>
            
            <button type="submit" className="btn btn-block btn-primary">Sign In</button>
            <div className="form-group mt-5">
              <Link to="/session/signup" className="btn btn-outline-success btn-block">Register for a new Account</Link>
            </div>
          </form>
        </div>
      )
    }
    
  }
}
