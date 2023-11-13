import React from 'react';
import './PopDisplay.css'
import { SYMBOLS } from './symbols.js'

function PopDisplay({ name, namePlural=`${name}s`, population, setPopulation, maxPop, energy=0, setEnergy, spendResource }) {
  function preventDefault(e) {
    e.preventDefault()
  }

  function dropFace(e) {
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    console.log(`${namePlural} got %o`, data);
    e.preventDefault();

    spendResource(data.resourceIdx);

    switch (data.symbol) {
      case SYMBOLS.hunt: {
        setPopulation(population - 1);
        setEnergy(energy - 1);
        break;
      }
      case SYMBOLS.grow: {
        setPopulation(population + 1);
        break;
      }
      case SYMBOLS.rest: {
        setEnergy(energy + 1);
        break;
      }
    }
  }
  
  return (
      <section
        className="pop-display"
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={dropFace}
      >
          <h2>{namePlural}</h2>
          <div>
            <span className="pop-size">{population}</span><span>/{maxPop}</span> {namePlural}
          </div>  
          <div>
            energy: <span className="energy-display">{displayEnergy(energy)}</span>
          </div>
      </section>
  );
}

function displayEnergy(energy) {
  const e = "⚡"
  if (energy <= 0) {
    return "0"
  } else if (energy <= 4) {
    return e.repeat(energy)
  } else {
    return `${e}x${energy}`
  }
}

export default PopDisplay;