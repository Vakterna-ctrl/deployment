import React, { Component, PureComponent } from 'react'
import '../Css/Options.css'
import ClickedOutsideRemover from './ClickedOutsideRemover'
import DeleteWindow from './DeleteWindow'

class DropdownOptions extends PureComponent{
  constructor(props){
    super(props)
    
  }


  render(){
    const{update, rename} = this.props
  return(
    <div>
    <input className="tdInput" type="text" onChange={update}/>
    <button className="tdButton" onClick={this.props.closeRename}>Rename</button>
    </div>

)}}



export default DropdownOptions
