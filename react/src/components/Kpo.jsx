import { useEffect, useState} from "react";

const opciok = ['Kő', 'Papír', 'Olló'];

export default function Kpo() {
  const [felhasznaloValasztasa, setFelhasznaloValasztasa] = useState(null);
  const [gepValasztasa, setGepValasztasa] = useState(null);
  const [eredmeny, setEredmeny] = useState('');
  const [pontszam, setPontszam] = useState({ jatekos: 0, gep: 0 });

  const jatekLogika = (valasztas) => {
    const gep = opciok[Math.floor(Math.random() * opciok.length)];
    setFelhasznaloValasztasa(valasztas);
    setGepValasztasa(gep);

    if (valasztas === gep) {
      setEredmeny('Döntetlen!');
    } else if (
      (valasztas === 'Kő' && gep === 'Olló') ||
      (valasztas === 'Papír' && gep === 'Kő') ||
      (valasztas === 'Olló' && gep === 'Papír')
    ) {
      setEredmeny('Nyertél!');
      setPontszam((prev) => ({ ...prev, jatekos: prev.jatekos + 1 }));
    } else {
      setEredmeny('A gép nyert!');
      setPontszam((prev) => ({ ...prev, gep: prev.gep + 1 }));
    }
  };

  return (
    <main className={'container'}>
      <h2>✊✋✌️ Kő-Papír-Olló</h2>
      <div className='buttons'>
        {opciok.map((opcio) => (
          <button key={opcio} onClick={() => jatekLogika(opcio)} >
            {opcio}
          </button>
        ))}
      </div>
      
      {felhasznaloValasztasa && (
        <>
          <div className='choice'>
            <div>
              <span>{
                (felhasznaloValasztasa == 'Kő') ? '✊' :
                ((felhasznaloValasztasa == 'Papír') ? '✋' :
                '✌️')
                }</span>
              <p>Játékos</p>
            </div>
            <div>
              <span>{
                (gepValasztasa == 'Kő') ? '✊' :
                ((gepValasztasa == 'Papír') ? '✋' :
                '✌️')
                }</span>
              <p>Gép</p>
            </div>
          </div>
          <h3 className='result'>{eredmeny}</h3>
        </>
      )}
      
      <hr/>
      <h3 className='points'>Állás</h3>
      <p className='points'>
        👨 {pontszam.jatekos} - {pontszam.gep} 🖥
      </p>
    </main>
  );
  
};
