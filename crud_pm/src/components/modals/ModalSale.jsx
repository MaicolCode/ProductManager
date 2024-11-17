import { useState } from 'react'
import { useProduct } from '../../hooks/useProduct'
import CloseIcon from '../../icons/close'
import useSale from '../../hooks/useSale'

export default function ModalSale() {
  const [isOpen, setIsOpen] = useState(false)
  const { addSale } = useSale()

  const { products } = useProduct()

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const newSale = {
      productID: data.get('productID'),
      quantity: data.get('quantity')
    }

    addSale(newSale)
    handleClose()
  }

  return (
    <>
      <button
        className='bg-gray-200 py-3 px-5 rounded-md text-slate-700 font-medium'
        onClick={handleOpen}
      >
        Agregar Nuevo
      </button>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
          <div className='w-[450px] relative bg-white px-5 pt-2 pb-5 rounded flex flex-col justify-center items-center gap-5 '>
            <div className='w-full h-2'>
              <button
                className='text-slate-700 absolute right-5 rounded-sm p-1'
                onClick={handleClose}
              >
                <CloseIcon />
              </button>
            </div>
            <h1 className='w-full font-semibold text-center mb-3 text-slate-600'>
              Ingreso de venta al sistema.
            </h1>
            <form
              className='w-full flex flex-col gap-4 text-sm'
              onSubmit={handleSubmit}
            >
              <label className='text-gray-700'>Seleccionar producto:</label>
              <select
                name='productID'
                className='border border-slate-400 border-opacity-40 rounded-lg p-2'
              >
                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label className='text-gray-700'>Cantidad a vender:</label>
              <input
                type='number'
                step={1}
                min={0}
                name='quantity'
                className='border border-slate-400 border-opacity-40 rounded-lg p-2'
              />

              <button
                className='bg-blue-500 py-2 px-5 mt-5 rounded-lg text-white font-medium'
                type='submit'
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
