import { useContext } from 'react'
import { ProductContext } from '../contexts/product.jsx'

export function useProduct() {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } =
    useContext(ProductContext)

  return { products, addProduct, updateProduct, deleteProduct, fetchProducts }
}
