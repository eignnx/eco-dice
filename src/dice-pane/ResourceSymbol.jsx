import './ResourceSymbol.css'

function ResourceSymbol({
  symbol,
  spent,
  use,
  resourceIdx,
}) {
  function dragStart(e, symbol) {
    e.dataTransfer.setData("application/json", JSON.stringify({
      symbol,
      resourceIdx,
    }));
  }


  const classes = ["kept-symbol"]
  if (spent) {
    classes.push("spent-resource-symbol")
  }
  
  return (
    <span
      className={classes.join(" ")}
      draggable="true"
      onDragStart={e => dragStart(e, symbol)}
    >
      {symbol}
    </span>
  )
}

export default ResourceSymbol;