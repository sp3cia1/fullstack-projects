import Cell from "./components/cell"

function App() {
  let cells = [1,2,3,4,5,6,7,8,9]

  return (
    <>
      <div className="board">
        {
          cells.map((id) => (
            <Cell key = {id} id = {id}/>
          ))
        }
      </div>
    </>
  )
}

export default App
