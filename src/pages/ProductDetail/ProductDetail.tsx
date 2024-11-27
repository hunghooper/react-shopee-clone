import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import productApi from 'src/apis/product.apis'
import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import { ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProduct(id as string)
  })
  const product = productDetailData?.data.data
  const { data: productsData } = useQuery({
    queryKey: ['products', productDetailData?.data.data.category],
    queryFn: () => {
      return productApi.getProducts(productDetailData?.data.data.category as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  if (!product) return null
  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow rounded-sm'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%]'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute bg-black/20 left-0 z-10 top-1/2 h-9 w-5 -translate-y-1/2 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]' key={img}>
                      <img
                        src={product.images[index]}
                        alt={product.name}
                        className='absolute top-0 left-0 bg-white w-full cursor-pointer h-full object-cover'
                      />
                      {isActive && <div className='absolute border-shopee_orange inset-0 border-2 ' />}
                    </div>
                  )
                })}
                <button className='absolute bg-black/20 right-0 z-10 top-1/2 h-9 w-5 -translate-y-1/2 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='uppercase font-medium text-xl line-clamp-2'>{product.name}</h1>
              <div className='flex items-center mt-8'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-shopee_orange text-shopee_orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-shopee_orange text-shopee_orange w-4 h-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 w-4 h-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1 text-gray-500'>Sold</span>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-shopee_orange text-3xl font-medium'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-shopee_orange text-white uppercase font-semibold px-1 py-[2px] text-xs'>
                  {rateSale(product.price_before_discount, product.price)}% sale off
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <span className='text-gray-500 text-sm'>Quantity</span>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center text-gray-600 rounded-l-sm border-l-gray-300 border-y-gray-300 border'>
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
                    value={1}
                    classNameInput='flex w-14 h-8 border border-y-gray-300 items-center justify-center text-center outline-none'
                    classNameError='hidden'
                  />
                  <button className=' flex h-8 w-8 items-center justify-center text-gray-600 rounded-r-sm border-r-gray-300 border-y-gray-300 border'>
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
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} products</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex items-center justify-center text-shopee_orange border border-shopee_orange h-12 shadow-sm rounded-sm bg-shopee_orange/10 hover:bg-shopee_orange/5 px-10 capitalize'>
                  <img
                    alt='icon-add-to-cart'
                    className='w-5 h-5 mr-[10px]'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
                  />
                  Add to cart
                </button>
                <button className='ml-4 min-w-[5rem] outline-none text-white bg-shopee_orange capitalize h-12 shadow-sm rounded-sm hover:bg-shopee_orange/90 px-10'>
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white shadow rounded-sm p-4'>
          <div className='bg-gray-50 rounded p-4 text-lg capitalize text-slate-700'>Product Specifications</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 p-4'>
          <div className=' text-lg uppercase text-slate-700 py-4'>you may also like</div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3'>
            {productsData &&
              productsData?.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
