import React, { PureComponent } from 'react'
import '../Css/filefolder.css'

// // Denna component är vår routing i move fönstret
class RouterForMoveWindow extends PureComponent{
  constructor(props){
    super(props)
  }

  clickRouter = () =>{
    this.props.onClickRouting(this.props.route)
  }

  render(){
  const{route} = this.props
  let createRoute = route.split('/')

    return(
    <>
      <span onClick={this.clickRouter} className="routing">{createRoute[createRoute.length-1]}></span>
    </>
    )
  }
}

export default RouterForMoveWindow