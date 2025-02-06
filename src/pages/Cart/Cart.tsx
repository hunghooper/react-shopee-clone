import { useQuery } from '@tanstack/react-query'
import { purchasesStatus } from '../../constants/purchase'
import purchaseApi from '../../apis/purchase.api'
import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId } from '../../utils/utils'
import path from '../../constants/path'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button/Button'
import { Purchase } from '../../types/purchase.type'
import { useEffect, useState } from 'react'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchaseData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const purchaseInCart = purchaseData?.data.data

  useEffect(() => {
    setExtendedPurchases(
      purchaseInCart?.map((purchase) => ({
        ...purchase,
        checked: false,
        disabled: false
      })) || []
    )
  }, [purchaseInCart])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(produce((draft) => {
      draft[productIndex].checked = event.target.checked
    })
    )
  }

  const isCheckAll = extendedPurchases.every((purchase) => purchase.checked)

  const handleCheckAll = () => {
    setExtendedPurchases(prev => prev.map(purchase => ({
      ...purchase,
      checked: !isCheckAll
    })
    ))
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm py-5 px-9 text-sm capitalize bg-white text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='w-5 h-5 accent-shopee_orange' checked={isCheckAll} onChange={handleCheckAll} />
                  </div>
                  <div className='flex-grow text-black'>Product</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Unit Price</div>
                  <div className='col-span-1'>Quantity</div>
                  <div className='col-span-1'>Total Price</div>
                  <div className='col-span-1'>Actions</div>
                </div>
              </div>
            </div>
            <div className='my-3 bg-white rounded-sm p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='grid grid-cols-12 py-5 px-4 mb-5 first:mt-0 text-center text-sm text-gray-500 rounded-sm border bg-white border-gray-200'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='w-5 h-5 accent-shopee_orange' checked={purchase.checked} onChange={handleCheck(index)} />
                      </div>
                      <div className='flex flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            className='w-20 h-20 flex-shrink-0'
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} className='w-20 h-20' />
                          </Link>
                          <div className='flex-grow pt-1 px-2 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController max={purchase.product.quantity} value={purchase.buy_count} />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-shopee_orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-shopee_orange'>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex rounded-sm border border-gray-100 bg-white p-5 shadow mt-8 flex-col md:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='w-5 h-5 accent-shopee_orange' checked={isCheckAll} onChange={handleCheckAll} />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>Select All ({extendedPurchases.length})</button>
            <button className='mx-3 border-none bg-none'>Remove</button>
          </div>
          <div className='sm:ml-auto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div className='text-gray-500'>Total (0 item):</div>
                <div className='text-shopee_orange text-2xl ml-2'>₫{formatCurrency(1213215)}</div>
              </div>
              <div className='flex items-center sm:justify-end text-sm'>
                <div className='text-gray-500 text-sm'>Saving</div>
                <div className='text-shopee_orange text-sm ml-6'>₫{formatCurrency(1213215)}</div>
              </div>
            </div>
            <Button className='h-10 w-52 sm:ml-4 mt-5 flex items-center justify-center text-sm uppercase bg-shopee_orange text-white hover:bg-shopee_orange/75 sm:mt-0'>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
