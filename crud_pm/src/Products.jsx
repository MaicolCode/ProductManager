import ProductsTable from './components/ProductsTable.jsx'
import useProduct from './hooks/useProduct.jsx'

export default function Products() {
  const { products, deleteProduct, addProduct } = useProduct()

  return (
    <div>
      {products ? (
        <ProductsTable
          products={products}
          actionEvents={{ deleteProduct, addProduct }}
        />
      ) : (
        'loading...'
      )}
    </div>
  )
}
