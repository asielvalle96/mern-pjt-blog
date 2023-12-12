import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext.jsx'

export default function Header () {
  const { userInfo, setUserInfo } = useContext(UserContext)

  // const getInfoUserForProfile = async () => {
  //   try {
  //     await fetch('http://localhost:3000/api/profile', { credentials: 'include' }).then(resp => {
  //       resp.json().then(data => {
  //          setUserInfo(data)
  //       })
  //     })
  //   } catch (error) {
  //     console.log('Error from Header.jsx: ', error)
  //   }
  // }

  useEffect(() => {
    const getInfoUserForProfile = async () => {
      try {
        const resp = await fetch('http://localhost:3000/api/profile', { credentials: 'include' })
        const data = await resp.json()
        // console.log('data ', data)
        setUserInfo(data)
      } catch (error) {
        console.log(error)
      }
    }

    getInfoUserForProfile()
  }, [])

  const logout = () => {
    fetch('http://localhost:3000/api/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null)
  }

  const isUsername = userInfo?.username // ?. because "userInfo" can be null.

  return (
    <header>
      <Link to='/' className='logo'>MyBlog</Link>
      <nav>
        {/* {
          isUsername
            ? (
              <>
                <Link to='/create'>Create new post</Link>
              </>)
            : (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>)
        } */}

        {isUsername && ( // isUsername !== null
          <>
            <span>Hello, {userInfo?.username}</span>
            <Link to='/post/create'>Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}

        {!isUsername && ( // isUsername === null
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
