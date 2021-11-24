import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Book from './pages/Book'
import Post from './pages/Post'
import User from './pages/User'
import Login from './pages/Login'
import Nav from './components/Nav/Nav'
import Header from './components/Header/Header'
function App() {
  if (!localStorage.getItem('islogin')&&!localStorage.getItem('id')) return <Login/>
  return (
    <Router>
      {/* <Header/> */}
      <Nav/>
      <Routes>
        <Route path='/' element={<Book/>} exact/>
        <Route path='/post' element={<Post/>} exact/>
        <Route path='/user' element={<User/>}/>
        <Route path='/book' element={<Book/>}/>
      </Routes>
    </Router>
  );
}

export default App;
