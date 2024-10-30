import { useEffect, useState } from 'react'

function GetData(id) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`)
        const result = await res.json()
        setData(result.product)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  return data
}

export default function SalesTable({ data }) {
  console.log(data)

  return (
    <table className='table-auto border-collapse border border-black'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{GetData(item.product_id)?.name}</td>
            <td>{GetData(item.product_id)?.price}</td>
            <td>{item.quantity_sold}</td>
            <td>
              {(item.quantity_sold * GetData(item.product_id)?.price).toFixed(
                2
              )}
            </td>
            <td>{item.date_sale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
