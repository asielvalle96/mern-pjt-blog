import { useEffect, useState } from 'react'
import Post from '../components/Post.jsx'

export default function IndexPage () {
  const [posts, setPosts] = useState({})
  useEffect(() => {
    const getAllPosts = async () => {
      const resp = await fetch('http://localhost:3000/api/posts')
      setPosts(await resp.json())
    }

    getAllPosts()
  }, [])
  // console.log(posts)

  return (
    <>
      {
        posts.length > 0 && posts.map(post => (
          <div key={post._id}>
            <Post {...post} />
          </div>
        ))
      }
    </>
  )
}
