import React, { Component } from 'react'
import CreateFolder from './CreateFolder'

import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'


 class RightNav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showCreateFolder: false,
        }
    }
    
    //Create Folder
    createFolder = (name) =>{
        this.dbx.filesCreateFolderV2({path: `/${name}`, autorename:true })
        .then(response =>{
          let folder = {}
          folder[".tag"] = "folder"
          let newFolder = {...folder,...response.metadata}
          let allFolders = [...this.state.folders, newFolder]
          this.setState({folders: allFolders})
        }).catch(response=>{
        })
      }
    

    render() {
        const{showCreateFolder} = this.state
        return (
            <div className="sidebarRight">
            <ul>
                <li onClick={this.createFile}>Upload File<input className="input" onChange={this.onChangeFile} type="file" hidden="hidden" ref={this.inputRef}/> </li>
                <br />
                <li> Upload Map </li>
                <br/>
                <li onClick={this.onShowCreateFolder}>
                Create Folder
                </li>
                {showCreateFolder === true ?
                <CreateFolder showCreateFolder={showCreateFolder} createFolder={this.createFolder} onCloseCreateFolder={this.onCloseCreateFolder}/>
                : null}
                <br />
                <li> New Shared Map </li>
            </ul>
              <p className="sideText">Choose your option</p>
            </div>
        )
    }
}

export default RightNav
