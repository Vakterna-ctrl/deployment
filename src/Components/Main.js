import React, { Component } from 'react'

import { Link } from 'react-router-dom'


import '../Css/nav.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // active: false
        }
    }

    render() {
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
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td onClick={this.clickMe}>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td >Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    <td>
                    <Link to ="/edit-folder">
                        <p>hej</p>
                    </Link>
                    </td>
                    </tr>
                     
                    
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
