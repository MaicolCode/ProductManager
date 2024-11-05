import { useState } from 'react'
import CloseIcon from '../../icons/close'

export default function ModalProduct() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <button
        className='bg-slate-500 py-2 px-5 rounded-sm text-white font-medium my-5'
        onClick={handleOpen}
      >
        Modal
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
              Ingreso de Productos al sistema.
            </h1>
            <form className='w-full flex flex-col gap-4 text-sm'>
              <label className='text-gray-700'>Producto a ingresar:</label>
              <input
                type='text'
                className='w-full border border-slate-400 border-opacity-40 rounded-lg px-2 py-2'
              />
              <label className='text-gray-700'>Valor del producto:</label>
              <input
                type='text'
                className='w-full border border-slate-400 border-opacity-40 rounded-lg px-2 py-2'
              />
              <label className='text-gray-700'>Cantidad comprada:</label>
              <input
                type='number'
                step={1}
                min={0}
                className='border border-slate-400 border-opacity-40 rounded-lg p-2'
              />

              <button className='bg-blue-500 py-2 px-5 rounded-lg text-white font-medium'>
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}