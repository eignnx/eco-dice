import React from 'react';
import './Die.css';
import RollResults from './RollResults.jsx'


export function Die({dieIdx, faces, selectedIdx=null, kept, spendableResources}) {
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
          <DieFace key={idx} value={f} selected={idx === selectedIdx} />
        )}
      </div>
    </div>
  );
}

export function DieFace({ value, selected=false }) {
  const classes = `die-face ${selected ? "selected-die-face" : ""}`;
  return (
    <div className={classes}>
      {value.symbols}
    </div>
  );
};

