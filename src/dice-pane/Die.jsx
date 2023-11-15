import React from 'react';
import './Die.css';
import RollResults from './RollResults.jsx'
import { useDice } from '../DiceProvider'


export function Die({dieIdx, kept, spendableResources}) {
  const dice = useDice()
  const faces = dice[dieIdx].faces
  const selectedIdx = dice[dieIdx].selectedIdx
  console.log("faces:", JSON.stringify(faces))
  
  const selectedFace = selectedIdx !== null ? faces[selectedIdx] : "";
  
  return (
    <div className="die-and-rolled-face">
      <RollResults
        dieIdx={dieIdx}
        selectedFace={selectedFace}
        selectedIdx={selectedIdx}
        kept={kept}
        spendableResources={spendableResources}
      />
      <div className="die-faces">
        {faces.map((f, idx) => 
          <DieFace key={idx} face={f} selected={idx === selectedIdx} />
        )}
      </div>
    </div>
  );
}

export function DieFace({ face, selected=false }) {
  const classes = [
    "die-face",
    ...selected ? ["selected-die-face"] : []
  ].join(" ")
  
  return (
    <div className={classes}>
      {face.symbols}
    </div>
  );
};

