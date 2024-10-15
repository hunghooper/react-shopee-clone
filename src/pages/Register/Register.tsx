import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-shopee_orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='gird grid-cols-1 lg:grid-cols-4 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-start-3 lg:col-span-2'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Register</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='confirm_password'
                  placeholder='Confirm password'
                  className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                />
              </div>
              <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              <button className='mt-3 w-full text-center bg-shopee_orange py-4 px-2 uppercase text-white hover:bg-shopee_orange/80 '>
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
