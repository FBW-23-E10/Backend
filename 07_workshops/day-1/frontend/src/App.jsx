import React from 'react'

function App() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"
  }
  
  return (
    <div className='p-5 bg-gray-500'>
        <button 
          onClick={handleLogin}
          className='px-5 py-2 rounded text-white bg-blue-500'>Login with google</button>
      </div>
  )
}

export default App