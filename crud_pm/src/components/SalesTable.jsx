function GetData(id) {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])
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
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.id_product}</td>
            <td>{item.quantity_sold}</td>
            <td>{item.date_sale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
