import Loader from '../components/loader/Loader'
import UsersTable from '../components/tables/UsersTable'
import useUser from '../hooks/useUser'

export default function Users() {
  const { users } = useUser()
  return (
    <div className='w-full h-full sm:p-4'>
      <h2 className='text-2xl font-semibold text-slate-700 my-6'>
        Listado de Usuarios
      </h2>
      <hr className='border-slate-200 w-full mb-2' />
      <div className='w-full h-[90%]'>
        {users ? <UsersTable users={users} /> : <Loader />}
      </div>
    </div>
  )
}
