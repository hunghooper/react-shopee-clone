import { useQuery } from "@tanstack/react-query";
import Product from "../../pages/ProductList/components/Product";
import productApi from "../../apis/product.apis";
import { ProductListConfig } from "../../types/product.type";

export default function RecommendProducts() {
  const queryConfig: ProductListConfig = { page: '1', limit: '20' }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  return (
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
  )
}
