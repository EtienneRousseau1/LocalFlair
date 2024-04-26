import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const  [webApp, setWebApp] = useState("Name")
  return (
    <div className="App">
      {webApp}
    </div>
  );
}

export default App;
