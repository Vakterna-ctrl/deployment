import React, { Component } from 'react'
import { Dropbox } from "dropbox";
import LogOut from './LogOut'
import LeftNav from "./LeftNav"
import Folders from "./Folders"
import RightNav from "./RightNav"
import Header from './Header'

import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: [],
          files: [],

          folderRename: '',
          fileRename: '',
          changes: false,

          starArray: [],

        }
        this.renameRef = React.createRef();
    }
    setFolderState = (newFolder) =>{
      this.setState({folder: newFolder})
    }
    setFileState = (newFile) =>{
      this.setState({file: newFile})
    }

    updateFolderName = e => {
      this.setState({ folderRename: e.target.value });
    }

    updateFileName = e => {
      this.setState({ fileRename: e.target.value });
    }

    // delets files and closes delete window
    onDelete = (path_delete, tag) =>{
      if(tag === 'folder'){
      const{folders} = this.state
      this.dbx.filesDelete({path: path_delete})
      .then(response =>{
        let newFolder = folders.filter( folder => folder.name !== response.name)
        this.setState({folders: newFolder })
      })
    }else{
      const{files} = this.state
      this.dbx.filesDelete({path: path_delete})
      .then(response =>{
        let newFiles = files.filter( files => {
          if (files['.tag'] === 'failure') {
            return null;
          }
          else {
            return files.metadata.name !== response.name;
          }
        })
        this.setState({files: newFiles })
      })
    }
    }

    componentDidMount() {

      this.setState({
        starArray: JSON.parse(window.localStorage.getItem("favorites") || "[]")
      });
        let log = JSON.parse(window.localStorage.getItem("favorites"));
        
      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      let path = ""
      if(this.props.match.params.path){
        path = `/${this.props.match.params.path}`
      }
      this.dbx.filesListFolder({ path: path })
      .then((resFolder) => {
        console.log(resFolder)
        this.dbx.filesListFolderLongpoll({cursor: resFolder.cursor})
        .then(response => {
          console.log('lol')
          this.setState({changes: true})

        })

        const entries = resFolder.entries
          .filter(x => x[".tag"] === "file")
          .map((x) => ({ path: x.path_display }));
        return this.dbx.filesGetThumbnailBatch({
          entries: entries,
        })
        .then((res) => {
          this.setState({ files: res.entries, folders: resFolder.entries});
        })
      })

    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.changes) {
        console.log('lol')

        let path = ""
        if(this.props.match.params.path){
          path = `/${this.props.match.params.path}`
        }
        this.dbx.filesListFolder({ path: path })
        .then((resFolder) => {

          this.dbx.filesListFolderLongpoll({cursor: resFolder.cursor})
          .then(response => this.setState({changes: true}))

          const entries = resFolder.entries
            .filter(x => x[".tag"] === "file")
            .map((x) => ({ path: x.path_display }));
          return this.dbx.filesGetThumbnailBatch({
            entries: entries,
          })
          .then((res) => {
            this.setState({ files: res.entries, folders: resFolder.entries, changes:false });
          })
        })
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
      const newFiles = [...this.state.files];
      const idx = newFiles.findIndex(x => {
        if (x['.tag'] === 'failure') {
          return null
        }
        else {
          return x.metadata.id === id;
        }
      })

      newFiles[idx] = res.metadata;

      this.setState({ files: newFiles });
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

          <LeftNav dbx={this.dbx}/>
        <div className={"bigBox"}>
          <Header search_FOLDERS_FILES={this.search_FOLDERS_FILES} path={this.props.match.params.path}/>
          <main>
            <Folders dbx={this.dbx} files={files} renameFiles={this.renameFiles} updateFileName={this.updateFileName}
            renameFolders={this.renameFolders} updateFolderName={this.updateFolderName} folders={folders} onDelete={this.onDelete}/>
            <RightNav path={this.props.match.params.path} files={files} folders={folders} dbx={this.dbx} setFileState={this.setFileState} setFolderState={this.setFolderState} />
          </main>
        </div>
    </div>
      )
    }
  }

export default Main
