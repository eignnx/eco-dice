import { useReducer, createContext, useContext } from 'react'
import { SYMBOLS } from './symbols.js'
import { randomNat } from './utils.js'

const DiceContext = createContext(null)
const DiceDispatchContext = createContext(null)

export default function DiceProvider({children}) {
  const [dice, diceDispatch] = useReducer(diceReducer, INITIAL_DICE);
  
  return (
    <DiceContext.Provider value={dice}>
      <DiceDispatchContext.Provider value={diceDispatch}>
        {children}
      </DiceDispatchContext.Provider>
    </DiceContext.Provider>
  )
}

function diceReducer(dice, action) {
  switch (action.type) {
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function useDice() {
  const context = useContext(DiceContext);
  if (context === undefined || context === null) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
}

export function useDiceDispatch() {
  const context = useContext(DiceDispatchContext);
  if (context === undefined || context === null) {
    throw new Error("useDiceDispatch must be used within a DiceProvider");
  }
  return context;
}

function randomSymbols(symbolObj, maxSyms = 4) {
  const keys = Object.keys(symbolObj);
  const numSymbols = randomNat(maxSyms) + 1;
  let result = '';
  for (let i = 0; i < numSymbols; i++) {
    const randomKey = keys[randomNat(keys.length)];
    result += symbolObj[randomKey];
  }
  return result;
}

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

const INITIAL_DICE = [
  { faces: genDie(), selectedIdx: null },
  { faces: genDie(), selectedIdx: null },
  { faces: genDie(), selectedIdx: null },
  { faces: genDie(), selectedIdx: null },
];