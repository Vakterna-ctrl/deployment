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
      }).then(response=>{
        console.log(response)
      })
    }

    componentDidMount() {
      
      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      let path = ""
      if(this.props.match.params){
        path = `/${this.props.match.params.path}`
      }
      this.dbx.filesListFolder({ path: path })
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

    render() {
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
