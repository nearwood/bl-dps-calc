import React, { useState } from 'react';
import './App.css';

function App() {
  const [formA, setFormA] = useState({damage: 17, accuracy: 60, reloadTime: 4.0, fireRate: 13.67, magazineSize: 60});
  const [formB, setFormB] = useState({damage: 10, accuracy: 60, reloadTime: 5, fireRate: 5, magazineSize: 10});

  function onChange(form, setForm, e) {
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

  function calc(form) {
    const dps = form.damage * form.fireRate;
    const magTime = form.magazineSize / form.fireRate
    const mag2magDps = (dps * magTime) / (magTime + form.reloadTime);

    return {dps, magTime, mag2magDps};
  }

  const gunA = calc(formA);
  const gunB = calc(formB);

  const handlerA = (e) => onChange(formA, setFormA, e);
  const handlerB = (e) => onChange(formB, setFormB, e);

  function renderForm(form, handler) {
    return (
      <table>
        <tbody>
        <tr><td><label htmlFor="damage">Damage</label></td><td><input onChange={handler} name="damage" type="number" value={form.damage} min="0" autoFocus/></td></tr>
        <tr><td><label htmlFor="accuracy">Accuracy</label></td><td><input onChange={handler} name="accuracy" type="number" value={form.accuracy} min="0" max="100"/></td></tr>
        {/*<tr><td><label htmlFor="handling">Handling</label></td><td><input onChange={handler} name="handling" type="number" value="" min="0" max="100"/></td></tr>*/}
        <tr><td><label htmlFor="reloadTime">Reload Time</label></td><td><input onChange={handler} name="reloadTime" type="number" value={form.reloadTime} min="0" step="0.1"/></td></tr>
        <tr><td><label htmlFor="fireRate">Fire Rate</label></td><td><input onChange={handler} name="fireRate" type="number" value={form.fireRate} min="0" step="0.01"/></td></tr>
        <tr><td><label htmlFor="magazineSize">Magazine Size</label></td><td><input onChange={handler} name="magazineSize" type="number" value={form.magazineSize} min="0"/></td></tr>
        </tbody>
      </table>
    );
  }

  function renderStats(form, gun) {
    return (
      <table>
        <tbody>
        <tr><td>Base DPS:</td><td>{Math.round(gun.dps)}</td></tr>
        <tr><td>Mag empty time:</td><td>{gun.magTime.toFixed(2)}</td></tr>
        <tr><td>Mag-2-Mag time:</td><td>{(gun.magTime + form.reloadTime).toFixed(2)}</td></tr>
        <tr><td>Mag-2-Mag DPS:</td><td>{Math.round(gun.mag2magDps)}</td></tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Borderlands 3 DPS Calc</h2>
      </header>
      <main>
        <div className="cell flex flexColumn">
          <span>Gun A</span>
          {renderForm(formA, handlerA)}
        </div>
        <div>
          <span>Gun B</span>
          {renderForm(formB, handlerB)}
        </div>
        <div>
          <h2>Stats</h2>
          {renderStats(formA, gunA)}
        </div>
        <div>
          <h2>Stats</h2>
          {renderStats(formB, gunB)}
        </div>
      </main>
    </div>
  );
}

export default App;
