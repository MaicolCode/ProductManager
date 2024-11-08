import Products from './Products'
import Sales from './Sales'

function App() {
  return (
    <>
      <div className='border-2 border-black rounded-lg p-4 m-4'>
        <h1>Vista principal de la aplicación</h1>
        <h2>Productos</h2>
        <Products />
        <Sales />
      </div>
    </>
  )
}

export default App