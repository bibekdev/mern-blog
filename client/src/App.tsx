import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/globals/navbar'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import EditorPage from './pages/editor'

function App() {
  const location = useLocation()
  console.log(location)
  return (
    <>
      {location.pathname === '/editor' ? '' : <Navbar />}

      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/editor' element={<EditorPage />} />
      </Routes>

      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  )
}

export default App
