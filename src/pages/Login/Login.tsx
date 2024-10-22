import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { omit } from 'lodash'

import { loginAccount } from 'src/apis/auth.apis'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import Input from 'src/components/input'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Sever'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-shopee_orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 bg-left bg-shopee-login bg-cover'>
          <div className='lg:col-start-4 lg:col-span-2'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Login</div>
              <Input className='mt-8' type='email' name='email' autoComplete='on' register={register} errorMessage={errors.email?.message} placeholder='Email' />
              <Input className='mt-2' type='password' name='password' autoComplete='on' register={register} errorMessage={errors.password?.message} placeholder='Password' />
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
