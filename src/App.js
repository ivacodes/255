import "./App.css";
import "@fontsource/oswald/200.css";
import { Picker } from "./components/Picker";
import React, { useState, useEffect } from "react";
import { Timer } from "./components/Timer";

function App() {
  const [isReady, setIsReady] = useState(false);

  let [breakTime, setBreakTime] = useState(5);
  let [workTime, setWorkTime] = useState(25);

  useEffect(() => {
    document.fonts.load("12px Oswald").then(() => setIsReady(true));
  }, []);

  return (
    isReady && (
      <div className='App'>
        <header className='App-header'>
          <h1>The timer.</h1>
        </header>
        <div className='pickers'>
          <Picker title='Break' defValue={5} getRes={setBreakTime} />
          <Picker title='Work' defValue={25} getRes={setWorkTime} />
        </div>

        <Timer workTime={workTime} breakTime={breakTime} />
      </div>
    )
  );
}

export default App;
