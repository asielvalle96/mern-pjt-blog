// FS = File System.
// Result src/upload/e6da21f7d933bc17c9335ab810e91273.jpg
import fs from 'fs'

import Post from '../models/post.model.js'
import jwt from 'jsonwebtoken'
import secretKeyForAuthToken from '../../conf.js'

export const createNewPost = async (req, res) => {
  // res.json(req.file) // Chrome/Network/Response ⬇️. This just is to see the result.
  // {
  //   fieldname: 'fileToUpload',
  //   originalname: 'aventador-ultimate-2.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: 'src/uploads/',
  //   filename: '71dc7f8231a892a09e1cc7c2236669cb',
  //   path: 'src\\uploads\\71dc7f8231a892a09e1cc7c2236669cb',
  //   size: 1148878
  // }

  if (req.file) {
    const { originalname, path } = req.file // Full name and path of the file choice on the "Create new post" form.

    const parts = originalname.split('.') // console.log(parts) // [ 'aventador-ultimate-2', 'png' ]

    const ext = parts[1] // res.json({ ext }) // png

    const newPath = path + '.' + ext // "src/upload/71dc7f8231a892a09e1cc7c2236669cb.jpg"
    fs.renameSync(path, newPath) // Rename path with "src/upload/71dc7f8231a892a09e1cc7c2236669cb.jpg"

    const { tokenBlog } = req.cookies

    if (tokenBlog) {
      jwt.verify(tokenBlog, secretKeyForAuthToken, {}, async (err, data) => {
        // data ===> username, id, iat.

        if (err) throw err

        const { title, summary, content } = req.body
        const postDoc = await Post.create({
          title,
          summary,
          content,
          file: newPath,
          author: data.id
        })

        res.json(postDoc) // Chrome/Network/Response ⬇️
        // [
        //   {
        //       "_id": "655da2eddfee7dc69824a76f",
        //       "title": "Lamborghini",
        //       "summary": "The best of the best",
        //       "content": "<p>My favorite car in the world.</p>",
        //       "file": "src\\uploads\\ebe6f12b2ca86d61fe6c4ebaa58be91a.jpg",
        //       "author": "655da0b8dfee7dc69824a766",
        //       "createdAt": "2023-11-22T06:42:53.248Z",
        //       "updatedAt": "2023-11-22T06:42:53.248Z",
        //       "__v": 0
        //   }
        // ]
      })
    } else {
      res.status(401).json({ message: 'Unauthorized. From post.controller/createNewPost function in Backend.' })
    }
  } else {
    res.json({ error: 'No file received.' })
    console.log('No file received.')
  }
}

export const getAllPosts = async (req, res) => {
  // const posts = await Post.find().populate('author', ['username']) // Here I just show the username of the author.

  const posts = await Post.find().populate('author').sort({ createdAt: -1 }).limit(20)
  // "populate" allows to get the nested data (the author data).
  // sort by most created recently first.
  // Show a limit of 20 posts.

  res.json(posts) // Chrome/Network/Response ⬇️
  // [
  //   {
  //       "_id": "655f7b0a260c930bf28feb38",
  //       "title": "Lamborghini",
  //       "summary": "The best of the best",
  //       "content": "My car",
  //       "file": "src\\uploads\\641daa498ee1f595fc82d878a8c13807.jpg",
  //       "author": {
  //           "_id": "655da6a868f04444759ab688",
  //           "username": "asiel",
  //           "password": "$2a$10$iarZ5Ih65cCmoN0i7RYL8eU1akzkItyQttctzQOJSSncmasjJYdPG",
  //           "createdAt": "2023-11-22T06:58:48.722Z",
  //           "updatedAt": "2023-11-22T06:58:48.722Z",
  //           "__v": 0
  //       },
  //       "createdAt": "2023-11-23T16:17:14.035Z",
  //       "updatedAt": "2023-11-23T16:17:14.035Z",
  //       "__v": 0
  //   },
  //   {
  //       "_id": "655f7b92260c930bf28feb3c",
  //       "title": "Bugatti",
  //       "summary": "Great car",
  //       "content": "<p>The most expensive.</p>",
  //       "file": "src\\uploads\\21592c5a1132cff463e36a3f3697decc.jpg",
  //       "author": {
  //           "_id": "655da6a868f04444759ab688",
  //           "username": "asiel",
  //           "password": "$2a$10$iarZ5Ih65cCmoN0i7RYL8eU1akzkItyQttctzQOJSSncmasjJYdPG",
  //           "createdAt": "2023-11-22T06:58:48.722Z",
  //           "updatedAt": "2023-11-22T06:58:48.722Z",
  //           "__v": 0
  //       },
  //       "createdAt": "2023-11-23T16:19:30.176Z",
  //       "updatedAt": "2023-11-23T16:19:30.176Z",
  //       "__v": 0
  //   }
  // ]
}

