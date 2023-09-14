import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'
import Dashboard from './pages/Dashboard'
import AllShifts from './components/shifts/AllShifts'
import EmployeeShifts from './components/shifts/EmployeeShifts'
import Profile from './components/users/Profile'

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
            path: 'employees-shifts', //All employees shifts - Admin only
            element: <AllShifts />
          },
          {
            path: 'employee-shifts/:id', //All shifts for certain employee - Admin and Employee
            element: <EmployeeShifts />
          },
          // {
          //   path: 'employees-profiles',
          //   element: <Profile
          // },
          {
            path: 'profile/:id', //Specific employee profile - Employee can only view own
            element: <Profile />
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
