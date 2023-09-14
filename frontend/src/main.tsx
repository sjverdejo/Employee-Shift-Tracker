import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'
import Dashboard from './pages/Dashboard'
import AllShifts from './components/shifts/AllShifts'
import EmployeeShifts from './components/shifts/EmployeeShifts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'allshifts',
            element: <AllShifts />
          },
          {
            path: 'employee-shifts/:id',
            element: <EmployeeShifts />
          }
        ]
      },
      // {
      //   path: 'profile',
      //   element:
      // }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
