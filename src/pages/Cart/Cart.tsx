import { useMutation, useQuery } from '@tanstack/react-query'
import { purchasesStatus } from '../../constants/purchase'
import purchaseApi from '../../apis/purchase.api'
import { Link, useLocation } from 'react-router-dom'
import { formatCurrency, generateNameId } from '../../utils/utils'
import path from '../../constants/path'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button/Button'
import { Purchase } from '../../types/purchase.type'
import { useContext, useEffect, useMemo } from 'react'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import notFoundProductIMG from '../../assets/img/not-found-product.png'
import { AppContext } from '../../contexts/app.context'




export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchaseData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const location = useLocation()
  const purchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId

  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const purchaseInCart = purchaseData?.data.data
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedNumber = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(() => checkedPurchases.reduce((total, purchase) => total + purchase.product.price * purchase.buy_count, 0), [checkedPurchases])
  const totalCheckedPurchaseSaving = useMemo(() => checkedPurchases.reduce((total, purchase) => total + (purchase.product.price_before_discount - purchase.product.price) * purchase.buy_count, 0), [checkedPurchases])

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch(),
        toast.success(data.data.message)
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      refetch(),
        toast.success(data.data.message)
    }
  })

  useEffect(() => {
    setExtendedPurchases(prev => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchaseInCart?.map((purchase) => {
          const isPurchaseIdFromLocation = purchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            checked: isPurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked),
            disabled: false
          }
        }) || []
      )
    }
    )
  }, [purchaseInCart, purchaseIdFromLocation])

  useEffect(() => {
    history.replaceState(null, '')
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(produce((draft) => {
      draft[purchaseIndex].checked = event.target.checked
    })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases(prev => prev.map(purchase => ({
      ...purchase,
      checked: !isAllChecked
    })
    ))
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(prev => prev.map(purchase => ({
        ...purchase,
        disabled: true
      })
      ))
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeChange = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(produce((draft) => {
      draft[purchaseIndex].buy_count = value
    })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteMultiplePurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const purchases = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(purchases)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {
          extendedPurchases.length > 0 ? (
            <>
              <div className='overflow-auto'>
                <div className='min-w-[1000px]'>
                  <div className='grid grid-cols-12 rounded-sm py-5 px-9 text-sm capitalize bg-white text-gray-500 shadow'>
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input type='checkbox' className='w-5 h-5 accent-shopee_orange' checked={isAllChecked} onChange={handleCheckAll} />
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
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='grid grid-cols-12 items-center py-5 px-4 mb-5 first:mt-0 text-center text-sm text-gray-500 rounded-sm border bg-white border-gray-200'
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
                                    className='line-clamp-2 text-left hover:text-shopee_orange'
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
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeChange(index)}
                                onFocusOut={(value) => handleQuantity(index, value, value <= purchase.product.quantity && value >= 1 && value !== (purchaseInCart as Purchase[])[index].buy_count)}
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-shopee_orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button className='bg-none text-black transition-colors hover:text-shopee_orange' onClick={handleDelete(index)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    }
                  </div>
                </div>
              </div>
              <div className='sticky bottom-0 z-10 flex rounded-sm border border-gray-100 bg-white p-5 shadow mt-8 flex-col md:flex-row sm:items-center'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='w-5 h-5 accent-shopee_orange' checked={isAllChecked} onChange={handleCheckAll} />
                  </div>
                  <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>Select All ({extendedPurchases.length})</button>
                  <button className='mx-3 border-none bg-none' onClick={handleDeleteMultiplePurchases}>Remove</button>
                </div>
                <div className='sm:ml-auto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
                  <div>
                    <div className='flex items-center sm:justify-end'>
                      <div className='text-gray-500'>Total ({checkedNumber} item):</div>
                      <div className='text-shopee_orange text-2xl ml-2'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                    </div>
                    <div className='flex items-center sm:justify-end text-sm'>
                      <div className='text-gray-500 text-sm'>Saving</div>
                      <div className='text-shopee_orange text-sm ml-6'>₫{formatCurrency(totalCheckedPurchaseSaving)}</div>
                    </div>
                  </div>
                  <Button onClick={handleBuyPurchases} className='h-10 w-52 sm:ml-4 mt-5 flex items-center justify-center text-sm uppercase bg-shopee_orange text-white hover:bg-shopee_orange/75 sm:mt-0'>
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className='my-3 bg-neutral-100 rounded-sm p-5'>
              <div className="items-center flex flex-col">
                <img src={notFoundProductIMG} alt='no-found-product' className='px-10 pt-5 w-auto h-[240px]' />
                <div className='text-center'>
                  <div className='text-lg text-gray-400 font-bold mb-5'>Your cart is empty</div>
                  <Link to={path.home} className='text-white text-xl bg-shopee_orange uppercase px-6 py-2 rounded-sm hover:bg-shopee_orange/75'>Go shopping</Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
