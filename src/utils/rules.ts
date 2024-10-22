import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

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
      message: 'Password must in range 6-160 words'
    },
    minLength: {
      value: 6,
      message: 'Password must in range 6-160 words'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    maxLength: {
      value: 160,
      message: 'Confirm password must in range 6-160 words'
    },
    minLength: {
      value: 6,
      message: 'Confirm password must in range 6-160 words'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value == getValues('password') || 'Confirm password does not match'
        : undefined
  }
})

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .email('Email is not in valid format')
      .max(160, 'Email must in range 5-160 words')
      .min(5, 'Email must in range 5-160 words'),
    password: yup
      .string()
      .required()
      .max(160, 'Password must in range 6-160 words')
      .min(6, 'Password must in range 6-160 words'),
    confirm_password: yup
      .string()
      .required('Confirm password is required')
      .max(160, 'Password must in range 6-160 words')
      .min(6, 'Password must in range 6-160 words')
      .oneOf([yup.ref('password')], 'Confirm password does not match')
  })
  .required()

export type Schema = yup.InferType<typeof schema>
