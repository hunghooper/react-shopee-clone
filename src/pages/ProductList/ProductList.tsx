import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import useQueryParam from 'src/hooks/useQueryParam'
import productApi from 'src/apis/product.apis'
import Pagination from 'src/components/Pagination'
import { useState } from 'react'

export default function ProductList() {
  const queryParams = useQueryParam()
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })
  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data && data?.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={7} />
          </div>
        </div>
      </div>
    </div>
  )
}
