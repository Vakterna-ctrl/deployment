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



    copy = (original_path, your_path) =>{
      let url;
      if(this.props.match.params.path){
         url = this.props.match.params.path
      }
      this.dbx.filesCopy({
        from_path: original_path,
        to_path: your_path,
        autorename: true,
      })
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
      if (this.state.changes || this.props.match.params.path !== prevProps.match.params.path) {
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
            <Folders dbx={this.dbx} files={files} renameFiles={this.renameFiles} updateFileName={this.updateFileName} copy={this.copy}
            renameFolders={this.renameFolders} updateFolderName={this.updateFolderName} folders={folders} onDelete={this.onDelete}  setFileState={this.setFileState} setFolderState={this.setFolderState}/>
            <RightNav path={this.props.match.params.path} files={files} folders={folders} dbx={this.dbx} setFileState={this.setFileState} setFolderState={this.setFolderState} />
          </main>
        </div>
    </div>
      )
    }
  }

export default Main
