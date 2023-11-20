import { ChangeEvent, FocusEvent } from 'react'
import { IconType } from 'react-icons'

interface InputProps {
  name: string
  type?: 'text' | 'email' | 'password'
  onChange: (e: ChangeEvent) => void
  onBlur: (e: FocusEvent) => void
  value: string
  icon: IconType
  placeholder: string
  error?: string
}

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  onChange,
  onBlur,
  value,
  icon: Icon,
  placeholder,
  error,
}) => {
  return (
    <div className='mb-5'>
      <div className='relative'>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className='w-full rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black'
        />
        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-dark-grey' />
      </div>
      {error && <p className='text-base relative text-red mt-2'>{error}</p>}
    </div>
  )
}
export default Input
