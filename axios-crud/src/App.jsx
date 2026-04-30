import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './style.css'

function App() {
  const[pizzak,setPizzak] = useState([]);
  const[nev,setNev] = useState("");
  const[kategorianev, setKategorianev] = useState("");
  const[vegetarianus,setVegetarianus] = useState("");

  async function getPizza(){
      const response = await axios.get('/api.php');
      setPizzak(response.data);
  }
  useEffect(() => {getPizza()},[]);

  async function deletePizza(nev) {
      const response = await axios.delete(`/api.php?nev=${nev}`);
      await getPizza();
  }

  async function addPizza() {
    const response = await axios.post('/api.php', {
      nev,kategorianev,vegetarianus
    });
    await getPizza();
  }

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
              <input type="text" id="nev" value={nev} onChange={(e)=>setNev(e.target.value)} placeholder="Pizza neve"/>
              <select id="kategorianev" name="kategorianev" value={kategorianev} onChange={(e)=>setKategorianev(e.target.value)} required>
                  <option value=""disabled selected>Válassz</option>
                  <option value="király">Király</option>
                  <option value="apród">Apród</option>
                  <option value="főnemes">Főnemes</option>
                  <option value="lovag">Lovag</option>
                </select>
              <select id="vegetarianus" name="vegetarianus" value={vegetarianus} onChange={(e)=> setVegetarianus(e.target.value)} required>
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
                        <button onClick={()=>deletePizza(pizza.nev)}>Törlés</button>
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
