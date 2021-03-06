import React, { Component } from 'react'
import folderImg from '../Img/folder-img.png';

// Denna komponenten renderar ut folders i fönstret som man kan välja för att flytta våra filer/folders
class SelectFolder extends Component {
    choosepath = () =>{
        this.props.setPath(this.props.folder.path_display)
    }

    render() {
        const{folder} = this.props
        return (
            <>
                <li onClick={this.choosepath}>
                    <img src={folderImg} style={{ height: '42px', width: '42px', marginBottom:'-10px' }} alt=""/>{folder.name}
                </li>
            </>
        )
    }
}

export default SelectFolder