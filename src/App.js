import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({damage: 17, accuracy: 60, reloadTime: 4.0, fireRate: 13.67, magazineSize: 60});
  //const [form, setForm] = useState({damage: 10, accuracy: 60, reloadTime: 5, fireRate: 5, magazineSize: 10});

  function onChange(e) {
    const v = Number.isFinite(Number.parseFloat(e.target.value)) ? e.target.value : 0;
    
    switch (e.target.name) {
      case "damage": return setForm({...form, damage: Number.parseInt(v)});
      case "accuracy": return setForm({...form, accuracy: Number.parseInt(v)});
      case "reloadTime": return setForm({...form, reloadTime: Number.parseFloat(v)});
      case "fireRate": return setForm({...form, fireRate: Number.parseFloat(v)});
      case "magazineSize": return setForm({...form, magazineSize: Number.parseInt(v)});
      default: return;
    }
  }

  const dps = form.damage * form.fireRate;
  const magTime = form.magazineSize / form.fireRate
  const mag2magDps = (dps * magTime) / (magTime + form.reloadTime);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Borderlands 3 DPS Calc</h2>
      </header>
      <main>
        <div className="cell flex flexColumn">
          <span>Gun A</span>
          <table>
            <tr><td><label htmlFor="damage">Damage</label></td><td><input onChange={onChange} name="damage" type="number" value={form.damage} min="0" autoFocus/></td></tr>
            <tr><td><label htmlFor="accuracy">Accuracy</label></td><td><input onChange={onChange} name="accuracy" type="number" value={form.accuracy} min="0" max="100"/></td></tr>
            <tr><td><label htmlFor="handling">Handling</label></td><td><input onChange={onChange} name="handling" type="number" value="" min="0" max="100"/></td></tr>
            <tr><td><label htmlFor="reloadTime">Reload Time</label></td><td><input onChange={onChange} name="reloadTime" type="number" value={form.reloadTime} min="0" step="0.1"/></td></tr>
            <tr><td><label htmlFor="fireRate">Fire Rate</label></td><td><input onChange={onChange} name="fireRate" type="number" value={form.fireRate} min="0" step="0.01"/></td></tr>
            <tr><td><label htmlFor="magazineSize">Magazine Size</label></td><td><input onChange={onChange} name="magazineSize" type="number" value={form.magazineSize} min="0"/></td></tr>
          </table>
        </div>
        <div>
          <span>Gun B</span>
        </div>
        <div>
          <h2>Stats</h2>
          <table>
            <tr><td>Base DPS:</td><td>{Math.round(dps)}</td></tr>
            <tr><td>Mag empty time:</td><td>{magTime.toFixed(2)}</td></tr>
            <tr><td>Mag-2-Mag time:</td><td>{(magTime + form.reloadTime).toFixed(2)}</td></tr>
            <tr><td>Mag-2-Mag DPS:</td><td>{Math.round(mag2magDps)}</td></tr>
          </table>
        </div>
        <div>
          <h2>Stats</h2>
        </div>
      </main>
    </div>
  );
}

export default App;
