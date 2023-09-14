import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'
import Dashboard from './pages/Dashboard'
import AllShifts from './components/shifts/AllShifts'
import EmployeeShifts from './components/shifts/EmployeeShifts'
import EmployeeProfile from './components/users/EmployeeProfile'
import CreateEmployee from './components/users/CreateEmployee'
import EmployeeList from './components/users/EmployeeList'
import UpdateEmployee from './components/users/UpdateEmployee'

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
          {
            path: 'employees',
            element: <EmployeeList />
          },
          {
            path: 'employee/:id', //Specific employee profile - Employee can only view own
            element: <EmployeeProfile />
          },
          {
            path: 'employee/new',
            element: <CreateEmployee />
          },
          {
            path: 'employee/:id/update',
            element: <UpdateEmployee />
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
