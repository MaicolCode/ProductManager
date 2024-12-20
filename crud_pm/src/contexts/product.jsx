import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const filterProducts = (searchTerm) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilter(filteredProducts)
  }

  const filterProductsByCategory = (searchTerm) => {
    if (searchTerm === 'All') {
      setFilter(products)
      return
    }

    const filteredProducts = products.filter(
      (product) => product.category === searchTerm
    )
    setFilter(filteredProducts)
  }

  const addProduct = async (product) => {
    await fetch(`http://localhost:3000/products/add`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    fetchProducts()
  }

  const updateProduct = async (id, product) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    fetchProducts()
  }

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    })

    setProducts(products.filter((product) => product.id !== id))
  }

  async function fetchProducts() {
    const res = await fetch(`http://localhost:3000/products`)
    const result = await res.json()
    setProducts(result.products)
    setFilter(result.products)
  }

  return (
    <ProductContext.Provider
      value={{
        products: filter,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
        filterProducts,
        filterProductsByCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
