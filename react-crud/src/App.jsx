import { useState, useEffect }from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './style.css'
import Gomb from './gomb'

function App() {
            const [pizzak, setPizzak] = useState([]);
            const [ujNev, setUjNev] = useState('');
             const [kategoria, setKategoria] = useState('');
              const [vegan, setVegan] = useState('');

            useEffect(() => {
                
                fetch('pizza.txt')
                    .then(res => res.text())
                    .then(data => {
                        const lines = data.split('\n').slice(1);
                        const lista = lines.map(l => ({ 
                            name: l.split('\t')[0], 
                            category:l.split('\t')[1],
                            vegan: l.split('\t')[2]   
                        })).filter(p => p.name);
                        setPizzak(lista);
                    });
            }, []);

            const addPizza = () => {
                if(!ujNev || !kategoria || !vegan) {
                    alert("Összes mezőt ki kell tölteni!");
                    return;
                }
                setPizzak([...pizzak, { name: ujNev, category: kategoria, vegan }]);
                setUjNev('');
                setKategoria('');
                setVegan('');
            };

            const deletePizza = (index) => {
                setPizzak(pizzak.filter((_, i) => i !== index));
            };

            return (
                <div>
                    <header><h1>Web programozás-1 Előadás Házi feladat</h1></header>
                       <nav>
                            <ul>
                                <li><a href="index.html">Főoldal</a></li>
                                <li><a href="javascript.html">JavaScript CRUD</a></li>
                                <li><a href="react.html">React CRUD</a></li>
                                <li><a href="spa.html">SPA</a></li>
                                <li><a href="fetchapi.html">Fetch API</a></li>
                                <li><a href="axios.html">Axios</a></li>
                                <li><a href="oojs.html">OOJS</a></li>
                            </ul>
                        </nav>
                    <h2>React CRUD - Pizza lista</h2>
                    <input value={ujNev} onChange={(e) => setUjNev(e.target.value)} placeholder="Új pizza..." required/>
                    <select value={kategoria} onChange={(e) => setKategoria(e.target.value)}required>
                        <option value=""disabled>Válassz</option>
                        <option value="király">Király</option>
                        <option value="apród">Apród</option>
                        <option value="főnemes">Főnemes</option>
                        <option value="lovag">Lovag</option>
                    </select>
                    <select value={vegan} onChange={(e) => setVegan(e.target.value)}required>
                        <option value=""disabled>Válassz</option>
                        <option value="1">Igen</option>
                        <option value="0">Nem</option>
                    </select>
                    <button onClick={addPizza}>Hozzáadás</button>
                    <table> 
                        <tr>
                            <th>Név</th><th>Kategória</th><th>Vegán</th><th>Műveletek</th>
                        </tr>
                        {
                            pizzak.map((pizza, i)=>(
                                <tr key={i}>
                                    <td>{pizza.name}</td><td>{pizza.category}</td><td>{pizza.vegan==0?"Nem":"Igen"}</td><td><button onClick={()=>deletePizza(i)}>Törlés</button></td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            );
        }

export default App
