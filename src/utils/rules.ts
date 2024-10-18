import { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Email is not in valid format'
    },
    maxLength: {
      value: 160,
      message: 'Email must in range 5-160 words'
    },
    minLength: {
      value: 5,
      message: 'Email must in range 5-160 words'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Password must in range 5-160 words'
    },
    minLength: {
      value: 5,
      message: 'Password must in range 5-160 words'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    maxLength: {
      value: 160,
      message: 'Confirm password must in range 5-160 words'
    },
    minLength: {
      value: 5,
      message: 'Confirm password must in range 5-160 words'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value == getValues('password') || 'Confirm password does not match'
        : undefined
  }
})
