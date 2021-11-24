import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Book from './pages/Book'
import Post from './pages/Post'
import User from './pages/User'
import Login from './pages/Login'
import Nav from './components/Nav/Nav'
import Header from './components/Header/Header'
import {makeStyles} from '@mui/styles'
const useStyles = makeStyles({
  root:{
      display: 'flex'
  }
})
function App() {
  const classes = useStyles();
  if (!localStorage.getItem('islogin')&&!localStorage.getItem('id')) return <Login/>
  return (
    <Router>
      <div className={classes.root}>
      <Header/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Book/>} exact/>
        <Route path='/post' element={<Post/>} exact/>
        <Route path='/user' element={<User/>}/>
        <Route path='/book' element={<Book/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
