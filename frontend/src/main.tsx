import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import Dashboard from './components/home/Dashboard'
import AllShifts from './components/shifts/AllShifts'
import EmployeeShifts from './components/shifts/EmployeeShifts'
import EmployeeProfile from './components/users/EmployeeProfile'
import CreateEmployee from './components/users/CreateEmployee'
import EmployeeList from './components/users/EmployeeList'
import UpdateEmployee from './components/users/UpdateEmployee'
import CreateShift from './components/shifts/CreateShift'
import UpdateShift from './components/shifts/UpdateShift'
import ErrorPage from './components/alerts/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'employees', //All employees - Admin only
        element: <EmployeeList />
      },
      {
        path: 'employee/:id', //Specific employee profile - Employee can only view own
        element: <EmployeeProfile />
      },
      {
        path: 'employee/new', //Create new employee login - Admin Only
        element: <CreateEmployee />
      },
      {
        path: 'employee/:id/update', //Update employee - Admin only
        element: <UpdateEmployee />
      },
      {
        path: 'shifts', //All employees shifts - Admin only
        element: <AllShifts />
      },
      {
        path: 'shifts/:id', //All shifts for certain employee - Admin and Employee
        element: <EmployeeShifts />
      },
      {
        path: 'shifts/new', //Create shift - Admin only
        element: <CreateShift />
      },
      {
        path: 'shifts/:id/update',
        element: <UpdateShift />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
