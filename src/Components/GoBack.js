import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class GoBack extends Component {

  goBackwards = () =>{
    if(!this.props.path){
      return "/main"
    }
    let path = this.props.path.split('/')
    let cutpath = path.slice(0,path.length-1)
    let newPath = cutpath.reduce((acc,currentpath) => (acc + `/${currentpath}`),"")
    return `/main${newPath}`
  }

    render() {
        return (
          <div onClick={this.goBackwards}>
          <Link to={this.goBackwards}>Go Back</Link>
          </div>

        )
    }
}

export default GoBack
