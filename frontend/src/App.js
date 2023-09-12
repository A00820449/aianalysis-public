import logo from './logo.svg';
import './App.css';
import { TestComponent } from './Components/TestComponent/TestComponent.js'
import {useState, useEffect} from 'react';

function App() {
  const [state, setState] = useState({})

  useEffect(() => {
      fetch("/api").then(response => {
          if (response.status == 200) {
              return response.json()
          }
      }).then(data => setState(data)).then(
          error => console.log(error)
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        < TestComponent prop={state} />
        </a>
      </header>
    </div>
  );
}

export default App;
