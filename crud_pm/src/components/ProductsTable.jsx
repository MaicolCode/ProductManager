import Button from './Button'

export default function ProductsTable({ products, actionEvent }) {
  console.log(products)

  function handleDelete() {
    console.log('hola')
  }

  function handleEdit() {
    console.log('hola')
  }

  return (
    <table className='table-auto border-collapse border border-black'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.date}</td>
            <td className='flex justify-end items-center gap-2 px-3 py-2'>
              <Button
                title={'Eliminar'}
                color={'red'}
                onDelete={actionEvent}
                identifier={item.id}
              />
              <Button title={'Editar'} color={'green'} action={handleEdit} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
