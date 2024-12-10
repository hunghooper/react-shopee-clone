import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import productApi from 'src/apis/product.apis'
import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [currentIndexImages, setCurrentIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)

  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProduct(id as string)
  })
  const product = productDetailData?.data.data
  const queryConfig: ProductListConfig = { page: '1', limit: '20', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  const currentImage = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement
    const rect = event.currentTarget.getBoundingClientRect()
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalHeight / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    const image = imageRef.current as HTMLImageElement
    image.removeAttribute('style')
  }
  if (!product) return null
  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow rounded-sm'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] overflow-hidden'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover pointer-events-none'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute bg-black/20 left-0 z-10 top-1/2 h-9 w-5 -translate-y-1/2 text-white'
                  onClick={prev}
                >
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
                {currentImage.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseMove={() => chooseActiveImage(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 bg-white w-full cursor-pointer h-full object-cover'
                      />
                      {isActive && <div className='absolute border-shopee_orange inset-0 border-2 ' />}
                    </div>
                  )
                })}
                <button
                  className='absolute bg-black/20 right-0 z-10 top-1/2 h-9 w-5 -translate-y-1/2 text-white'
                  onClick={next}
                >
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
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
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
