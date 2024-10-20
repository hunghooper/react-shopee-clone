import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Login() {
  const { } = useForm()
  return (
    <div className='bg-shopee_orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 bg-left bg-shopee-login bg-cover'>
          <div className='lg:col-start-4 lg:col-span-2'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Login</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              <div className='mt-2'>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              <button className='mt-2 w-full text-center bg-shopee_orange py-4 px-2 uppercase text-white hover:bg-shopee_orange/80 '>
                Login
              </button>
              <div className='flex items-center mt-8 justify-center'>
                <span className='text-gray-400'>Are you new to Shopee?</span>
                <Link className='text-red-400 ml-1' to={'/register'}>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