// Get a post info by id.
export const getPostInfoById = async (req, res) => {
  const { id } = req.params
  const postFound = await Post.findById(id).populate('author', ['username'])
  // Here populate brings by author, _id (for default) and username.

  if (postFound) {
    res.json(postFound)
  } else {
    res.status(404).json({ error: 'Post not found. From function getPostInfoById in backend/post.controller.js' })
  }
}

// Update a post.
export const updatePost = async (req, res) => {
  // if (req.file) { // This just is to see the result.
  //   console.log(req.file)
  //   // {
  //   //   fieldname: 'fileToUpload',
  //   //   originalname: 'aventador-ultimate-2.png',
  //   //   encoding: '7bit',
  //   //   mimetype: 'image/png',
  //   //   destination: 'src/uploads/',
  //   //   filename: '1636b5f949dd4de2ed8c45658ab7445f',
  //   //   path: 'src\\uploads\\1636b5f949dd4de2ed8c45658ab7445f',
  //   //   size: 1148878
  //   // }
  // } else {
  //   console.log(req.file) // undefined
  // }

  if (req.file) {
    const { originalname, path } = req.file // Full name and path of the file choice on the "Create new post" form.

    const parts = originalname.split('.') // console.log(parts) // [ 'Lamborghini', 'jpg' ]

    const ext = parts[1] // res.json({ ext }) // png

    const newPath = path + '.' + ext // "src/upload/1636b5f949dd4de2ed8c45658ab7445f.jpg"
    fs.renameSync(path, newPath) // Rename path with "src/upload/1636b5f949dd4de2ed8c45658ab7445f.jpg"

    const { tokenBlog } = req.cookies

    if (tokenBlog) {
      // data ===> username, id, iat.
      jwt.verify(tokenBlog, secretKeyForAuthToken, {}, async (err, data) => {
        if (err) throw err

        try {
          const { title, summary, content } = req.body
          const postUpdated = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              title,
              summary,
              file: newPath,
              content,
              author: data.id
            },

            // When it updates, mongoose returns the old post. Then, I put
            // this ⬇️ so that mongoose return to me the new post (the current post).
            { new: true }
          )
          if (postUpdated) {
            console.log('postUpdated ', postUpdated)
            return res.json(postUpdated)
          } else {
            console.log('postUpdated ', postUpdated)
            return res.status(404).json({ message: 'Post not found.' })
          }
        } catch (error) {
          return res.status(500).json({ message: error.message })
        }
      })
    } else {
      res.status(401).json({ message: 'Unauthorized. From post.controller/createNewPost function in Backend.' })
    }
  } else {
    const { tokenBlog } = req.cookies

    if (tokenBlog) {
      // data ===> username, id, iat.
      jwt.verify(tokenBlog, secretKeyForAuthToken, {}, async (err, data) => {
        if (err) throw err

        try {
          const { title, summary, content } = req.body
          const postUpdated = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              title,
              summary,
              content,
              author: data.id
            },

            // When it updates, mongoose returns the old post. Then, I put
            // this ⬇️ so that mongoose return to me the new post (the current post).
            { new: true }
          )
          console.log('postUpdated ', postUpdated)
          return res.json(postUpdated)
        } catch (error) {
          return res.status(500).json({ message: error.message })
        }
      })
    } else {
      res.status(401).json({ message: 'Unauthorized. From post.controller/createNewPost function in Backend.' })
    }
  }
}

// Delete post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found.' })
    }

    // 204 = todo estuvo bien, pero no te devolvere nada, pues no tengo
    // nada que devolver (ya que elimine, en este caso).
    res.json({ message: 'Deleted post.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
