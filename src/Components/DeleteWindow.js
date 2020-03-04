import React, { Component, PureComponent } from 'react'
import '../Css/Options.css'
import ReactDom from 'react-dom'


function DeleteWindow({name,onCloseDeleteWindow,path,onDelete,closeOnDelete}){

  function deleteOnClick(path_folder){
    onDelete(path_folder)
    closeOnDelete()
  }



  return ReactDom.createPortal(
  <div className="darkenOutArea">
  <div className="confirmDeleteWindow">
  <p className="deleteText">Ta bort fil?</p>
  <p className="deleteText">Vill du radera {name}?</p>
  <div className="deleteButton">
  <div className="delete" onClick={()=>deleteOnClick(path)}>Radera</div>
  <div className="delete" onClick={onCloseDeleteWindow}>avbryt</div>
  </div>
  </div>
  </div>,
  document.querySelector('#deletewindow')

  )

}


export default React.memo(DeleteWindow)
