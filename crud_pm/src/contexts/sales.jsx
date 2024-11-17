import { createContext, useEffect, useState } from 'react'

export const SalesContext = createContext()

export default function SalesProvider({ children }) {
  const [sales, setSales] = useState(null) // Para detectar un estado global
  const [filter, setFilter] = useState([])

  useEffect(() => {
    fetchSales()
  }, [])

  const filterSales = (searchTerm) => {
    const filteredSales = sales.filter((sale) =>
      sale.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilter(filteredSales)
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

  const updateSale = async (id, sale) => {
    await fetch(`http://localhost:3000/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sale),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    fetchSales()
  }

  const deleteSale = async (id) => {
    await fetch(`http://localhost:3000/sales/${id}`, {
      method: 'DELETE'
    })

    setSales(sales.filter((sale) => sale.id !== id))
  }

  async function fetchSales() {
    const res = await fetch(`http://localhost:3000/sales`)
    const result = await res.json()
    setSales(result.sales)
    setFilter(result.sales)
  }

  return (
    <SalesContext.Provider
      value={{
        sales,
        addSale,
        updateSale,
        deleteSale,
        filterSales
      }}
    >
      {children}
    </SalesContext.Provider>
  )
}