import React, { Component } from 'react'
import DropdownOptions from "./DropdownOptions"
import {Link} from 'react-router-dom'
import folderImg from '../Img/folder-img.png';

class Folders extends Component {
    render() {
        const{files,folders} = this.props


        let minaFiler = files.map(file => {
            let image = `data:image/jpeg;base64,${file.thumbnail}`;
    
            let fileName
            let date_input
            let datum
            let size
            let newSize
            let i
    
            if(file[".tag"] === "failure"){
              return null
            }
            else {
              fileName = file.metadata.name;
              date_input = new Date((file.metadata.client_modified));
              datum = new Date(date_input).toDateString();
    
              size = file.metadata.size;
              i = Math.floor(Math.log(size) / Math.log(1024));
              newSize = (size / Math.pow(1024, i)).toFixed(2) * 1 + ""+['B', 'kB', 'MB', 'GB', 'TB'][i];
            }
          
            return (
              <tr>
                <td>
                <div style={{ display: 'flex' }}>
                  <img src={image} style={{ height: '42px', width: '42px' }} alt=""/>
                  <a onClick={() => this.downloadFile(file.metadata.path_display)} href={URL} download={fileName}>{fileName}</a>
    
                  <span>{" Latest change: " + datum}</span>
                  <span>{" Filesize: " + newSize}</span>
    
                  {/* <input className="checkboxFiles" type="checkbox"  id={file.id} onClick={this.starFile.bind(this, file)} /> */}
    
                  <input className="tdInput" type="text" onChange={this.props.updateFileName}/>
                  <button className="tdButton" onClick={() => this.renameFiles(file.metadata.path_display, file.metadata.id)}>Rename</button>
    
                </div>
                </td>
              </tr>
            )
          })



        let minaFolders = folders.map(folder => {
            // render img icons to folders !
            const type = folder['.tag'];
            let folderThumbnail
    
            if (type === 'folder') {
              folderThumbnail = folderImg;
            return (
              <tr>
                <td>
                <div style={{ display: 'flex' }}>
                <img src={folderThumbnail} style={{ height: '42px', width: '42px' }} alt=""/>
    
                <Link to={`/main${folder.path_display}`}>
                  {folder.name}
                </Link>
                {/* <input className="checkboxFiles" type="checkbox"  id={folder.id} onClick={this.starFile.bind(this, folder)} /> */}
    
                    {/* <input className="input" type="text" onChange={this.updateFolderName.bind(this)}/>
                    <button onClick={() => this.renameFolders(folder.path_display)}>Rename</button> */}
    
                    <td className="dropdownList">
                      <DropdownOptions
                        onDelete={this.onDelete}
                        path={folder.path_display}
                        name={folder.name}
                        id={folder.id}
                        updateFolderName={this.props.updateFolderName}
                        renameFolders={this.renameFolders}
                      />
                    </td>
                </div>
                </td>
              </tr>
            )
          }
          })

          return(
            <div className="files">
            <table className="table">
                <thead>
                  <tr>
                    <th>Folder/file name</th>
                  </tr>
              </thead>
              <tbody>
    
              <h2>Folders!</h2>
                {minaFolders}
    
              <h2 style={{ marginTop: '10%' }}>Files!</h2>
                {minaFiler}
    
              <h2 style={{ marginTop: '10%' }} >Favorites</h2>
                {/* {favFiles} 
                 */}
    
            </tbody>
            </table>
        </div>
    
        )
        
    }
    
}

export default Folders

