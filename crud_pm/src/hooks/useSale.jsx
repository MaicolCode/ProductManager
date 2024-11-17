import { useContext } from 'react'
import { SalesContext } from '../contexts/sales'

export default function useSale() {
  const { sales, addSale, updateSale, deleteSale } = useContext(SalesContext)

  return { sales, deleteSale, addSale, updateSale }
}
