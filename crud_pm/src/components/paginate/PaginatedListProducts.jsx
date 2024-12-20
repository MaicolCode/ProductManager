import { useEffect, useState } from 'react'
import { useAuthUser } from '../../auth/AuthProvider'
import { useProduct } from '../../hooks/useProduct'
import ButtonDelete from '../ButtonDelete'
import ModalProductUpdate from '../modals/ModalUpdateProduct'

export default function PaginatedListProducts({ products }) {
  const { deleteProduct } = useProduct()
  const { getUser } = useAuthUser()

  const user = getUser()

  const data = products // Datos simulados
  const itemsPerPage = 8 // Elementos por página
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  // Cálculo de los elementos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = data.slice(startIndex, endIndex)

  // Cálculo del total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const buttonsToShow = 5 // Número máximo de botones visibles

  // Rango dinámico de botones
  const startPage = Math.max(currentPage - Math.floor(buttonsToShow / 2), 1)
  const endPage = Math.min(startPage + buttonsToShow - 1, totalPages)

  // Ajusta el rango al principio o al final si es necesario
  const adjustedStartPage = Math.max(1, endPage - buttonsToShow + 1)

  // Cambiar página
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <h1>Paginación en React</h1>
      <div className='w-full h-[500px] shadow-[0_3px_7px_1px_rgba(0,0,0,0.1)] overflow-y-scroll sm:overflow-auto rounded-lg pb-4 flex gap-5'>
        <div className='w-full'>
          <table className='overflow-y-scroll w-full' cellPadding={10}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                <th>Precio</th>
                {user.type === 'admin' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody className='text-center '>
              {currentItems.map((item, key) => (
                <tr
                  key={key + 1}
                  className={`odd:bg-slate-100 ${
                    item.quantity === 0 ? 'text-red-500' : ''
                  }`}
                >
                  <td>{key + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
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
      <div className='flex justify-center space-x-1 mt-4 text-xs'>
        {currentPage > 1 && totalPages > 5 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className='px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600'
          >
            Prev
          </button>
        )}
        {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(adjustedStartPage + i)}
            className={`px-3 py-1 rounded  ${
              adjustedStartPage + i === currentPage
                ? 'bg-sky-400 text-white'
                : 'bg-slate-500 text-white hover:bg-slate-400'
            }`}
          >
            {adjustedStartPage + i}
          </button>
        ))}
        {currentPage < totalPages && totalPages > 5 && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className='px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600'
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
