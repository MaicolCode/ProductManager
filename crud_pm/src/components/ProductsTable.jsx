import { useProduct } from '../hooks/useProduct'
import SearchIcon from '../icons/Search'
import ButtonDelete from './ButtonDelete'
import ModalProduct from './modals/ModalProduct'
import ModalProductUpdate from './modals/ModalUpdateProduct'

export default function ProductsTable({ products }) {
  const { deleteProduct, filterProducts } = useProduct()

  const handleSearch = (e) => {
    filterProducts(e.target.value)
  }

  return (
    <div className='text-sm'>
      <div className='flex justify-between gap-5 my-4'>
        <section className='relative h-full'>
          <input
            type='search'
            placeholder='Buscar producto'
            className='block w-[220px] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 p-2 text-sm'
            onChange={handleSearch}
          />
          <button className='absolute top-0 end-0 p-2.5 bg-gray-300 rounded-md text-slate-700 font-medium w-10 h-full flex justify-center items-center'>
            <SearchIcon />
          </button>
        </section>
        <ModalProduct />
      </div>
      <div className='shadow-[0_3px_7px_1px_rgba(0,0,0,0.1)] rounded-lg pb-4 flex gap-5'>
        <table className='w-[100%]' cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-center '>
            {products.map((item) => (
              <tr key={item.id} className='odd:bg-slate-100'>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>

                <td className='flex justify-end items-center gap-2 px-3 py-2'>
                  <ButtonDelete
                    title={'Eliminar'}
                    color={'red'}
                    onDelete={deleteProduct}
                    identifier={item.id}
                  />
                  <ModalProductUpdate product={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
