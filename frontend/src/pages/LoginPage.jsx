import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext.jsx'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUserInfo } = useContext(UserContext)

  const login = async (event) => {
    event.preventDefault() // Now, doesn't reload the page.
    try {
      const resp = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Send the cookies to the Backend.
      })

      if (resp.ok) {
        const data = await resp.json()
        setUserInfo(data) // Access global to the user info (Context).
        navigate('/')
      } else {
        console.log('Wrong credentials.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={login} className='login'>
      <h1>Login</h1>
      <input type='text' placeholder='username' value={username} onChange={event => setUsername(event.target.value)} />
      <input type='password' placeholder='password' value={password} onChange={event => setPassword(event.target.value)} />
      <button>Login</button>
    </form>
  )
}
