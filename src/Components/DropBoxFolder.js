import React, { Component } from 'react'

import { Dropbox } from "dropbox";

import { Link } from 'react-router-dom';

import '../Css/nav.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            folders: []
        }
    }

    componentDidMount() {
      let path = this.props.id;

      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({ path: `/${path}` })
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
            <Link to="/main">
                <p>Return to Main page</p>
            </Link>
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
                              <td>{folder.name}</td>
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
