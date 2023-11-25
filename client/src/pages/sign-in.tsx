import Input from '@/components/globals/Input'
import AnimationWrapper from '@/components/globals/animation-wrapper'
import { useAuth } from '@/hook/use-auth'
import { api } from '@/services/api'
import { useFormik } from 'formik'
import { FiLock, FiAtSign } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters.'),
})

const SignIn = () => {
  const { setUser } = useAuth()
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const {
          data: { user },
        } = await api.post('/auth/login', values)
        const response = {
          id: user._id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          profilePicture: user.profile_img,
        }
        localStorage.setItem('auth-user', JSON.stringify(response))
        setUser(response)
      } catch (error: any) {
        if (error.response) toast.error(error.response.data.message)
      }
    },
    validationSchema: formSchema,
  })
  return (
    <AnimationWrapper>
      <section className='h-cover flex center items-center justify-center'>
        <form onSubmit={form.handleSubmit} className='w-[80%] max-w-[400px]'>
          <h1 className='font-gelasio text-center capitalize text-5xl mb-24'>
            Welcome back
          </h1>
          <Input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.email}
            icon={FiAtSign}
            name='email'
            placeholder='Email'
            error={form.errors.email}
          />
          <Input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.password}
            icon={FiLock}
            type='password'
            name='password'
            placeholder='Password'
            error={form.errors.password}
          />

          <button type='submit' className='btn-dark mt-5 w-full mb-5'>
            Sign In
          </button>

          <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
            <hr className='border-black w-1/2' />
            <p className='px-4'>OR</p>
            <hr className='border-black w-1/2' />
          </div>

          <p className='mt-6 text-dark-grey text-xl text-center'>
            Already a member?
            <Link to='/sign-up' className='underline text-black text-xl ml-1'>
              Join us today
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  )
}
export default SignIn
