import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}
export default function Input({
  className,
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
  classNameInput = 'p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm',
  name,
  placeholder,
  type,
  errorMessage,
  register,
  rules,
  autoComplete
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
        className={classNameInput}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
