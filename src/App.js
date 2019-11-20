import React, { useState } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

const VERSION = process.env.REACT_APP_GIT_COMMIT_HASH || 'dev';

const rxNumberSeparator = /[0-9]+[.,][0-9]+/;

function App() {
  const [formA, setFormA] = useState({damage: "17", damageMultiplier: "1", bulletsPerShot: "1", accuracy: "60", reloadTime: "4.0", fireRate: "13.67", magazineSize: "60"});
  const [formB, setFormB] = useState({damage: "20", damageMultiplier: "1", bulletsPerShot: "1", accuracy: "80", reloadTime: "3.2", fireRate: "12.71", magazineSize: "44"});

  function onChange(form, setForm, e) {
    const v = e.target.value;
    
    switch (e.target.name) {
      case "damage": return setForm({...form, damage: v});
      case "accuracy": return setForm({...form, accuracy: v});
      case "reloadTime": return setForm({...form, reloadTime: v});
      case "fireRate": return setForm({...form, fireRate: v});
      case "magazineSize": return setForm({...form, magazineSize: v});
      case "damageMultiplier": return setForm({...form, damageMultiplier: v, bulletsPerShot: v});
      case "bulletsPerShot": return setForm({...form, bulletsPerShot: v});
      default: return;
    }
  }

  // Loop through an object and convert all user-defined props to float or integer.
  // Note: Disregards `,` as the decimal separator for other locales.
  const parseAllNumbers = (form) => {
    let data = {};
  
    Object.keys(form).forEach(key => 
      data[key] = form[key].match(rxNumberSeparator) ? Number.parseFloat(form[key]) : Number.parseInt(form[key], 10)
    );
    return data;
  };

  function calc(form) {
    const data = parseAllNumbers(form);

    const effectiveMagSize = Math.floor(data.magazineSize / data.bulletsPerShot);

    const dps = data.damage * data.damageMultiplier * data.fireRate;
    const magTime = effectiveMagSize / data.fireRate
    const mag2magDps = (dps * magTime) / (magTime + data.reloadTime);

    return {...data, dps, magTime, mag2magDps};
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
      <form>
        <table>
          <tbody>
            <tr><td><label htmlFor="damage">Damage</label></td>
              <td><input onFocus={selectAll} onChange={handler} name="damage" type="number" className="shrink" value={form.damage.toString()} min="0"/>
              <select onChange={handler} name="damageMultiplier" id="damageMultiplier" title="Damage Multiplier" value={form.damageMultiplier}>
                <option value="1">x1</option>
                <option value="2">x2</option>
                <option value="3">x3</option>
                <option value="4">x4</option>
              </select>
              <label for="damageMultiplier"></label>
            </td></tr>
            {/*<tr><td><label htmlFor="accuracy">Accuracy</label></td><td><input disabled onChange={handler} name="accuracy" type="number" value={form.accuracy.toString()} min="0" max="100"/></td></tr>*/}
            {/*<tr><td><label htmlFor="handling">Handling</label></td><td><input onChange={handler} name="handling" type="number" value="" min="0" max="100"/></td></tr>*/}
            <tr><td><label htmlFor="reloadTime">Reload Time</label></td><td><input onFocus={selectAll} onChange={handler} name="reloadTime" type="number" value={form.reloadTime.toString()} min="0" step="0.1"/></td></tr>
            <tr><td><label htmlFor="fireRate">Fire Rate</label></td><td><input onFocus={selectAll} onChange={handler} name="fireRate" type="number" value={form.fireRate.toString()} min="0" step="0.01"/></td></tr>
            <tr><td><label htmlFor="magazineSize">Magazine Size</label></td>
              <td><input onFocus={selectAll} onChange={handler} name="magazineSize" type="number" className="shrink" value={form.magazineSize.toString()} min="0"/>
              <select onChange={handler} name="bulletsPerShot" id="bulletsPerShot" title="Bullets per shot" value={form.bulletsPerShot}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <label for="bulletsPerShot">Bullets per shot</label>
              </td></tr>
          </tbody>
        </table>
      </form>
    );
  }

  function renderStats(gun, gunA) {
    const dps = Math.round(gun.dps).toString();
    const m2mDps = Math.round(gun.mag2magDps).toString();

    return (
      <table>
        <tbody>
          <tr className="statHeader"><td>Effective DPS:</td><td>{m2mDps}</td>{gunA && percentDelta(gunA.mag2magDps, gun.mag2magDps)}</tr>
          <tr><td>Base DPS:</td><td>{dps}</td>{gunA && percentDelta(gunA.dps, gun.dps)}</tr>
          {gunA && <tr><td>Fire Rate:</td><td>{(gun.fireRate - gunA.fireRate).toFixed(2)}</td>{percentDelta(gunA.fireRate, gun.fireRate)}</tr>}
          {gunA && <tr><td>Reload time:</td><td>{(gun.reloadTime - gunA.reloadTime).toFixed(2)}</td>{percentDelta(gunA.reloadTime, gun.reloadTime, true)}</tr>}
          {gunA && <tr><td>Magazine Size:</td><td>{(gun.magazineSize - gunA.magazineSize).toFixed(0)}</td>{percentDelta(gunA.magazineSize, gun.magazineSize)}</tr>}
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
        <Tabs>
          <TabList>
            <Tab>Gun A</Tab>
            <Tab>Gun B</Tab>
          </TabList>
          <TabPanel>
            <div className="flex flexColumn">
              <span>Gun A</span>
              {renderForm(formA, handlerA)}
            </div>
            <hr/>
            <div className="flex flexColumn">
              {renderStats(gunA)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flexColumn">
              <span>Gun B</span>
              {renderForm(formB, handlerB)}
            </div>
            <hr/>
            <div className="flex flexColumn">
              {renderStats(gunB, gunA)}
            </div>
          </TabPanel>
        </Tabs>
      </main>
      <footer>
        <h6><a rel="author" href="https://twitter.com/nearwood">@nearwood</a> <a href="https://github.com/nearwood/bl-dps-calc">GitHub</a> <span title="version">{VERSION.substring(0, 7)}</span></h6>
      </footer>
    </div>
  );
}

export default App;
