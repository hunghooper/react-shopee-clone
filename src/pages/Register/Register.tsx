import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from 'src/components/input'
import { getRules, schema, Schema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.apis'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Sever'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Sever'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Sever'
          //   })
          // }
        }
      }
    })
  })
  return (
    <div className='bg-shopee_orange'>
      <div className='container '>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 bg-left bg-shopee-login bg-cover max-h-[600px] align-middle '>
          <div className='lg:col-start-4 lg:col-span-2'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Register</div>
              <Input
                className='mt-8'
                type='email'
                name='email'
                autoComplete='on'
                register={register}
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                className='mt-2'
                type='password'
                name='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Password'
              />
              <Input
                className='mt-2'
                type='password'
                name='confirm_password'
                autoComplete='on'
                register={register}
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm password'
              />
              <button
                type='submit'
                className='mt-3 w-full text-center bg-shopee_orange py-4 px-2 uppercase text-white hover:bg-shopee_orange/80 '
              >
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
