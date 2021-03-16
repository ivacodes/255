import "./App.css";
import { Picker } from "./components/Picker";
import React, { useState } from "react";
import { Timer } from "./components/Timer";

function App() {
  let [breakTime, setBreakTime] = useState(5);
  let [workTime, setWorkTime] = useState(25);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>The timer.</h1>
      </header>
      <div className='pickers'>
        <Picker title='Break' defValue={5} getRes={setBreakTime} />
        <Picker title='Work' defValue={25} getRes={setWorkTime} />
      </div>

      <Timer workTime={workTime} />
    </div>
  );
}

export default App;
