import { useEffect } from "react";
import { useState } from "react";

export default function Stopper() {
  const [ido, setIdo] = useState(0);
  const [fut, setFut] = useState(false);

  useEffect(() => {
    let interval;
    if (fut) {
      interval = setInterval(() => {
        setIdo((elozo) => elozo + 10);
      }, 10);
    } else if (!fut) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [fut]);

  
  const formazottIdo = () => {
    const percek = ("0" + Math.floor((ido / 60000) % 60)).slice(-2);
    const masodpercek = ("0" + Math.floor((ido / 1000) % 60)).slice(-2);
    const szazadok = ("0" + ((ido / 10) % 100)).slice(-2);
    return `${percek}:${masodpercek}:${szazadok}`;
  };

  return (
    <main className={'container'}>
      <h2>⏱️ Stopperóra</h2>
      <div className='time'>
        {formazottIdo()}
      </div>
      <div className='buttons'>
        {fut ? (
          <button onClick={() => setFut(false)}>Leállítás</button>
        ) : (
          <button onClick={() => setFut(true)}>Indítás</button>
        )}
        <button onClick={() => { setFut(false); setIdo(0); }}>Visszaállítás</button>
      </div>
    </main>
  );
}
