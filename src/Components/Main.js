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
          console.log(res.entries);
          this.setState({ folders: res.entries });

          // get thumbnails for the current batch of files
      // dbx.filesGetThumbnailBatch({ 
      //   entries: res.entries.map(function(entry){
      //     console.log(entry);
      //       return {
      //         path: entry.id,
      //         format : {'.tag': 'jpeg'},
      //         size: { '.tag': 'w2048h1536'},
      //         mode: { '.tag': 'strict' }
      //       }
      //   })
      // });
        });


        // get images from image files!
        // dbx.filesGetThumbnailBatch({
        //   entries: [{
        //     path: '/image1.png',
        //     size: 'w32h32',
        //     format: 'png'
        //   }]
        // })
        // .then(res => {
        //   console.log(res);
        // })

        // dbx.filesGetThumbnailBatch({
        //   entries: 
        // })
        // .then(res => {
        //   console.log(res);
        // })

        // dbx.filesGetThumbnail({"path": "/image1.png"})
        // .then(res => {
        //   // console.log(res);
        //   this.setState({ thumbnail: res });
        // })
    }

    componentDidUpdate() {
      const { folders, files } = this.state;
      folders.map(Files => {
        const type = Files['.tag'];

        if (type === 'file') {
          // console.log(Files.name);
        }
      });

      // console.log(files);

      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesGetThumbnailBatch({  
        entries: [{  
          path: '/image1.png image-142881.jpg',  
          size: 'w32h32',  
          format: 'png',  
        }]  
      })
      // .then(res => console.log(res))
    }

    render() {
      const { folders, thumbnail } = this.state;

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
                    {folders.filter(f => f['.tag'] === 'file').map(fl =>{
                      // console.log(fl);
                    })
                    }


                    {folders.map(folder => {
                      // render img icon to files and folders!
                      const type = folder['.tag'];
                      let fileThumbnail
                      let folderThumbnail
                      // type === 'folder' ? folderThumbnail = folderImg : folderThumbnail = fileImg;

                      if (type === 'folder') {
                        folderThumbnail = folderImg;
                      }
                      else {
                        // folderThumbnail = fileImg;
                        // console.log(folder.path_display);

                        let img = folder.path_display;

                        console.log(img);

                        const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });

                        //get images from image files!
                        dbx.filesGetThumbnailBatch({
                          entries: [{
                            path: `${img}`,
                            size: 'w32h32',
                            format: 'png'
                          }]
                        })
                        .then(res => {
                          console.log(res.entries[0].thumbnail);
                          // folderThumbnail = res.entries[0].thumbnail;
                          folderThumbnail = `data:image/jpeg;base64, ${res.entries[0].thumbnail}`;
                          //"data:image/jpeg;base64, ${file.thumbnail}"
                          // fileThumbnail = res.
                        })

                        // let obj = {};
                        // obj = folder

                        // let arr = [];
                        // let arr2 = [];

                        // arr.push(obj);
                        // arr2.push(arr)

                        // console.log(arr2);
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
                    })}
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
