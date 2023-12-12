// To format date.
// import { formatISO9075 } from 'date-fns'
import { format } from 'date-fns'

import { Link } from 'react-router-dom'

export default function Post ({ _id, title, summary, content, file, createdAt, author }) {
  const deletePost = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/api/post/delete/${_id}`, {
        method: 'DELETE'
      })

      if (resp.ok) {
        location.reload()
      }
    } catch (error) {
      console.log('Error on Post.jsx/deletePost: ', error)
    }
  }

  return (
    <div className='post'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:3000/api/' + file} alt={file} />
        </Link>
      </div>
      <div className='texts'>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a href='' className='author'>{author.username}</a>
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}

          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          {/* MMM d, yyyy HH:mm ➡️ In the table "https://date-fns.org/v2.16.1/docs/format" */}

        </p>
        <p className='summary'>{summary}</p>

        {/* <button
          onClick={() => deletePost(_id)}
          style={{ marginTop: '5px', backgroundColor: '#E84134', width: '90px' }}
        >
          Delete post
        </button> */}
      </div>
    </div>
  )
}
