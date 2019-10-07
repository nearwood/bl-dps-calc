import React, { useState } from 'react';
import './App.css';

const VERSION = process.env.REACT_APP_GIT_COMMIT_HASH || 'dev';

function App() {
  const [formA, setFormA] = useState({damage: 17, accuracy: 60, reloadTime: 4.0, fireRate: 13.67, magazineSize: 60});
  const [formB, setFormB] = useState({damage: 20, accuracy: 80, reloadTime: 3.2, fireRate: 12.71, magazineSize: 44});

  function onChange(form, setForm, e) {
    const v = e.target.value;
    
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
  const selectAll = (e) => e.target.select();

  const getSign = (a, b) => a < b ? '+' : '';
  const percentDelta = (a, b, invert) => <td style={a > b ? (invert ? {color: '#00C800'} : {color: 'red'}) : {}}>{getSign(a, b)}{Math.round((b - a) / a * 100).toString()}%</td>;

  function renderForm(form, handler) {
    return (
      <table>
        <tbody>
        <tr><td><label htmlFor="damage">Damage</label></td><td><input onFocus={selectAll} onChange={handler} name="damage" type="number" value={form.damage.toString()} min="0"/></td></tr>
        {/*<tr><td><label htmlFor="accuracy">Accuracy</label></td><td><input disabled onChange={handler} name="accuracy" type="number" value={form.accuracy.toString()} min="0" max="100"/></td></tr>*/}
        {/*<tr><td><label htmlFor="handling">Handling</label></td><td><input onChange={handler} name="handling" type="number" value="" min="0" max="100"/></td></tr>*/}
        <tr><td><label htmlFor="reloadTime">Reload Time</label></td><td><input onFocus={selectAll} onChange={handler} name="reloadTime" type="number" value={form.reloadTime.toString()} min="0" step="0.1"/></td></tr>
        <tr><td><label htmlFor="fireRate">Fire Rate</label></td><td><input onFocus={selectAll} onChange={handler} name="fireRate" type="number" value={form.fireRate.toString()} min="0" step="0.01"/></td></tr>
        <tr><td><label htmlFor="magazineSize">Magazine Size</label></td><td><input onFocus={selectAll} onChange={handler} name="magazineSize" type="number" value={form.magazineSize.toString()} min="0"/></td></tr>
        </tbody>
      </table>
    );
  }

  function renderStats(form, gun, formA, gunA) {
    const dps = Math.round(gun.dps).toString();
    const m2mDps = Math.round(gun.mag2magDps).toString();

    return (
      <table>
        <tbody>
        <tr><td>Mag-2-Mag DPS:</td><td>{m2mDps}</td>{gunA && percentDelta(gunA.mag2magDps, gun.mag2magDps)}</tr>
        <tr><td>Base DPS:</td><td>{dps}</td>{gunA && percentDelta(gunA.dps, gun.dps)}</tr>
        {gunA && <tr><td>Fire Rate:</td><td>{(form.fireRate - formA.fireRate).toFixed(2)}</td>{percentDelta(formA.fireRate, form.fireRate)}</tr>}
        {gunA && <tr><td>Reload time:</td><td>{(form.reloadTime - formA.reloadTime).toFixed(2)}</td>{percentDelta(formA.reloadTime, form.reloadTime, true)}</tr>}
        {gunA && <tr><td>Magazine Size:</td><td>{(form.magazineSize - formA.magazineSize).toFixed(2)}</td>{percentDelta(formA.magazineSize, form.magazineSize)}</tr>}
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Borderlands DPS Calc</h2>
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
          {renderStats(formB, gunB, formA, gunA)}
        </div>
      </main>
      <footer>
        <h6><a rel="author" href="https://twitter.com/nearwood">@nearwood</a> <a href="https://github.com/nearwood/bl-dps-calc">GitHub</a> <span title="version">{VERSION.substring(0, 7)}</span></h6>
      </footer>
    </div>
  );
}

export default App;
