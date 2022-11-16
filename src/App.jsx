import { useEffect, useState } from 'react'
import './App.css'
import { Dice } from './Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [numberOfDices, setNumberOfDices] = useState(10)
  const [diceList, setDiceList] = useState(createDiceList())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = diceList.every(dice => dice.isHeld)
    const firstValue = diceList[0].value
    const allSameValue = diceList.every(dice => dice.value === firstValue)
    if (allSameValue && allHeld) {
      setTenzies(true)
    }

  }, [diceList])

  function createNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function createDiceList() {
    let diceList = []
    for (let i = 0; i < numberOfDices; i++) {
      diceList.push(createNewDice())
    }
    return diceList
  }

  function holdDice(id) {
    setDiceList(prev => prev.map(dice => {
      return dice.id === id ?
        { ...dice, isHeld: !dice.isHeld } : dice
    }
    ))
  }

  function rowDice() {
    if (tenzies) {
      setTenzies(false)
      setDiceList(createDiceList())
    } else {
      setDiceList(prev => prev.map(dice => {
        return dice.isHeld ? dice : createNewDice()
      }
      ))
    }
  }

  return (
    <div className="app">
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dyce-container'>
        {diceList.map(dice => (
          <Dice
            key={dice.id}
            diceData={dice}
            holdDice={() => holdDice(dice.id)}
          />
        ))}
      </div>
      <button onClick={rowDice} className='roll-dyce-button'>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  )
}

export default App
