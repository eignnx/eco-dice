import './RollResults.css'
import { DieFace } from './Die.jsx'
import ResourceSymbol from './ResourceSymbol.jsx'

function RollResults({selectedFace, selectedIdx, kept, spendableResources}) {
  
  return (
      !kept ? (
        <div className="die-rolled-face">
          <DieFace value={selectedFace} selected={selectedIdx !== null} />
        </div>
      ) : (
        <div className="kept-symbols">
          {[...selectedFace.symbols].map((symbol, idx) => (
            <ResourceSymbol
              key={idx}
              resourceIdx={idx}
              symbol={symbol}
              spent={spendableResources[idx] === "spent"}
              use={() => spendResource(idx)}
            />
          ))}
        </div>
      )
  )
}

export default RollResults;