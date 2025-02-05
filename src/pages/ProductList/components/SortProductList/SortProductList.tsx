import { sortBy, order as orderConstants } from '../../../../constants/product'
import { ProductListConfig } from '../../../../types/product.type'
import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import { omit } from 'lodash'

type QueryConfig = {
  page?: string | undefined;
  limit?: string | undefined;
  sort_by?: string | undefined;
  order?: string | undefined;
  exclude?: string | undefined;
  rating_filter?: string | undefined;
  price_max?: string | undefined;
  price_min?: string | undefined;
  name?: string | undefined;
  category?: string | undefined;
}

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ pageSize, queryConfig }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const currentPage = Number(queryConfig.page)
  const navigate = useNavigate()

  const isSortByActive = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center gap-2 justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sort by</div>
          <button
            onClick={() => handleSortBy(sortBy.view)}
            className={classNames(
              'h-8 px-4 text-sm rounded-sm text-center capitalize',
              { 'bg-shopee_orange text-white hover:bg-shopee_orange/80': isSortByActive(sortBy.view) },
              { 'bg-white text-black hover:bg-slate-100': !isSortByActive(sortBy.view) }
            )}
          >
            Popular
          </button>
          <button
            onClick={() => handleSortBy(sortBy.createdAt)}
            className={classNames(
              'h-8 px-4 text-sm rounded-sm text-center capitalize',
              { 'bg-shopee_orange text-white hover:bg-shopee_orange/80': isSortByActive(sortBy.createdAt) },
              { 'bg-white text-black hover:bg-slate-100': !isSortByActive(sortBy.createdAt) }
            )}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortBy(sortBy.sold)}
            className={classNames(
              'h-8 px-4 text-sm rounded-sm text-center capitalize',
              { 'bg-shopee_orange text-white hover:bg-shopee_orange/80': isSortByActive(sortBy.sold) },
              { 'bg-white text-black hover:bg-slate-100': !isSortByActive(sortBy.sold) }
            )}
          >
            Top Sales
          </button>
          <select
            className={classNames(
              'h-8 px-4 text-sm rounded-sm text-left capitalize outline-none',
              { 'bg-shopee_orange text-white hover:bg-shopee_orange/80': isSortByActive(sortBy.price) },
              { 'bg-white text-black hover:bg-slate-100': !isSortByActive(sortBy.price) }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Price
            </option>
            <option value={orderConstants.asc} className='bg-white text-black'>
              Price: Low To High
            </option>
            <option value={orderConstants.desc} className='bg-white text-black'>
              Price: High To Low
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-shopee_orange'>{currentPage}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {currentPage === 1 ? (
              <span className='flex w-9 h-8 items-center justify-center bg-white/60 rounded-sm rounded-tl-sm rounded-bl-sm hover:bg-slate-100 cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage - 1).toString()
                  }).toString()
                }}
                className='flex w-9 h-8 items-center justify-center bg-white/60 rounded-sm rounded-tl-sm rounded-bl-sm hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {currentPage === pageSize ? (
              <span className='flex w-9 h-8 items-center justify-center bg-white/60 rounded-sm rounded-tl-sm rounded-bl-sm hover:bg-slate-100 cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage + 1).toString()
                  }).toString()
                }}
                className='flex w-9 h-8 items-center justify-center bg-white/60 rounded-sm rounded-tl-sm rounded-bl-sm hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
