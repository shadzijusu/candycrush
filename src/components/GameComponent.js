import {useState} from 'react'
import {useEffect} from 'react'

import BlueCandy from '../images/blue-candy.png'
import GreenCandy from '../images/green-candy.png'
import OrangeCandy from '../images/orange-candy.png'
import PurpleCandy from '../images/purple-candy.png'
import RedCandy from  '../images/red-candy.png'
import YellowCandy from '../images/yellow-candy.png'
import blank from  '../images/blue-candy.png'
import ScoreBoard from '../components/ScoreBoard'

const width = 8
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
  blank
]


const  GameComponent = () => {
  const [currentColorArangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)
  const checkForColumnOfThree = () => {
    for(let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArangement[i]
      const isBlank = currentColorArangement[i] === blank
      if(columnOfThree.every(square => currentColorArangement[square] === decidedColor && !isBlank))
      {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentColorArangement[square] = blank)
      return true
      }
    }
  }
  
  const checkForColumnOfFour = () => {
    for(let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArangement[i]
      const isBlank = currentColorArangement[i] === blank

      if(columnOfFour.every(square => currentColorArangement[square] === decidedColor && !isBlank))
      {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArangement[square] = blank)
        return true
      }
    }
  }
  const checkForRowOfThree = () => {
    for(let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArangement[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      const isBlank = currentColorArangement[i] === blank

      if(notValid.includes(i)) continue
      if(rowOfThree.every(square => currentColorArangement[square] === decidedColor && !isBlank))
      {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentColorArangement[square] = blank)
        return true 
     }
    }
  }
  const checkForRowOfFour = () => {
    for(let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArangement[i]
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      
      const isBlank = currentColorArangement[i] === blank
      if(notValid.includes(i)) continue
      if(rowOfFour.every(square => currentColorArangement[square] === decidedColor && !isBlank))
      {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentColorArangement[square] = blank)
        return true
      }
    }
  }
  const moveIntoSquareBelow = () => {
    for(let i = 0; i <= 55 ; i++) {
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)
      if(isFirstRow && currentColorArangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArangement[i] = candyColors[randomNumber]
      }
      if(currentColorArangement[i + width] === blank) {
        currentColorArangement[i + width] = currentColorArangement[i]
        currentColorArangement[i] = blank
      }
    }
  }
  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    currentColorArangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOFFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOFThree = checkForRowOfThree()

    if(squareBeingReplacedId && validMove && (isARowOFThree || isARowOFFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    }
    else {
      currentColorArangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArangement])
    }
  }
  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width*width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
  useEffect(() =>  {
    createBoard()
  }, [])

  useEffect(() =>  {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      checkForRowOfFour()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArangement])
    }, 100)
    return (() => clearInterval(timer))
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArangement])
  
  return (
    <div style={{padding: '20px'}}>
   
   <ScoreBoard score={scoreDisplay}></ScoreBoard>

      <div className="game">
        {currentColorArangement.map((candyColor, index) => (
          <img key={index}  
          src={candyColor}
          alt={candyColor}
           data-id={index}
           draggable={true}
           onDragStart={dragStart}
           onDragOver={(e) => e.preventDefault()}
           onDragEnter={(e) => e.preventDefault()}
           onDragLeave={(e) => e.preventDefault()}
           onDrop={dragDrop}
           onDragEnd={dragEnd}>
           
          </img>
        ))}
      </div>
  
    </div>

  )
}

export default GameComponent
