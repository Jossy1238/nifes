import { useState } from 'react'
import './App.css'
import './Media.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import ViewEvent from './pages/ViewEvent';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllEvents from './pages/AllEvents';
import CreateEvent from './pages/CreateEvent';
import Alumni from './pages/Alumni';
import EditAlumni from './pages/EditAlumni';
import MyEvents from './pages/MyEvents';
import AppContext from './AppContext';
import Event from './pages/Event';
import EditEvent from './pages/EditEvent';
import AddAlumni from './pages/AddAlumni';

function App() {

  const [user, setUser] = useState({})

  const values = {
    user,
    setUser
  }


  return (
    <AppContext.Provider value={values}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/events/:id' element={<ViewEvent/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/signup' element={<Registration/>}/>
          <Route path='/signin' element={<Login/>}/>

          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/all-events' element={<AllEvents/>}/>
          <Route path='/all-events/:id' element={<Event/>}/>
          <Route path='/my-events' element={<MyEvents/>}/>
          <Route path='/my-events/create' element={<CreateEvent/>}/>
          <Route path='/my-events/:id/edit' element={<EditEvent/>}/>

          <Route path='/alumni' element={<Alumni/>}/>
          <Route path='/alumni/add' element={<AddAlumni/>}/>

          <Route path='/alumni/:id/edit' element={<EditAlumni/>}/>

        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
