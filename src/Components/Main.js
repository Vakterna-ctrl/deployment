import React, { Component } from 'react'

import { Dropbox } from "dropbox";
import { Link } from 'react-router-dom'


import '../Css/icons.css'
import '../Css/mainFiles.css'
import LogOut from './LogOut';
import '../Css/nav.css'
import '../Css/UlItems.css'

import folderImg from '../Img/folder-img.png';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: [],
          thumbnail: {},
          files: [],
          URL: null
        }
    }

    componentDidMount() {
      // hämtar folders
      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      this.dbx.filesListFolder({ path: "" })
        .then((res) => {
          console.log('HEJ2', res.entries);
          this.setState({ folders: res.entries });

        const entries = res.entries
          .filter(x => x[".tag"] === "file")
          .map((x) => ({ path: x.path_display }));
        return this.dbx.filesGetThumbnailBatch({
          entries: entries,
        });
        })
        .then((res) => {
          console.log("HEJ", res);
          this.setState({ files: res.entries });
        });
    }

    componentDidUpdate(prevprops, prevState) {
      if (prevState.folders === this.state.folders && prevState.files === this.state.files) {
      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });

      let path = this.props.location.pathname;
      path = path.slice(5);
      this.dbx.filesListFolder({ path: path })
      .then((res) => {
        console.log("HEJ", res)
        this.setState({ folders: res.entries })

        const entries = res.entries
        .filter(x => x[".tag"] === "file")
        .map((x) => ({ path: x.path_display }));
      return this.dbx.filesGetThumbnailBatch({ entries });
      })
      .then((res) => {
        console.log("HEJ", res);
        this.setState({ files: res.entries });
      });
        console.log(this.props.location.pathname);
  }
  }

  downloadFile = (file) => {
    this.dbx.filesGetThumbnail({"path": file})
      .then(res => {
        console.log('HHH', res);
        this.setState({ URL: res.fileBlob });
      });
  }

    render() {
      const { folders, files, URL } = this.state;

      let minaFiler = files.map(file => {
        let image = `data:image/jpeg;base64,${file.thumbnail}`;
        let fileName = file.metadata.name;

        return (
          <tr>
            <div style={{ display: 'flex' }}>
                <img src={image} style={{ height: '42px', width: '42px' }} alt=""/>
                  {/* <td>{file.metadata.name}</td> */}
                  <a onClick={() => this.downloadFile(file.metadata.path_display)} href={URL} download={fileName}>{fileName}</a>
                  {/* <button onClick={() => this.downloadFile(file)}>Download file!</button> */}
            </div>
          </tr>
        )
      })

      let minaFolders = folders.map(folder => {
        console.log('KING2', folders);
        // render img icons to folders!
        const type = folder['.tag'];
        let folderThumbnail

        if (type === 'folder') {
          folderThumbnail = folderImg;
        return (
          <tr>
            <div style={{ display: 'flex' }}>
                <img src={folderThumbnail} style={{ height: '42px', width: '42px' }} alt=""/>
                <td>{folder.name}</td>
              {/* <Link to={`/main${folder.path_display}`} style={{ border: '1px solid' }}>
                  <td>{folder.name}</td>
              </Link> */}
            </div>
          </tr>
        )
      }
      })

        return (
          <div className="App">
            
        <div className="sideLeft">
          <div className="Logo">
            Logo
          </div>
          <ul>
            <li> Start </li>
            <br/>
            <li> Filter </li>
            <br/>
            <li> Paper </li>
            <br/>
            <li> Transfer </li>
          </ul>
        </div>

        <div className={"bigBox"}>
          <header>
            <h1>Project X</h1>
              <input placeholder="Search" type="text" />
              <LogOut />
          </header>

          <main>
          
          <div className="files">
                <table>
                    <thead>
                      <tr>
                        <th>Folder/file name</th>
                      </tr>
                  </thead>

                  <tbody>
                    {minaFolders}
                    {minaFiler}
                </tbody>
                </table>
                
            </div>

            <div className="sidebarRight">
            <ul>
                <li> Upload File </li>
                <br />
                <li> Upload Map </li>
                <br />
                <li> New Map </li>
                <br />
                <li> New Shared Map </li>
                
            </ul>
            <p className="sideText">Choose your option</p>
            </div>
          </main>
        </div>
    </div>
      )
    }
}

export default Main
