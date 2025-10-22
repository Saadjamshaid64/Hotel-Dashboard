import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard.jsx'
import Layout from './Layout.jsx'
import Users from './Pages/Users.jsx'
import Patient from './Pages/Patient.jsx'
import Schedule from './Pages/Schedule.jsx'
import Pos from "./Pages/Pos.jsx"
import Tasks from "./Pages/Tasks.jsx"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Dashboard/>}/>
      <Route path='patient' element={<Patient/>}/>
      <Route path='user' element={<Users/>}/>
      <Route path='schedule' element={<Schedule/>}/>
      <Route path='tasks' element={<Tasks/>}/>
      <Route path='pos' element={<Pos/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
