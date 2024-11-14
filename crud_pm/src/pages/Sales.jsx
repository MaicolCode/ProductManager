import useSale from '../hooks/useSale'
import SalesTable from '../components/SalesTable'
import useProduct from '../hooks/useProduct'
import Loader from '../components/loader/Loader'

export default function Sales() {
  const { sales, deleteSale, addSale, updateSale } = useSale()
  const { products } = useProduct()

  return (
    <div>
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
