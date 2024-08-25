import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './createTrip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import VIewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

const router= createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/createTrip',
    element: <CreateTrip/>
  },
  {
    path: '/view-trip/:tripId',
    element:<VIewTrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
