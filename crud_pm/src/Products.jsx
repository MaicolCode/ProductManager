import { useState } from 'react'
import { useEffect } from 'react'
import ProductsTable from './components/ProductsTable.jsx'

export default function Products() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [])

  console.log(products)

  return (
    <div>{products ? <ProductsTable data={products} /> : 'loading...'}</div>
  )
}
