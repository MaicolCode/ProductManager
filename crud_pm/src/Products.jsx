import { useState } from 'react'
import { useEffect } from 'react'

export default function Products() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  console.log(products)

  return <div>{products ? JSON.stringify(products) : 'loading...'}</div>
}
