import ProductsTable from './components/ProductsTable.jsx'
import useProduct from './hooks/useProduct.jsx'

export default function Products() {
  const { products, deleteProduct } = useProduct()

  return (
    <div>
      {products ? (
        <ProductsTable products={products} actionEvent={deleteProduct} />
      ) : (
        'loading...'
      )}
    </div>
  )
}
