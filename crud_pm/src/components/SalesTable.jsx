import SearchIcon from '../icons/Search'
import ButtonDelete from './ButtonDelete'
import ModalSale from './modals/ModalSale'
import ModalUpdateSale from './modals/ModalUpdateSale'

export default function SalesTable({ products, sales, actionEvents }) {
  const handleEdit = () => {
    console.log('hola')
  }

  return (
    <div className='text-sm'>
      <div className='flex justify-between gap-5 my-4'>
        <section className='relative h-full'>
          <input
            type='search'
            placeholder='Buscar producto'
            className='block w-[220px] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 p-2 text-sm'
          />
          <button className='absolute top-0 end-0 p-2.5 bg-gray-300 rounded-md text-slate-700 font-medium w-10 h-full flex justify-center items-center'>
            <SearchIcon />
          </button>
        </section>
        <ModalSale addProduct={actionEvents.addSale} />
      </div>
      <div className='shadow-[0_3px_7px_1px_rgba(0,0,0,0.1)] rounded-lg pb-4 flex gap-5'>
        <table className=' w-[100%] table-auto' cellPadding={10}>
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
              <tr key={item.id} className='odd:bg-slate-100'>
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
    </div>
  )
}
