import { useEffect, useState } from 'react'

export default function useSale() {
  const [sales, setSales] = useState(null)

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    const res = await fetch(`http://localhost:3000/sales`)
    const result = await res.json()
    setSales(result.sales)
  }

  const deleteSale = async (id) => {
    await fetch(`http://localhost:3000/sales/${id}`, {
      method: 'DELETE'
    })

    setSales(sales.filter((sale) => sale.id !== id))
  }

  const addSale = async (sale) => {
    await fetch(`http://localhost:3000/sales/add`, {
      method: 'POST',
      body: JSON.stringify(sale),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    fetchSales()
  }

  return { sales, deleteSale, addSale }
}
