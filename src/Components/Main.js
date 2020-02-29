import React, { Component } from 'react'

import { Dropbox } from "dropbox";
import { Link } from 'react-router-dom'
import DropdownOptions from './DropdownOptions'
import DeleteWindow from '../Components/DeleteWindow'

import '../Css/icons.css'
import '../Css/mainFiles.css'
import LogOut from './LogOut';
import '../Css/nav.css'
import '../Css/UlItems.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: [],
          show: false,
        }
    }
    // delets files and closes delete window
    onDelete = (path_delete) =>{
      const{folders} = this.state
      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesDelete({path: path_delete})
      .then(response =>{
        let newFolder = folders.filter( folder => folder.name !== response.name)
        this.setState({folders: newFolder, deleteButtonClicked : false})
      })
    }

    componentDidMount() {
      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({ path: "" })
        .then((res) => {
          this.setState({ folders: res.entries });
        });
    }

    render() {
      const { folders } = this.state;


        return (
          <div className="App" >
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
              <button>Log out</button>
          </header>

          <main>

          <div className="files">
                <table className="table">
                    <thead>
                      <tr>
                        <th>Folder/file name</th>
                      </tr>
                  </thead>

                  <tbody>

                    {folders.map(folder => {
                      return (
                        <tr key={folder.content_hash} className="testing">
                            <Link to={`/folder${folder.path_display}`} className="linktest">
                              <td>{folder.name} </td>
                            </Link>
                            <td className="dropdownList">
                            <DropdownOptions
                             onDelete={this.onDelete}
                             path={folder.path_display}
                             name={folder.name}

                             />

                             </td>

                        </tr>

                      )

                    })}

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
