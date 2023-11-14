import React from 'react';
import './App.css'
import PopDisplay from './PopDisplay.jsx'
import DicePane from './dice-pane/DicePane.jsx'


const INIT_POPULATIONS = [
  { name: "Fox", namePlural: "Foxes", population: 2, maxPop: 5, energy: 4 },
  { name: "Rabbit", population: 6, maxPop: 9, energy: 5 },
  { name: "Grass", namePlural: "Grass", population: 8, maxPop: 12, energy: 2 },
]


export default function App() {
  const [populations, setPopulations] = React.useState(INIT_POPULATIONS);
  const [spendableResources, setSpendableResources] = React.useState([]);

  function setPopulation(newPop, idx) {
    const newPopulations = [...populations];
    newPopulations[idx].population = newPop;
    setPopulations(newPopulations);
  }

  function setEnergy(newEnergy, idx) {
    const newPopulations = [...populations];
    newPopulations[idx].energy = newEnergy;
    setPopulations(newPopulations);
  }

  function spendResource(dieIdx, resourceIdx) {
    const newSpendableResources = spendableResources.map(die => [...die])
    newSpendableResources[dieIdx][resourceIdx] = "spent";
    console.log("newSpendableResources: ", JSON.stringify(newSpendableResources))
    setSpendableResources(newSpendableResources);
  }
  
  return (
    <main>
      <section id="pop-display-container">
        <div id="pop-display-grid">
          {populations.map((p, idx) => (
            <PopDisplay
              key={idx}
              name={p.name}
              namePlural={p.namePlural}
              population={p.population}
              setPopulation={newPop => setPopulation(newPop, idx)}
              maxPop={p.maxPop}
              energy={p.energy}
              setEnergy={newEnergy => setEnergy(newEnergy, idx)}
              spendResource={spendResource}
            />
          ))}
        </div>
      </section >
      
      <section >
        <DicePane
          spendableResources={spendableResources}
          setSpendableResources={setSpendableResources}
        />
      </section>
    </main>
  )
}
