import React, { Component } from 'react'
import Logo from '../LogoDropbox.png'
import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'

 class LeftNav extends Component {
    render() {
        return (
                <div className="sideLeft">
                 <img src={Logo} />
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
        )
    }
}

export default LeftNav
