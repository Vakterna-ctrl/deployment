import React from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./Css/nav.css";

import Main from "./Components/Main";
import LogIn from "./Components/LogIn";
import GetToken from "./Components/GetToken";
import DropBoxFolder from "./Components/DropBoxFolder";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={LogIn} />
        <Route path="/auth" component={GetToken} />
        <Route path="/main" component={Main} />
        <Route path="/edit-folder" component={DropBoxFolder} />
      </Router>
    </div>
  );
}

export default App;
