import React, { Component } from 'react'
import { Dropbox } from "dropbox";
import LogOut from './LogOut'
import LeftNav from "./LeftNav"
import Folders from "./Folders"
import RightNav from "./RightNav"

import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: [],
          show: false,
          files: [],
          URL: null,

          folderRename: '',
          fileRename: '',

          
          starArray: [],
          
        }
        this.inputRef = React.createRef();
        this.renameRef = React.createRef();
    }
    // delets files and closes delete window
    onDelete = (path_delete) =>{
      const{folders} = this.state
      this.dbx.filesDelete({path: path_delete})
      .then(response =>{
        let newFolder = folders.filter( folder => folder.name !== response.name)
        this.setState({folders: newFolder})
      })
    }

    //shows the window when click on create folder
    onShowCreateFolder= () =>{
      this.setState({showCreateFolder: true})
      
    }
    //closes the window when click on create folder
    onCloseCreateFolder = () =>{
      this.setState({showCreateFolder: false})
    }

    updateFolderName = e => {
      this.setState({ folderRename: e.target.value });
    }

    updateFileName = e => {
      this.setState({ fileRename: e.target.value });
    }

    // delets files and closes delete window
    onDelete = (path_delete) =>{
      const{folders} = this.state
      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesDelete({path: path_delete})
      .then(response =>{
        let newFolder = folders.filter( folder => folder.name !== response.name)
        this.setState({folders: newFolder })
      })
    }
    createFile = () =>{
      this.inputRef.current.click();
    }
    
    onChangeFile = () =>{
      let file = this.inputRef.current.files[0]
      if(file){
        this.dbx.filesUpload({contents:file, path:`/${file.name}`, autorename: true})
        .then(response=>{
          let file = {}
          file[".tag"] = "success"
          let createFile = {file,metadata: response}
          let uniteFiles = [...this.state.files, createFile]
          this.setState({uniteFiles})
        }).catch(response=>{
        })
      }
    }

    componentDidMount() {

      this.setState({
        starArray: JSON.parse(window.localStorage.getItem("favorites") || "[]")
      });
        let log = JSON.parse(window.localStorage.getItem("favorites"));

      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      this.dbx.filesListFolder({ path: "" })
        .then((res) => {
          this.setState({ folders: res.entries });

          const entries = res.entries
          .filter(x => x[".tag"] === "file")
          .map((x) => ({ path: x.path_display }));
        return this.dbx.filesGetThumbnailBatch({
          entries: entries,
        });
        })
        .then((res) => {
          this.setState({ files: res.entries });
        });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.folders === this.state.folders && prevState.files === this.state.files) {
      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });

      let path = this.props.location.pathname;
      path = path.slice(5);
      this.dbx.filesListFolder({ path: path })
      .then((res) => {
        this.setState({ folders: res.entries })

        const entries = res.entries
        .filter(x => x[".tag"] === "file")
        .map((x) => ({ path: x.path_display }));
      return this.dbx.filesGetThumbnailBatch({ entries });
      })
      .then((res) => {
        this.setState({ files: res.entries });
      });
  }
  }

  search_FOLDERS_FILES = (e) => {
    this.dbx.filesSearch({ path: '' ,query: e.target.value})
    .then(res => {
      let entries = res.matches.map(x => x.metadata);

      this.setState({ folders: entries });

      entries = entries
        .filter(x => x[".tag"] === "file")
        .map((x) => ({ path: x.path_display }));
      return this.dbx.filesGetThumbnailBatch({
        entries: entries,
      });
      })
      .then((res) => {
        this.setState({ files: res.entries });
      });
  }

  downloadFile = (file) => {
    this.dbx.filesGetThumbnail({"path": file})
      .then(res => {
        let objURL = window.URL.createObjectURL(res.fileBlob);
        this.setState({ URL: objURL });
      });
  }
  

//   starFile = (file) => {
//      let newStarArray;
//     const { starArray } = this.state;
//     console.log(starArray, file);
//     if(starArray.find(x => x.metadata.id === file.metadata.id)) {
//       newStarArray = starArray.filter(x => x.metadata.id !== file.metadata.id)
//     }else {
//       newStarArray = [...this.state.starArray, file];
//     }

    
//     let favorites = JSON.parse(localStorage.getItem('favorites'));
  
//     // const newStarArray = [...this.state.starArray, file];
    
//     localStorage.setItem('favorites', JSON.stringify(newStarArray));
    

//      this.setState({
//        starArray: newStarArray
//      })
//     console.log(this.state.starArray);
// }

  renameFolders = (path, id) => {
    const newName = this.state.folderRename;

    this.dbx.filesMoveV2({
      "from_path": path,
      "to_path": `/${newName}`,
    })
    .then(res => {
      const newFolders = [...this.state.folders];
      const idx = newFolders.findIndex(x => x.id === id);
      newFolders[idx] = res.metadata;

      this.setState({ folders: newFolders });

    })
  }

  renameFiles = (path, id) => {
    const newName = this.state.fileRename;

    let splitPath = path.split(".")
    let fileType = splitPath[1];

    this.dbx.filesMoveV2({
      "from_path": path,
      "to_path": `/${newName}.${fileType}`,
    })
    .then(res => {
      let tag = res[".metadata.tag"];
      if(tag === "folder"){
        const newFiles = [...this.state.files];
        const idx = newFiles.findIndex(x => x.id === id);
        newFiles[idx] = res.metadata;
        this.setState({ files: newFiles });return null
      }
      else {
        return null
      }
    })
  }


    render() {

      // let favFiles = this.state.starArray.map(favfile => {
      //   let fileName
      //   let datum
      //   let date_input
      //   let size
      //   let newSize
      //   let i
      //   console.log(favfile)
      //   fileName = favfile.metadata.name;
      //   size = favfile.metadata.size;
      //     i = Math.floor(Math.log(size) / Math.log(1024));
      //     newSize = (size / Math.pow(1024, i)).toFixed(2) * 1 + ""+['B', 'kB', 'MB', 'GB', 'TB'][i]

      //   date_input = new Date((favfile.metadata.client_modified));
      //   datum = new Date(date_input).toDateString();
      //   console.log(favfile);
      //   let image = `data:image/jpeg;base64,${favfile.thumbnail}`;
      //     return (
      //       <tr>
      //         <td>
      //           <div >
      //             <img src={image} style={{ height: '42px', width: '42px' }} alt=""/> 
      //             <a onClick={() => this.downloadFile(favfile.metadata.path_display)} href={this.state.URL} download={fileName} className="favfile" key={favfile.id}> <br /> {favfile.metadata.name} {" Latest change: " + datum} { " Filesize: " + newSize} </a>
      //             <input className="checkbox" type="checkbox"  id={favfile.id} onClick={this.starFile.bind(this, favfile)} />
      //       </div>
      //       </td>
      //       </tr>
      //     )
      //   // }
      //   })

      const { folders, files, } = this.state;

        return (
          <div className="App" >
        
          <LeftNav />
          <p>test</p>
        <div className={"bigBox"}>
          <header>
            <h1>Project X</h1>

              <input 
                className="searchField"
                type="text" 
                onChange={this.search_FOLDERS_FILES.bind(this)} 
                placeholder="Search"
              />
              <LogOut/>
          </header>

          <main>
            <Folders files={files} updateFolderName={this.updateFolderName} folders={folders}/>
            <RightNav  />
          </main>
        </div>
    </div>
      )
    }
  }

export default Main
