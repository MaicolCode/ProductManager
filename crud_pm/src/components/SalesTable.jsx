import useProduct from '../hooks/useProduct'
import Button from './Button'
import ModalSale from './modals/ModalSale'

export default function SalesTable({ sales, actionEvent }) {
  const { products: product } = useProduct()
  const handleEdit = () => {
    console.log('hola')
  }

  return (
    <div>
      <ModalSale />
      <table className='table-auto border-collapse border border-black'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{product?.find((p) => p.id === item.product_id).name}</td>
              <td>{product?.find((p) => p.id === item.product_id).price}</td>
              <td>{item.quantity_sold}</td>
              <td>
                {(
                  item.quantity_sold *
                  product?.find((p) => p.id === item.product_id).price
                ).toFixed(2)}
              </td>
              <td>{item.date_sale}</td>
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
