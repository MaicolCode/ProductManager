import useSale from './hooks/useSale'
import SalesTable from './components/SalesTable'

export default function Sales() {
  const { sales, deleteSale } = useSale()

  return (
    <div>
      {sales ? (
        <SalesTable sales={sales} actionEvent={deleteSale} />
      ) : (
        'loading...'
      )}
    </div>
  )
}
