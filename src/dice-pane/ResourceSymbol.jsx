import './ResourceSymbol.css'

function ResourceSymbol({
  dieIdx,
  symbol,
  spent,
  resourceIdx,
}) {
  function dragStart(e, symbol) {
    e.dataTransfer.setData("application/json", JSON.stringify({
      symbol,
      resourceIdx,
      dieIdx,
    }));
  }


  const classes = [
    "kept-symbol",
    ...(spent ? ["spent-resource-symbol"] : [])
  ];

  return (
    <span
      className={classes.join(" ")}
      draggable={spent ? "false" : "true"}
      onDragStart={e => dragStart(e, symbol)}
    >
      {symbol}
    </span>
  )
}

export default ResourceSymbol;