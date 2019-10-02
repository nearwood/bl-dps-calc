import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({damage: 17, accuracy: 60, reloadTime: 4.0, fireRate: 13.67, magazineSize: 60});
  //const [form, setForm] = useState({damage: 10, accuracy: 60, reloadTime: 5, fireRate: 5, magazineSize: 10});

  function onChange(e, d) {
    const v = e.target.value;
    //console.log(e.target.name, e.target.value);
    switch (e.target.name) {
      case "damage": return setForm({...form, damage: v});
      case "accuracy": return setForm({...form, accuracy: v});
      case "reloadTime": return setForm({...form, reloadTime: v});
      case "fireRate": return setForm({...form, fireRate: v});
      case "magazineSize": return setForm({...form, magazineSize: v});
      default: return;
    }
  }

  const dps = form.damage * form.fireRate;
  const magTime = form.magazineSize / form.fireRate;
  const mag2magDps = (dps * magTime) / (magTime + form.reloadTime);

  return (
    <div className="App">
      <header className="App-header">
        <p>Borderlands 3 DPS Calc</p>
      </header>
      <main>
        <div className="formCol">
          <label htmlFor="damage">Damage</label>
          <label htmlFor="accuracy">Accuracy</label>
          <label htmlFor="handling">Handling</label>
          <label htmlFor="reloadTime">Reload Time</label>
          <label htmlFor="fireRate">Fire Rate</label>
          <label htmlFor="magazineSize">Magazine Size</label>
        </div>
        <div className="formCol">
          <input onChange={onChange} name="damage" type="number" value={form.damage} min="0" autoFocus/>
          <input onChange={onChange} name="accuracy" type="number" value={form.accuracy} min="0" max="100"/>
          <input onChange={onChange} name="handling" type="number" value="" min="0" max="100"/>
          <input onChange={onChange} name="reloadTime" type="number" value={form.reloadTime} min="0" step="0.1"/>
          <input onChange={onChange} name="fireRate" type="number" value={form.fireRate} min="0" step="0.01"/>
          <input onChange={onChange} name="magazineSize" type="number" value={form.magazineSize} min="0"/>
        </div>
        <div>
          <h2>Stats</h2>
          <p>Base DPS: {dps}</p>
          <p>Mag empty time: {magTime}</p>
          <p>Mag-2-Mag time: {magTime + form.reloadTime}</p>
          <p>Mag-2-Mag DPS: {mag2magDps}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
