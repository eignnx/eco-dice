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

    const { symbol, resourceIdx, dieIdx } = data;

    function spend() {
      console.log(`spending resource ${dieIdx} ${resourceIdx}:${symbol}`)
      spendResource(dieIdx, resourceIdx);
    }

    switch (symbol) {
      case SYMBOLS.hunt: {
        if (energy <= 0 || population <= 0) { return }
        setEnergy(energy - 1);
        setPopulation(population - 1);
        spend();
        break;
      }
      case SYMBOLS.grow: {
        if (energy <= 0) { return }
        setEnergy(energy - 1);
        setPopulation(population + 1);
        spend();
        break;
      }
      case SYMBOLS.rest: {
        setEnergy(energy + 1);
        spend();
        break;
      }
      case SYMBOLS.hide: {
        if (energy <= 0) { return }
        setEnergy(energy - 1);
        spend();
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
    return `0×${e}`
  } else if (energy <= 4) {
    return e.repeat(energy)
  } else {
    return `${energy}×${e}`
  }
}

export default PopDisplay;