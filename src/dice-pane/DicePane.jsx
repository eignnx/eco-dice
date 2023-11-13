import React from 'react';
import { Die } from './Die';
import { randomNat } from "../utils.js"
import './DicePane.css'
import RollControls from './RollControls.jsx'
import { SYMBOLS } from '../symbols.js'

const randomSymbols = (symbolObj, maxSyms = 4) => {
  const keys = Object.keys(symbolObj);
  const numSymbols = randomNat(maxSyms) + 1;
  let result = '';
  for (let i = 0; i < numSymbols; i++) {
    const randomKey = keys[randomNat(keys.length)];
    result += symbolObj[randomKey];
  }
  return result;
};

function genDie() {
  return [
    { symbols: randomSymbols(SYMBOLS) },
    { symbols: randomSymbols(SYMBOLS) },
    { symbols: randomSymbols(SYMBOLS) },
    { symbols: randomSymbols(SYMBOLS) },
    { symbols: randomSymbols(SYMBOLS) },
    { symbols: randomSymbols(SYMBOLS) },
  ];
}

const DICE = [
  { faces: genDie(), selectedIdx: null },
  { faces: genDie(), selectedIdx: null },
  { faces: genDie(), selectedIdx: null },
  { faces: genDie(), selectedIdx: null },
];

function DicePane({spendableResources, setSpendableResources}) {

  const [dice, setDice] = React.useState(DICE);
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