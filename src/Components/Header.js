import React, { Component, PureComponent } from 'react'
import LogOut from './LogOut'
import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'

class Header extends PureComponent{

  render(){
    return(
      <header>
        <h1>Project X</h1>

          <input
            className="searchField"
            type="text"
            onChange={this.props.search_FOLDERS_FILES}
            placeholder="Search"
          />
          <LogOut/>
      </header>


)}}



export default Header
