import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string,
  confirm_password: string
  password: string
}

export default function Register() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>()

  const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-shopee_orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 bg-left bg-shopee-login bg-cover'>
          <div className='lg:col-start-4 lg:col-span-2'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Register</div>
              <div className='mt-8'>
                <input
                  type='email'
                  autoComplete='on'
                  {...register('email', rules.email)}
                  placeholder='Email'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.email?.message}</div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                  placeholder='Password'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.password?.message}</div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  {...register('confirm_password', { ...rules.confirm_password })}
                  placeholder='Confirm password'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.confirm_password?.message}</div>
              <button type='submit' className='mt-3 w-full text-center bg-shopee_orange py-4 px-2 uppercase text-white hover:bg-shopee_orange/80 '>
                Register
              </button>
              <div className='flex items-center mt-8 justify-center'>
                <span className='text-gray-400'>You already have an account?</span>
                <Link className='text-red-400 ml-1' to={'/login'}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
