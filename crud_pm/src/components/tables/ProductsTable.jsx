import { useEffect } from 'react'
import { useProduct } from '../../hooks/useProduct'
import FilterIcon from '../../icons/Filter'
import ButtonDelete from '../ButtonDelete'
import ModalProduct from '../modals/ModalProduct'
import ModalProductUpdate from '../modals/ModalUpdateProduct'
import { useAuthUser } from '../../auth/AuthProvider'

export default function ProductsTable({ products }) {
  const { deleteProduct, filterProducts, fetchProducts } = useProduct()

  const { getUser } = useAuthUser()
  const user = getUser()

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    filterProducts(e.target.value)
  }

  return (
    <div className='text-xs sm:text-sm h-[70%]'>
      <div className='flex justify-between gap-5 my-4'>
        <section className='relative h-full'>
          <input
            type='search'
            name='search'
            id='search'
            placeholder='Filtrar productos'
            className='block w-[200px] sm:w-[220px] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 p-2 '
            onChange={handleSearch}
          />
          <label
            htmlFor='search'
            className='absolute top-0 end-0 z-0 p-2.5 bg-gray-300 rounded-md text-slate-700 font-medium w-10 h-full flex justify-center items-center'
          >
            <FilterIcon />
          </label>
        </section>
        {user.type === 'admin' && <ModalProduct />}
      </div>
      <div className='w-full h-[100%] shadow-[0_3px_7px_1px_rgba(0,0,0,0.1)] overflow-y-scroll sm:overflow-auto rounded-lg pb-4 flex gap-5'>
        <div className='w-full'>
          <table className='overflow-y-scroll w-full' cellPadding={10}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                {user.type === 'admin' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody className='text-center '>
              {products.map((item, key) => (
                <tr
                  key={key + 1}
                  className={`odd:bg-slate-100 ${
                    item.quantity === 0 ? 'text-red-500' : ''
                  }`}
                >
                  <td>{key + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{parseFloat(item.price).toFixed(2)}</td>

                  {user.type === 'admin' && (
                    <td className='flex justify-end items-center gap-2 px-3 py-2 text-slate-700'>
                      <ButtonDelete
                        title={'Eliminar'}
                        color={'red'}
                        onDelete={deleteProduct}
                        identifier={item.id}
                      />
                      <ModalProductUpdate product={item} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
