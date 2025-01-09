import { useState } from "react"
import Cell from "./components/cell"

function App() {
  let cells = [1,2,3,4,5,6,7,8,9]

  const [currentPlayer, setCurrentPlayer] = useState('p1')
  const [p1Cells, setP1Cells] = useState([])
  const [p2Cells, setP2Cells] = useState([])


  function handleClick(id) {
    console.log(p1Cells)
    if(currentPlayer == 'p1'){
      setCurrentPlayer('p2')
      const updatedP1Cells = [...p1Cells,id];
      setP1Cells(updatedP1Cells)
    } else {
      setCurrentPlayer('p1')
      const updatedP2Cells = [...p2Cells,id];
      setP2Cells(updatedP2Cells)
    }
  }

  return (
    <>
      <div className="board">
        {
          cells.map((id) => (
            <Cell 
              key = {id} 
              id = {id} 
              p1Cells = {p1Cells}
              p2Cells = {p2Cells}
              handleClick = {handleClick}
            />
          ))
        }
      </div>
    </>
  )
}

export default App
