import React from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./Css/nav.css";

import Main from "./Components/Main";

function App() {
  return (
    <div clasclassName="App">
      <Router>
        <Route path="/main" component={Main} />
      </Router>
    </div>
  );
}

export default App;
