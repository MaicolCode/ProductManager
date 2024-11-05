import { useEffect, useState } from 'react'

export default function useProduct() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch(`http://localhost:3000/products`)
    const result = await res.json()
    setProducts(result.products)
  }

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    })

    setProducts(products.filter((product) => product.id !== id))
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

  return { products, deleteProduct, addProduct, updateProduct }
}
