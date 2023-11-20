import { Link } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'

const Navbar = () => {
  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false)
  return (
    <nav className='z-10 sticky top-0 border-b border-grey bg-white h-[80px] px-[5vw] py-5 flex items-center gap-12 w-full '>
      <Link to='/' className='flex-none w-10'>
        <img src='/logo.png' alt='logo' className='w-full' />
      </Link>

      <div
        className={`absolute top-full left-0 w-full mt-0.5 py-5 px-[5vw] border-b border-grey md:relative md:inset-0 
        md:border-0
         md:show md:p-0
         ${searchBarVisible ? 'show' : 'hide'}`}>
        <input
          type='text'
          className='bg-grey w-full py-4 pl-6 pr-[12%] rounded-full md:w-auto text-dark-grey md:pl-12'
          placeholder='Search'
        />
        <IoIosSearch className='absolute text-2xl right-14 text-dark-grey top-1/2 -translate-y-1/2 md:left-4 md:pointer-events-none' />
      </div>

      <div className='flex items-center gap-5 ml-auto'>
        <button
          className='md:hidden bg-grey w-12 h-12 flex items-center justify-center rounded-full'
          onClick={() => setSearchBarVisible(!searchBarVisible)}>
          <IoIosSearch className='text-2xl text-dark-grey' />
        </button>
        <Link
          to='/editor'
          className='hidden hover:bg-grey md:flex gap-2 p-3 px-4 rounded-lg'>
          <FiEdit className='text-xl' />
          <p>Write</p>
        </Link>
        <Link to='/sign-in' className='btn-dark'>
          sign in
        </Link>
        <Link to='/sign-up' className='hidden md:block btn-light'>
          sign up
        </Link>
      </div>
    </nav>
  )
}
export default Navbar
