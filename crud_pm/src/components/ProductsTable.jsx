import Button from './Button'
import ModalProduct from './modals/ModalProduct'

export default function ProductsTable({ products, actionEvent }) {
  console.log(products)

  function handleEdit() {
    console.log('hola')
  }

  return (
    <div>
      <ModalProduct />
      <table className='table-auto border-collapse border border-black'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>

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
    </div>
  )
}
