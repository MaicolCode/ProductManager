import useSale from '../hooks/useSale'
import SalesTable from '../components/SalesTable'
import useProduct from '../hooks/useProduct'
import Loader from '../components/loader/Loader'

export default function Sales() {
  const { sales, deleteSale, addSale, updateSale } = useSale()
  const { products } = useProduct()

  return (
    <div className='w-full p-4'>
      <h2 className='text-2xl font-semibold text-slate-700 my-6'>
        Listado de ventas
      </h2>
      <hr className='border-slate-200 w-full mb-2' />
      {sales ? (
        <SalesTable
          products={products}
          sales={sales}
          actionEvents={{ deleteSale, addSale, updateSale }}
        />
      ) : (
        <Loader />
      )}
    </div>
  )
}
