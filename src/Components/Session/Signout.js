import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Signout extends Component {
    render(){
        localStorage.setItem("jwt", null)
        return (
          <Redirect to="/" />
        )
    }
    
}
