import React from "react";
import RouterPost from "./routes";
import {BrowserRouter} from "react-router-dom"
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <RouterPost/>
    </BrowserRouter>
  );
}

export default App;
