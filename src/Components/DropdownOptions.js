import React, { Component, PureComponent } from 'react'
import '../Css/Options.css'
import ClickedOutsideRemover from './ClickedOutsideRemover'
import DeleteWindow from './DeleteWindow'
import NewName from './NewName'

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
  closeRenameFolder = () =>{
    this.props.renameFolders(this.props.path,this.props.id)
    this.setState({reNameButtonClicked: false})
  }
  closeRenameFiles = () =>{
    this.props.renameFiles(this.props.path,this.props.id)
    this.setState({reNameButtonClicked: false})
  }
  hideRename = () =>{
    this.setState({reNameButtonClicked: false})
  }



  render(){
  const{onDelete,path,name,id,renameFolders,renameFiles,tag,updateFolderName,updateFileName} = this.props
  const{deleteButtonClicked,reNameButtonClicked} = this.state

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
  <DeleteWindow onCloseDeleteWindow={this.onCloseDeleteWindow} closeOnDelete={this.closeOnDelete} tag={tag} path={path} onDelete={onDelete} name={name}/>
  : null}
  {reNameButtonClicked ? <NewName
     rename={tag === 'folder' ? renameFolders : renameFiles} update={tag === 'folder' ? updateFolderName : updateFileName}
     closeRename={tag === 'folder' ? this.closeRenameFolder : this.closeRenameFiles}
     hideRename = {this.hideRename}
     />
     
  : null}

  </div>
  </>

)}}



export default DropdownOptions
