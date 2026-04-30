import { useState } from 'react'
import Stopper from './components/Stopper';
import Kpo from './components/Kpo';
import './style.css'
import './App.css'

function App() {
  const [aktivApp, setAktivApp] = useState('stopper'); 

  return (
    <>
    <header>
        <h1>Web programozás-1 Előadás Házi feladat</h1>
    </header>
    <nav>
        <ul>
            <li><a href="index.html">Főoldal</a></li>
            <li><a href="javascript.html">JavaScript CRUD</a></li>
            <li><a href="react.html">React CRUD</a></li>
            <li><a href="spa.html">SPA (Single Page App)</a></li>
            <li><a href="fetchapi.html">Fetch API CRUD</a></li>
            <li><a href="axios.html">Axios CRUD</a></li>
            <li><a href="oojs.html">OOJS Grafikus Alkalmazás</a></li>
        </ul>
    </nav>
    <main>
      <h1>React Mini Alkalmazások</h1>
      <div className='buttons'>
        <button onClick={() => setAktivApp('stopper')} className={aktivApp == 'stopper' ? 'active' : ''}>
           Stopperóra
        </button>
        <button onClick={() => setAktivApp('kopapirollo')} className={aktivApp == 'kopapirollo' ? 'active' : ''}>
           Kő-Papír-Olló
        </button>
      </div>
      <div>
        {aktivApp === 'stopper' ? <Stopper /> : <Kpo />}
      </div>
    </main>
    </>
  );

  
}

export default App
