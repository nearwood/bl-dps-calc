import React, { useState } from 'react';
import './App.css';

function App() {
  const [formA, setFormA] = useState({damage: 17, accuracy: 60, reloadTime: 4.0, fireRate: 13.67, magazineSize: 60});
  const [formB, setFormB] = useState({damage: 10, accuracy: 60, reloadTime: 5, fireRate: 5, magazineSize: 10});

  function onChangeA(e) {
    const v = Number.isFinite(Number.parseFloat(e.target.value)) ? e.target.value : 0;
    
    switch (e.target.name) {
      case "damage": return setFormA({...formA, damage: Number.parseInt(v)});
      case "accuracy": return setFormA({...formA, accuracy: Number.parseInt(v)});
      case "reloadTime": return setFormA({...formA, reloadTime: Number.parseFloat(v)});
      case "fireRate": return setFormA({...formA, fireRate: Number.parseFloat(v)});
      case "magazineSize": return setFormA({...formA, magazineSize: Number.parseInt(v)});
      default: return;
    }
  }

  function onChangeB(e) {
    const v = Number.isFinite(Number.parseFloat(e.target.value)) ? e.target.value : 0;
    
    switch (e.target.name) {
      case "damage": return setFormB({...formB, damage: Number.parseInt(v)});
      case "accuracy": return setFormB({...formB, accuracy: Number.parseInt(v)});
      case "reloadTime": return setFormB({...formB, reloadTime: Number.parseFloat(v)});
      case "fireRate": return setFormB({...formB, fireRate: Number.parseFloat(v)});
      case "magazineSize": return setFormB({...formB, magazineSize: Number.parseInt(v)});
      default: return;
    }
  }

  function calc(form) {
    const dps = form.damage * form.fireRate;
    const magTime = form.magazineSize / form.fireRate
    const mag2magDps = (dps * magTime) / (magTime + form.reloadTime);

    return {dps, magTime, mag2magDps};
  }

  const gunA = calc(formA);
  const gunB = calc(formB);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Borderlands 3 DPS Calc</h2>
      </header>
      <main>
        <div className="cell flex flexColumn">
          <span>Gun A</span>
          <table>
            <tr><td><label htmlFor="damage">Damage</label></td><td><input onChange={onChangeA} name="damage" type="number" value={formA.damage} min="0" autoFocus/></td></tr>
            <tr><td><label htmlFor="accuracy">Accuracy</label></td><td><input onChange={onChangeA} name="accuracy" type="number" value={formA.accuracy} min="0" max="100"/></td></tr>
            <tr><td><label htmlFor="handling">Handling</label></td><td><input onChange={onChangeA} name="handling" type="number" value="" min="0" max="100"/></td></tr>
            <tr><td><label htmlFor="reloadTime">Reload Time</label></td><td><input onChange={onChangeA} name="reloadTime" type="number" value={formA.reloadTime} min="0" step="0.1"/></td></tr>
            <tr><td><label htmlFor="fireRate">Fire Rate</label></td><td><input onChange={onChangeA} name="fireRate" type="number" value={formA.fireRate} min="0" step="0.01"/></td></tr>
            <tr><td><label htmlFor="magazineSize">Magazine Size</label></td><td><input onChange={onChangeA} name="magazineSize" type="number" value={formA.magazineSize} min="0"/></td></tr>
          </table>
        </div>
        <div>
          <span>Gun B</span>
          <table>
            <tr><td><label htmlFor="damage">Damage</label></td><td><input onChange={onChangeB} name="damage" type="number" value={formB.damage} min="0" autoFocus/></td></tr>
            <tr><td><label htmlFor="accuracy">Accuracy</label></td><td><input onChange={onChangeB} name="accuracy" type="number" value={formB.accuracy} min="0" max="100"/></td></tr>
            <tr><td><label htmlFor="handling">Handling</label></td><td><input onChange={onChangeB} name="handling" type="number" value="" min="0" max="100"/></td></tr>
            <tr><td><label htmlFor="reloadTime">Reload Time</label></td><td><input onChange={onChangeB} name="reloadTime" type="number" value={formB.reloadTime} min="0" step="0.1"/></td></tr>
            <tr><td><label htmlFor="fireRate">Fire Rate</label></td><td><input onChange={onChangeB} name="fireRate" type="number" value={formB.fireRate} min="0" step="0.01"/></td></tr>
            <tr><td><label htmlFor="magazineSize">Magazine Size</label></td><td><input onChange={onChangeB} name="magazineSize" type="number" value={formB.magazineSize} min="0"/></td></tr>
          </table>
        </div>
        <div>
          <h2>Stats</h2>
          <table>
            <tr><td>Base DPS:</td><td>{Math.round(gunA.dps)}</td></tr>
            <tr><td>Mag empty time:</td><td>{gunA.magTime.toFixed(2)}</td></tr>
            <tr><td>Mag-2-Mag time:</td><td>{(gunA.magTime + formA.reloadTime).toFixed(2)}</td></tr>
            <tr><td>Mag-2-Mag DPS:</td><td>{Math.round(gunA.mag2magDps)}</td></tr>
          </table>
        </div>
        <div>
          <h2>Stats</h2>
          <table>
            <tr><td>Base DPS:</td><td>{Math.round(gunB.dps)}</td></tr>
            <tr><td>Mag empty time:</td><td>{gunB.magTime.toFixed(2)}</td></tr>
            <tr><td>Mag-2-Mag time:</td><td>{(gunB.magTime + formB.reloadTime).toFixed(2)}</td></tr>
            <tr><td>Mag-2-Mag DPS:</td><td>{Math.round(gunB.mag2magDps)}</td></tr>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
