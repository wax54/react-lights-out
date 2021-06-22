import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Board nrows={2} ncols ={2} chanceLightStartsOn={.2}/>
    </div>
  );
}

export default App;
