import React, { Component, PureComponent } from 'react'
import '../Css/filefolder.css'
import ReactDom from 'react-dom'
import { Dropbox } from "dropbox";
import CopyFolderList from './CopyFolderList'
import folderImg from '../Img/folder-img.png';

class CopyWindow extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      path: "",
      folders: [],
    }
  }
  clickAnotherFolder = (path_display) =>{
    this.setState({path:path_display})
  }
  copyIntoCurrentFolder = () =>{
    const{path_display,copy,closeCopyWindow} = this.props
    copy(path_display,path_display)
    closeCopyWindow()
  }
  copyIntoSelectedFolder = () =>{
    const{copy,closeCopyWindow,path_display} = this.props
    const{path} = this.state
    console.log(`${path}${path_display}`)
    copy(path_display,`${path}${path_display}`)
    closeCopyWindow()
  }

  componentDidMount(){
    this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    this.dbx.filesListFolder({path:""})
    .then(response =>{
      this.setState({folders: response.entries.filter(object => object[".tag"] ==="folder" )})
    })
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.path !== this.state.path){
    this.dbx.filesListFolder({path: this.state.path})
    .then(response =>{
      this.setState({folders: response.entries.filter(object => object[".tag"] ==="folder" )})
    })
  }
  }



  render(){
  const{folders,path} = this.state
  console.log(path)
  return ReactDom.createPortal(

  <div className="CopyWindow">
  <div>
  which folder do you want to copy it too?
  </div>
  <ul className="selectFolder">
  {folders.map(folder => (
    <CopyFolderList folder={folder} clickAnotherFolder={this.clickAnotherFolder} copy={this.props.copy}/>

  ))}
  </ul>
  <div>
  <button onClick={this.copyIntoCurrentFolder}>copy into current folder</button>
  <button onClick={this.copyIntoSelectedFolder}>copy into selected folder</button>
  <button onClick={this.props.closeCopyWindow}>avbryt</button>
  </div>


  </div>
  , document.querySelector('#CopyWindow')

)
}
}



export default CopyWindow
