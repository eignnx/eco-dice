import './RollControls.css'

function RollControls({roll, keep, kept}) {
  return (
    <section id="roll-controls">
      <button onClick={keep} disabled={kept} className="roll-btn">Keep</button>
      <button onClick={roll} className="roll-btn">Roll</button>
    </section>
  )
}

export default RollControls;