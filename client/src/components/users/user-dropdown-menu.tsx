import { useAuth } from '@/hook/use-auth'
import { FiEdit, FiUser, FiLayout, FiSettings } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

const UserDropdownMenu = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const handleSignOut = () => {
    setUser(null)
    navigate('/')
  }
  return (
    <div className='z-80 absolute top-[58px] right-0 border border-grey bg-white overflow-hidden w-60'>
      <Link
        to='/editor'
        className='flex items-center gap-2 md:hidden pl-8 py-4 link'>
        <FiEdit className='text-xl' />
        <p>Write</p>
      </Link>
      <Link
        to={`/user/${user?.username}`}
        className='flex gap-2 items-center pl-8 py-4 link'>
        <FiUser className='text-xl' />
        <p>Profile</p>
      </Link>
      <Link
        to='/dashboard/blogs'
        className='flex gap-2 items-center pl-8 py-4 link'>
        <FiLayout className='text-xl' />
        <p>Dashboard</p>
      </Link>
      <Link
        to='/settings/edit-profile'
        className='flex gap-2 items-center pl-8 py-4 link'>
        <FiSettings className='text-xl' />
        <p>Settings</p>
      </Link>

      <span className='border-t absolute w-full border-grey'></span>

      <button
        className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
        onClick={handleSignOut}>
        <h1 className='font-bold text-xl mb-1'>Sign Out</h1>
        <p className='text-dark-grey'>@{user?.username}</p>
      </button>
    </div>
  )
}

export default UserDropdownMenu
