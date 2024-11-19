import { useProduct } from '../hooks/useProduct'
import useSale from '../hooks/useSale'
import FilterIcon from '../icons/Filter'
import ButtonDelete from './ButtonDelete'
import ModalSale from './modals/ModalSale'
import ModalUpdateSale from './modals/ModalUpdateSale'

export default function SalesTable({ sales }) {
  const { deleteSale, filterSales } = useSale()
  const { products } = useProduct()

  const handleSearch = (e) => {
    filterSales(e.target.value)
  }

  return (
    <div className='text-xs sm:text-sm h-[70%]'>
      <div className='flex justify-between gap-5 my-4'>
        <section className='relative h-full '>
          <select
            name='sale'
            id='sale'
            onClick={handleSearch}
            className='block w-[200px] sm:w-[220px] rounded-md z-10 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 p-2 text-xs sm:text-sm'
          >
            <option value='All'>Todas las ventas</option>
            {products.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label
            htmlFor='sale'
            className='absolute top-0 end-0 z-0 p-2.5 bg-gray-300 rounded-md text-slate-700 font-medium w-10 h-full flex justify-center items-center'
          >
            <FilterIcon />
          </label>
        </section>
        <ModalSale />
      </div>
      <div className='w-full h-[100%] shadow-[0_3px_7px_1px_rgba(0,0,0,0.1)] overflow-y-scroll sm:overflow-auto rounded-lg pb-4 flex gap-5'>
        <div className='w-full'>
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
              {sales.map((item, key) => (
                <tr key={key + 1} className='odd:bg-slate-100'>
                  <td>{key + 1}</td>

                  <td>
                    {products?.find((p) => p.id === item.product_id).name}
                  </td>
                  <td>
                    {products?.find((p) => p.id === item.product_id).price}
                  </td>
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
                      onDelete={deleteSale}
                      identifier={item.id}
                    />
                    <ModalUpdateSale
                      sale={{
                        ...item,
                        product: products?.find((p) => p.id === item.product_id)
                          .name
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
