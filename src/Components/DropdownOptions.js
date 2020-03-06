import React, { Component, PureComponent } from 'react'
import '../Css/Options.css'
import ClickedOutsideRemover from './ClickedOutsideRemover'
import DeleteWindow from './DeleteWindow'

class DropdownOptions extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      deleteButtonClicked: false,
      reNameButtonClicked: false,

    }
  }

  // Shows the window asking the user if they want to delete
  onDeleteButtonClicked = () =>{
    this.setState({deleteButtonClicked: true})
  }
  // closes the delete window if you click avbryt or X
  onCloseDeleteWindow = () =>{
    this.setState({deleteButtonClicked: false})
  }

  closeOnDelete = () =>{
    this.setState({deleteButtonClicked: false})
  }
  showRename = () =>{
    this.setState({reNameButtonClicked: true})
  }
  closeRename = () =>{
    this.props.renameFolders(this.props.path,this.props.id)
    this.setState({reNameButtonClicked: false})
  }
  
  

  render(){
  const{onDelete,path,name,id,renameFolders,updateFolderName} = this.props
  const{deleteButtonClicked,reNameButtonClicked} = this.state

  console.log(deleteButtonClicked)
  return(
  <>
  <div className="dropdown">
  <span>...</span>
  <ClickedOutsideRemover>
    <div className="dropdown-content">
    <div className="dropdown-list" onClick={this.onDeleteButtonClicked}>delete</div>
    <div className="dropdown-list" onClick={this.showRename}>rename</div>
    </div>

  </ClickedOutsideRemover>
  {deleteButtonClicked ?
  <DeleteWindow onCloseDeleteWindow={this.onCloseDeleteWindow} path={path} onDelete={onDelete} name={name}/>
  : null}
  {reNameButtonClicked ? 
  <div>
  <input className="tdInput" type="text" onChange={updateFolderName}/>
  <button className="tdButton" onClick={this.closeRename}>Rename</button>
  </div>
  : null}

  </div>
  </>

)}}



export default DropdownOptions
