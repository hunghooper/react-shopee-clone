import classNames from 'classnames'

interface Props {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  pageSize: number
}

const RANGE = 2
export default function Pagination({ pageSize, currentPage, setCurrentPage }: Props) {
  const renderPagination = () => {
    let frontEllipsis = false
    let backEllipsis = false

    const renderFrontEllipsis = (index: number) => {
      if (!frontEllipsis) {
        frontEllipsis = true
        return (
          <div className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border" key={index}> ...</div>
        )
      }
    }

    const renderBackEllipsis = (index: number) => {
      if (!backEllipsis) {
        backEllipsis = true
        return (
          <div className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border" key={index}> ...</div>
        )
      }
    }

    return Array(pageSize).fill(0).map((_, index) => {
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
        <div className={classNames("bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border", {
          'border-cyan-400': pageNumber === currentPage,
          'border-transparent': pageNumber != currentPage
        })} key={index} onClick={() => { setCurrentPage(pageNumber) }}> {pageNumber}</div >
      )
    })
  }
  return (
    <div className="flex flex-wrap mt-6 justify-center">
      <div className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border">Prev</div>
      {renderPagination()}
      <div className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border">Next</div>
    </div>
  )
}
