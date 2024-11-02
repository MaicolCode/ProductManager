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

  return { products, deleteProduct }
}
