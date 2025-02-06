import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from '../../constants/path'

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
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Pagination({ pageSize, queryConfig }: Props) {
  const currentPage = Number(queryConfig.page)
  const renderPagination = () => {
    let frontEllipsis = false
    let backEllipsis = false

    const renderFrontEllipsis = (index: number) => {
      if (!frontEllipsis) {
        frontEllipsis = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border' key={index}>
            {' '}
            ...
          </span>
        )
      }
    }

    const renderBackEllipsis = (index: number) => {
      if (!backEllipsis) {
        backEllipsis = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border' key={index}>
            {' '}
            ...
          </span>
        )
      }
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderBackEllipsis(index)
        } else if (currentPage > RANGE * 2 + 1 && pageNumber < pageSize - RANGE + 1) {
          if (pageNumber > RANGE && pageNumber < currentPage - RANGE) {
            return renderFrontEllipsis(index)
          } else if (pageNumber < pageSize - RANGE + 1 && pageNumber > currentPage + 2) {
            return renderBackEllipsis(index)
          }
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-400': pageNumber === currentPage,
              'border-transparent': pageNumber != currentPage
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {currentPage === 1 ? (
        <span className='bg-slate-100 rounded px-3 py-2 shadow-sm mx-2 border cursor-not-allowed'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {currentPage === pageSize ? (
        <span className='bg-slate-100 rounded px-3 py-2 shadow-sm mx-2 border cursor-not-allowed'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
