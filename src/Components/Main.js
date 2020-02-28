import React, { Component } from 'react'

import { Dropbox } from "dropbox";
import { Link } from 'react-router-dom'

import LogOut from './LogOut';

import '../Css/nav.css'

import folderImg from '../Img/folder-img.png';
import fileImg from '../Img/file-img.png';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: [],
          thumbnail: {},
          files: []
        }
    }

    componentDidMount() {
      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({ path: "" })
        .then((res) => {
          console.log('HEJ2', res.entries);
          this.setState({ folders: res.entries });


          const entries = res.entries
            .filter(x => x[".tag"] === "file")
            .map((x) => ({ path: x.path_display }));

          return dbx.filesGetThumbnailBatch({ entries });
        })
        .then((res) => {
          console.log("HEJ", res);
          
          this.setState({ files: res.entries });
        });
    }

    componentDidUpdate(prevprops, prevState) {
      if (prevState.folders === this.state.folders) {
    const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });

  let path = this.props.location.pathname;
  path = path.slice(5);
  dbx.filesListFolder({ path: path })
  .then((response) => {
    console.log("HEJ", response)
    this.setState({
      folders: response.entries,
    })
  })
    console.log(this.props.location.pathname)

    //   const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    //   dbx.filesGetThumbnailBatch({  
    //     entries: [{  
    //       path: '/image1.png image-142881.jpg',  
    //       size: 'w32h32',  
    //       format: 'png',  
    //     }]  
    //   })
    //   // .then(res => console.log(res))
  }
    }

    render() {
      const { folders, files } = this.state;

      let filess = files.map(file => {
        console.log('KING', file);
        console.log('KING  thumbnail', file.thumbnail);
        let image = `data:image/jpeg;base64,${file.thumbnail}`;
        console.log('KING', file.metadata.name);
        console.log(' KING //////////////////////////////////////////////////////////////////////');
        // console.log('KING', file.metadata.name);

        return (
          <tr>
            <div style={{ display: 'flex' }}>
                <img src={image} style={{ height: '42px', width: '42px' }} alt=""/>
              {/* <Link to={`/folder${folder.path_display}`} style={{ border: '1px solid' }}> */}
                  <td>{file.metadata.name}</td>
              {/* </Link> */}
            </div>
          </tr>
        )
      })

      let folderss = folders.map(folder => {
        console.log('KING2', folders);
        // render img icon to files and folders!
        const type = folder['.tag'];
        let folderThumbnail
        // type === 'folder' ? folderThumbnail = folderImg : folderThumbnail = fileImg;

        if (type === 'folder') {
          folderThumbnail = folderImg;
        
        // else {
        //   folderThumbnail = fileImg;
        // }
        // let objectUrl = URL.createObjectURL(thumbnail.fileBlob);
        return (
          <tr>
            <div style={{ display: 'flex' }}>
                <img src={folderThumbnail} style={{ height: '42px', width: '42px' }} alt=""/>
              <Link to={`/main${folder.path_display}`} style={{ border: '1px solid' }}>
                  <td>{folder.name}</td>
              </Link>
            </div>
          </tr>
        )
      }
      })

        return (
          <div className="App">
        <div className="sideLeft">
          <div>
            Logo
          </div>
          <ul>
            <li> Link 1 </li>
            <li> Link 7 </li>
            <li> Link 3 </li>
            <li> Link 1 </li>
          </ul>
        </div>

        <div className={"bigBox"}>
          <header>
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
                    {folderss}

                    {filess}

                    {/* {folders.map(folder => {
                      // render img icon to files and folders!
                      const type = folder['.tag'];
                      let folderThumbnail
                      // type === 'folder' ? folderThumbnail = folderImg : folderThumbnail = fileImg;

                      if (type === 'folder') {
                        folderThumbnail = folderImg;
                      }
                      else {
                        folderThumbnail = fileImg;
                      }
                      // let objectUrl = URL.createObjectURL(thumbnail.fileBlob);
                      return (
                        <tr>
                          <div style={{ display: 'flex' }}>
                              <img src={folderThumbnail} style={{ height: '42px', width: '42px' }} alt=""/>
                            <Link to={`/folder${folder.path_display}`} style={{ border: '1px solid' }}>
                                <td>{folder.name}</td>
                            </Link>
                          </div>
                        </tr>
                      )
                    })} */}
                </tbody>
                </table>
            </div>

            <div className="sidebarRight">
            <ul>
                <li> Link 1 </li>
                <li> Link 1 </li>
                <li> Link 1 </li>
                <li> Link 1 </li>
            </ul>
            </div>
          </main>
        </div>
    </div>
      )
    }
}

export default Main
