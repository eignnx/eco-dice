import './RollControls.css'

function RollControls({roll, keep}) {
  return (
    <section id="roll-controls">
      <button onClick={keep} className="roll-btn">Keep</button>
      <button onClick={roll} className="roll-btn">Roll</button>
    </section>
  )
}

export default RollControls;