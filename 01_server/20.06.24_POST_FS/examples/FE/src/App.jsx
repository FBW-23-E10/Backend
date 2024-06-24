import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

const clickHandler=()=>{

  setCount((count) => count + 1)
  axios.post('http://localhost:5001/counter',{count})
}


  return (
    <>
   
       
      <div className="card">
        <button onClick={clickHandler}>
          count is {count}
        </button>
       
      </div>
   
    </>
  )
}

export default App
