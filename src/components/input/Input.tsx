import { RegisterOptions, UseFormRegister } from "react-hook-form"

type Props = {
  className?: string
  type: React.HTMLInputTypeAttribute
  name: string
  placeholder?: string
  errorMessage?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete: string
}
export default function Input({ className, name, placeholder, type, errorMessage, register, rules, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
        className='p-3 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errorMessage}</div>
    </div>

  )
}

