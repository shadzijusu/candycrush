import {useState} from 'react'
import {useEffect} from 'react'

const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]


const  App = () => {
  const [currentColorArangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const checkForColumnOfThree = () => {
    for(let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArangement[i]
      if(columnOfThree.every(square => currentColorArangement[square] === decidedColor))
      {
        columnOfThree.forEach(square => currentColorArangement[square] = '')
      return true
      }
    }
  }
  
  const checkForColumnOfFour = () => {
    for(let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArangement[i]
      if(columnOfFour.every(square => currentColorArangement[square] === decidedColor))
      {
        columnOfFour.forEach(square => currentColorArangement[square] = '')
        return true
      }
    }
  }
  const checkForRowOfThree = () => {
    for(let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArangement[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      if(notValid.includes(i)) continue
      if(rowOfThree.every(square => currentColorArangement[square] === decidedColor))
      {
        rowOfThree.forEach(square => currentColorArangement[square] = '')
        return true 
     }
    }
  }
  const checkForRowOfFour = () => {
    for(let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArangement[i]
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      if(notValid.includes(i)) continue
      if(rowOfFour.every(square => currentColorArangement[square] === decidedColor))
      {
        rowOfFour.forEach(square => currentColorArangement[square] = '')
        return true
      }
    }
  }
  const moveIntoSquareBelow = () => {
    for(let i = 0; i <= 55 ; i++) {
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)
      if(isFirstRow && currentColorArangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArangement[i] = candyColors[randomNumber]
      }
      if(currentColorArangement[i + width] === '') {
        currentColorArangement[i + width] = currentColorArangement[i]
        currentColorArangement[i] = ''
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
    currentColorArangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
    currentColorArangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)

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
    <div className="app">
      <div className="game">
        {currentColorArangement.map((candyColor, index) => (
          <img key={index} style={{backgroundColor: candyColor}} 
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

export default App
