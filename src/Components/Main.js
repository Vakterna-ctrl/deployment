import React, { Component } from 'react'
import { Dropbox } from "dropbox";

import { Link } from 'react-router-dom'


import '../Css/nav.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: []
        }
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
            <button>Log out</button>
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
                    {folders.map(folder => {
                      return (
                        <tr>
                          <div>
                            <Link to={`/folder${folder.path_display}`}>
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
