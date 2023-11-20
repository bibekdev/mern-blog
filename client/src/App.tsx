import { Route, Routes } from 'react-router-dom'
import Navbar from './components/globals/navbar'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
