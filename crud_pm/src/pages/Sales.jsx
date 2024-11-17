import useSale from '../hooks/useSale'
import SalesTable from '../components/SalesTable'
import Loader from '../components/loader/Loader'
import { useProduct } from '../hooks/useProduct'

export default function Sales() {
  const { sales } = useSale()
  const { fetchProducts } = useProduct()
  fetchProducts()

  return (
    <div className='w-full p-4'>
      <h2 className='text-2xl font-semibold text-slate-700 my-6'>
        Listado de ventas
      </h2>
      <hr className='border-slate-200 w-full mb-2' />
      {sales ? <SalesTable sales={sales} /> : <Loader />}
    </div>
  )
}
