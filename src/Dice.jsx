export function Dice({ diceData, holdDice }) {
  let styles = {
    backgroundColor: diceData.isHeld ? "#59E391" : "#FFFFFF"
  }
  return (
    <div
      className="dyce-item"
      style={styles}
      onClick={holdDice}
    >
      <h2>{diceData.value}</h2>
    </div>
  )
}
