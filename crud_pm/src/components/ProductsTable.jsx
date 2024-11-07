import ButtonDelete from './ButtonDelete'
import ModalProduct from './modals/ModalProduct'
import ModalProductUpdate from './modals/ModalUpdateProduct'

export default function ProductsTable({ products, actionEvents }) {
  console.log(products)

  function handleEdit() {
    console.log('hola')
  }

  return (
    <div className='text-sm'>
      <ModalProduct addProduct={actionEvents.addProduct} />
      <table
        className='md:w-[1000px] sm:w-[695px] border-collapse border border-black'
        cellPadding={10}
      >
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
                  onDelete={actionEvents.deleteProduct}
                  identifier={item.id}
                />
                <ModalProductUpdate
                  product={item}
                  updateProduct={actionEvents.updateProduct}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
