// To edit text on the blog.
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useNavigate, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ]
}
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default function PostForm () {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [file, setFile] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  const getPostInfoById = async () => {
    const resp = await fetch(`http://localhost:3000/api/post/${params.id}`)
    const data = await resp.json()
    setTitle(data.title)
    setSummary(data.summary)
    setFile(data.file)
    setContent(data.content)
    console.log('dataaaa', data)
  }

  useEffect(() => {
    if (params.id) {
      getPostInfoById()
      console.log('pp ', params.id)
    } else {
      setTitle('')
      setSummary('')
      setFile('')
      setContent('')
    }
  }, [params.id])

  const data = new FormData()
  data.set('title', title)
  data.set('summary', summary)
  data.set('fileToUpload', file[0])
  data.set('content', content)

  const createNewPost = async () => {
    try {
      const resp = await fetch('http://localhost:3000/api/post/create', {
        method: 'POST',
        body: data,
        credentials: 'include' // Send the cookies to the Backend.
      })
      // console.log('Post created: ', await resp.json())

      if (resp.ok) {
        navigate('/')
      }
    } catch (err) {
      console.log('Error on PostFrom/createNewPost: ', err)
    }
  }

  const updatePost = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/api/post/update/${params.id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include' // Send the cookies to the Backend.
      })
      // console.log('Post edited: ', await resp.json())

      if (resp.ok) {
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault() // Now, when I execute "submit" the page doesn't charger.

    if (!params.id) {
      createNewPost()
    } else {
      updatePost()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='title' placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />
      <input type='summary' placeholder='Summary' value={summary} onChange={ev => setSummary(ev.target.value)} />
      <input type='file' onChange={ev => setFile(ev.target.files)} />
      <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />

      {
        !params.id
          ? <button style={{ marginTop: '5px' }}>Create post</button>
          : <button style={{ marginTop: '5px', backgroundColor: '#2F7DEE' }}>Edit post</button>
      }
    </form>
  )
}
