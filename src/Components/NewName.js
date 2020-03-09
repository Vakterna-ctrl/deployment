import React, { Component, PureComponent } from 'react'
import '../Css/Options.css'
import ClickedOutsideRemover from './ClickedOutsideRemover'
import DeleteWindow from './DeleteWindow'
import ReactDom from 'react-dom'

function NewName({update, closeRename,hideRename}){
 

  return ReactDom.createPortal(
    <div className="renameWindow">
    <p>Do you want to rename this?</p>
    <input className="tdInput" type="text" onChange={update}/>
    <br/>
    <div className="renameButtons">
    <button className="tdButton" onClick={closeRename}>Rename</button>
    <button className="tdButton" onClick={hideRename}>avbryt</button>
    </div>
    </div>

    , 
    document.querySelector('#renameWindow')

)}



export default NewName
