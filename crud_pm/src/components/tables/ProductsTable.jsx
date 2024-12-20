import { useEffect } from 'react'
import { useProduct } from '../../hooks/useProduct'
import FilterIcon from '../../icons/Filter'
import ModalProduct from '../modals/ModalProduct'
import { useAuthUser } from '../../auth/AuthProvider'
import { useCategory } from '../../hooks/useCategory'
import PaginatedListProducts from '../paginate/PaginatedListProducts'

export default function ProductsTable({ products }) {
  const { filterProducts, fetchProducts, filterProductsByCategory } =
    useProduct()

  const { getUser } = useAuthUser()
  const { categories } = useCategory()
  console.log(categories)

  const user = getUser()

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    filterProducts(e.target.value)
  }

  const handleSearchByCategory = (e) => {
    filterProductsByCategory(e.target.value)
  }

  return (
    <div className='text-xs sm:text-sm h-[70%]'>
      <div className='flex justify-between gap-5 my-4'>
        <div className='flex gap-5 '>
          <section className='relative h-full'>
            <input
              type='search'
              name='search'
              id='search'
              placeholder='Filtrar por nombre'
              className='block w-[200px] sm:w-[220px] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 p-2 '
              onChange={handleSearch}
            />
            <label
              htmlFor='search'
              className='absolute top-0 end-0 z-0 p-2.5 bg-gray-300 rounded-md text-slate-700 font-medium w-10 h-[39px] flex justify-center items-center'
            >
              <FilterIcon />
            </label>
          </section>
          <section className='relative h-full '>
            <select
              name='sale'
              id='sale'
              onClick={handleSearchByCategory}
              className='block w-[200px] sm:w-[220px] rounded-md z-10 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 p-2 text-xs sm:text-sm'
            >
              <option value='All' selected>
                Todas las categorias
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <label
              htmlFor='sale'
              className='absolute top-0 end-0 z-0 p-2.5 bg-gray-300 rounded-md text-slate-700 font-medium w-10 h-[39px] flex justify-center items-center'
            >
              <FilterIcon />
            </label>
          </section>
        </div>
        {user.type === 'admin' && <ModalProduct />}
      </div>
      <PaginatedListProducts products={products} />
    </div>
  )
}
