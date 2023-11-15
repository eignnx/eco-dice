import React from 'react';
import { Die } from './Die';
import { randomNat } from "../utils.js"
import './DicePane.css'
import RollControls from './RollControls.jsx'
import { useDice } from '../DiceProvider.jsx'
import { SYMBOLS } from '../symbols.js'


function DicePane({spendableResources, setSpendableResources}) {

  const dice = useDice();
  const [kept, setKept] = React.useState(false);

  function roll() {
    const newDice = dice.map(d => ({
      ...d,
      selectedIdx: randomNat(6),
    }));
    
    setDice(newDice);
    setKept(false)
  }

  function keep() {
    setKept(true)
    const newResources = dice.map(die => [...die.faces[die.selectedIdx].symbols]);
    console.log("SPENDABLE RESOURCES: %s", JSON.stringify(newResources))
    setSpendableResources(newResources)
  }

  return (
    <section id="dice-pane">
      <RollControls roll={roll} keep={keep} kept={kept}/>
      <div id="dice">
        {dice.map((d, idx) => (
          <Die
            key={idx}
            dieIdx={idx}
            faces={d.faces}
            selectedIdx={d.selectedIdx}
            kept={kept}
            spendableResources={spendableResources}
          />
        ))}
      </div>
    </section>
  );
};

export default DicePane;