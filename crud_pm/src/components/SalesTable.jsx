import ButtonDelete from './ButtonDelete'
import ModalSale from './modals/ModalSale'
import ModalUpdateSale from './modals/ModalUpdateSale'

export default function SalesTable({ products, sales, actionEvents }) {
  const handleEdit = () => {
    console.log('hola')
  }

  return (
    <div>
      <ModalSale addSale={actionEvents.addSale} />
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

              <td>{products?.find((p) => p.id === item.product_id).name}</td>
              <td>{products?.find((p) => p.id === item.product_id).price}</td>
              <td>{item.quantity_sold}</td>
              <td>
                {(
                  item.quantity_sold *
                  products?.find((p) => p.id === item.product_id).price
                ).toFixed(2)}
              </td>
              <td>{item.date_sale}</td>
              <td className='flex justify-end items-center gap-2 px-3 py-2'>
                <ButtonDelete
                  title={'Eliminar'}
                  color={'red'}
                  onDelete={actionEvents.deleteSale}
                  identifier={item.id}
                />
                <ModalUpdateSale
                  sale={{
                    ...item,
                    product: products?.find((p) => p.id === item.product_id)
                      .name
                  }}
                  updateSale={actionEvents.updateSale}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
