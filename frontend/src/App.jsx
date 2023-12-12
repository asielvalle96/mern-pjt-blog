import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { UserProvider } from '../src/UserContext.jsx'
import PostForm from './pages/PostForm.jsx'
import PostPage from './pages/PostPage.jsx'

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/post/create' element={<PostForm />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/post/edit/:id' element={<PostForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
