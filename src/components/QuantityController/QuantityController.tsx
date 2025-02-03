import InputNumber, { InputNumberProps } from "../InputNumber";

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({ max = 10, onIncrease, onDecrease, onType, classNameWrapper = 'ml-10', value, ...rest }: QuantityControllerProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (_value > max && max != undefined) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (_value > max && max != undefined) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className={'flex items-center' + classNameWrapper}>
      <button className='flex h-8 w-8 items-center justify-center text-gray-600 rounded-l-sm border-l-gray-300 border-y-gray-300 border' onClick={decrease}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        value={value}
        classNameInput='flex w-14 h-8 border border-y-gray-300 items-center justify-center text-center outline-none'
        classNameError='hidden'
        onChange={handleChange}
        {...rest}
      />
      <button className=' flex h-8 w-8 items-center justify-center text-gray-600 rounded-r-sm border-r-gray-300 border-y-gray-300 border' onClick={increase}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
