import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from 'src/components/Input'
import { getRules, schema, Schema } from 'src/utils/rules'
import authApi from 'src/apis/auth.apis'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'
import path from 'src/constants/path'
import Button from 'src/components/Button/Button'

type FormData = Schema

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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
      <div className='container '>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 bg-left bg-shopee-login bg-cover '>
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
              <Button
                className='mt-3 w-full bg-shopee_orange py-4 px-2 uppercase text-white hover:bg-shopee_orange/80 flex justify-center items-center'
                disabled={registerAccountMutation.isPending}
                isLoading={registerAccountMutation.isPending}
              >
                Register
              </Button>
              <div className='flex items-center mt-8 justify-center'>
                <span className='text-gray-400'>You already have an account?</span>
                <Link className='text-red-400 ml-1' to={path.login}>
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
