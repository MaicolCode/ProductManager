import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Pagina de inicio</h1>
  },
  {
    path: '/dashboard',
    element: <App />
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
