import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './style.css'

function App() {
  const[pizzak,setPizzak] = useState([]);
  async function getPizza(){
      const response = await axios.get('/api.php');
      setPizzak(response.data);
  }
  useEffect(() => {getPizza()},[]);

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
          <h2>Axios Adatkezelés</h2>
          <div className="crud-form">
              <input type="text" id="nev" placeholder="Pizza neve"/>
              <select id="kategorianev" name="kategorianev" required>
                  <option value=""disabled selected>Válassz</option>
                  <option value="király">Király</option>
                  <option value="apród">Apród</option>
                  <option value="főnemes">Főnemes</option>
                  <option value="lovag">Lovag</option>
                </select>
              <select id="vegetarianus" name="vegetarianus" required>
                  <option value=""disabled selected>Válassz</option>
                  <option value="1">Igen</option>
                  <option value="0">Nem</option>
              </select>
              <div id="buttons">
                  <button onclick="addPizza()">Hozzáadás</button>
              </div>
          </div>
          <table id="fetch-table">
              <thead><tr><th>Pizza</th><th>Kategória</th><th>Vegán</th><th>Műveletek</th></tr></thead>
              <tbody id="fetch-body">
                {
                  pizzak.map((pizza, i) => (
                    <tr key={i}>
                      <td>{pizza.nev}</td>
                      <td>{pizza.kategorianev}</td>
                      <td>{pizza.vegetarianus==0 ? 'Nem' : 'Igen'}</td>
                      <td>
                        <button>Módosítás</button>
                        <button>Törlés</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
          </table>
      </main>
    </>
  )
}

export default App
