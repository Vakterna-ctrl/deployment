import React from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./Css/nav.css";

import Main from "./Components/Main";
import LogIn from "./Components/LogIn";
import GetToken from "./Components/GetToken";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route path="/main" component={Main} /> */}
        <Route path="/login" component={LogIn} />
        <Route path="/auth" component={GetToken} />
      </Router>
    </div>
  );
}

export default App;
