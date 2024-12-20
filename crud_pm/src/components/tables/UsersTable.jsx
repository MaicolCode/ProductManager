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
      <div className='flex justify-end gap-5 my-4'>
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
