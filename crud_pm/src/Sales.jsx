import { useEffect, useState } from 'react'

export default function Sales() {
  const [sales, setSales] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/sales')
      .then((res) => res.json())
      .then((data) => setSales(data))
  }, [])

  return <div>{sales ? JSON.stringify(sales) : 'loading...'}</div>
}
