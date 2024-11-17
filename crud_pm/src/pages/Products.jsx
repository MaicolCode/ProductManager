import Loader from '../components/loader/Loader.jsx'
import ProductsTable from '../components/ProductsTable.jsx'
import { useProduct } from '../hooks/useProduct.jsx'

export default function Products() {
  const { products } = useProduct()

  return (
    <div className='w-full p-4'>
      <h2 className='text-2xl font-semibold text-slate-700 my-6'>
        Listado de productos
      </h2>
      <hr className='border-slate-200 w-full mb-2' />
      {products ? <ProductsTable products={products} /> : <Loader />}
    </div>
  )
}
