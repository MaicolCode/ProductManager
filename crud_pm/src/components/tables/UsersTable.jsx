import { useProduct } from '../../hooks/useProduct'
import useSale from '../../hooks/useSale'
import useUser from '../../hooks/useUser'
import FilterIcon from '../../icons/Filter'
import ButtonDelete from '../ButtonDelete'
import ModalSale from '../modals/ModalSale'
import ModalUpdateSale from '../modals/ModalUpdateSale'

export default function UsersTable({ users }) {
  const { deleteUser } = useUser()

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
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
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
                <th>N°</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr key={key + 1} className='odd:bg-slate-100 text-center'>
                  <td>{key + 1}</td>

                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.type}</td>
                  <td className='flex justify-center items-center '>
                    {key + 1 !== 1 && (
                      <ButtonDelete
                        title={'Eliminar'}
                        color={'red'}
                        onDelete={deleteUser}
                        identifier={user.id}
                      />
                    )}
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
