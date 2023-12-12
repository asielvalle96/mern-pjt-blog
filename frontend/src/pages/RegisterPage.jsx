/* eslint-disable no-undef */
import { useState } from 'react'

export default function RegisterPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const register = async (event) => {
    event.preventDefault() // Now, doesn't reload the page.
    try {
      const resp = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(resp)
    } catch (error) {
      console.log('Register function from RegisterPage.jsx: ', error)
    }
  }

  return (
    <form onSubmit={register} className='register'>
      <h1>Register</h1>
      <input type='text' placeholder='username' value={username} onChange={event => setUsername(event.target.value)} />
      <input type='password' placeholder='password' value={password} onChange={event => setPassword(event.target.value)} />
      <button type='submit'>Register</button>
    </form>
  )
}
