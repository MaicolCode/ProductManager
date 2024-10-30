import { useEffect, useState } from 'react'
import SalesTable from './components/SalesTable'

export default function Sales() {
  const [sales, setSales] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/sales')
      .then((res) => res.json())
      .then((data) => setSales(data.sales))
  }, [])

  return <div>{sales ? <SalesTable data={sales} /> : 'loading...'}</div>
}
