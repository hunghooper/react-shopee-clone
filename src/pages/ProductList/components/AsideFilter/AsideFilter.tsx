import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from '../../../../components/Button/Button'
import path from '../../../../constants/path'
import { Category } from '../../../../types/category.type'
import classNames from 'classnames'
import InputNumber from '../../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from '../../../../types/utils.type'
import { omit } from 'lodash'
import RatingStar from '../RatingStar'

type QueryConfig = {
  page?: string | undefined
  limit?: string | undefined
  sort_by?: string | undefined
  order?: string | undefined
  exclude?: string | undefined
  rating_filter?: string | undefined
  price_max?: string | undefined
  price_min?: string | undefined
  name?: string | undefined
  category?: string | undefined
}

interface Props {
  categoriesData: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ categoriesData, queryConfig }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_max', 'price_min', 'rating_filter', 'category']
        )
      ).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-semibold', { 'text-shopee_orange': !category })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 fill-current mr-3'>
          <g fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        All Categories
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categoriesData.map((categoryItem) => {
          const isActive = categoryItem._id === category
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', { 'font-semibold text-shopee_orange': isActive })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2 fill-shopee_orange absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center mt-4 uppercase font-bold'>
        <svg
          enable-background='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='w-3 h-4 fill-current mr-3 stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-miterlimit='10'
            ></polyline>
          </g>
        </svg>
        Search Filter
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Price Range</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ MIN'
                  classNameInput='p-1 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='mt-2 mx-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ MAX'
                  classNameInput='p-1 w-full outline-none border border-gray-200 focus:border-gray-300 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1rem] text-sm flex justify-center'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 bg-shopee_orange text-white uppercase text-sm  hover:bg-shopee_orange/80 flex justify-center items-center rounded-sm'>
            APPLY
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Rating</div>
        <RatingStar queryConfig={queryConfig} />
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        onClick={handleRemoveAll}
        className='w-full p-2 bg-shopee_orange text-white uppercase text-sm  hover:bg-shopee_orange/80 flex justify-center items-center rounded-sm'
      >
        Clear All
      </Button>
    </div>
  )
}
