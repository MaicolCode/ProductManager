import {
  LineChart,
  lineElementClasses,
  markElementClasses
} from '@mui/x-charts/LineChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { useEffect, useState } from 'react'
import { useAuthUser } from '../auth/AuthProvider'
import { useProduct } from '../hooks/useProduct'
import useSale from '../hooks/useSale'

export default function Dashboard() {
  const { getUser } = useAuthUser()
  const user = getUser()

  return (
    <section className='h-auto sm:h-full w-full text-slate-800'>
      <h2 className='text-3xl font-bold text-slate-700 mt-6 sm:mt-0'>
        Dashboard de{' '}
        <span className='text-gray-500 bg-slate-100 p-1 rounded-lg'>
          {user.username}
        </span>
        .
      </h2>
      <h3 className='text-xl font-medium text-slate-400 text-start w-full mt-3'>
        Informe general de inventarios.
      </h3>
      <hr className='mt-3 w-full border-slate-200' />
      <div className='p-2 grid mt-5  grid-cols-1 sm:grid-cols-2 sm:row-span-3 gap-4 h-[73%] sm:h-auto overflow-y-scroll sm:overflow-hidden'>
        <SalesReport />
        <ProductsInStock />
        <BestSellers />
      </div>
    </section>
  )
}

function SalesReport() {
  const [report, setReport] = useState([])
  const filterSales = new Array(12).fill(0) // Arreglo que contendra la cantidad de ventas por mes

  useEffect(() => {
    const fetchSales = async () => {
      const response = await fetch(
        `http://localhost:3000/sales/report/byMonths`
      )
      const result = await response.json()
      setReport(result.result)
    }
    fetchSales()
  }, [])

  report.forEach((item) => {
    const date = item.month_sales - 1
    filterSales[date] += parseInt(item.quantity_sold)
  })

  return (
    <div className='p-3 h-[380px] sm:h-[430px] rounded-md shadow-[0_5px_10px_1px_rgba(0,0,0,0.10)] bg-gray-50 flex flex-col gap-2 justify-center items-center'>
      <span className='text-md font-medium text-slate-600 text-start w-full p-2'>
        Reporte de ventas por mes.
      </span>
      <LineChart
        className='h-full w-full bg-gradient-to-t from-slate-50 to-slate-200 bg-opacity-50 rounded-md'
        xAxis={[
          {
            data: [
              'Ene',
              'Feb',
              'Mar',
              'Abr',
              'May',
              'Jun',
              'Jul',
              'Ago',
              'Sept',
              'Oct',
              'Nov',
              'Dic'
            ],
            scaleType: 'point'
          }
        ]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 2
          },

          '.MuiLineElement-series-sales': {
            strokeDasharray: '5 5 2 3'
          },
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
            {
              fill: '#fff'
            },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: 'none'
          }
        }}
        series={[
          {
            data: filterSales,
            area: false,
            color: '#e15759',
            label: 'Ventas realizadas',
            id: 'sales'
          }
        ]}
      />
    </div>
  )
}

function ProductsInStock() {
  const { products } = useProduct()
  const [report, setReport] = useState([])

  useEffect(() => {
    setReport(products)
  }, [products])

  const handleChange = (e) => {
    const value = e.target.id
    if (value === 'all') {
      setReport(products)
    } else if (value === 'inStock') {
      setReport(products.filter((item) => item.quantity > 0))
    } else if (value === 'none') {
      setReport(products.filter((item) => item.quantity === 0))
    }
  }

  return (
    <div className='p-3  h-[380px] sm:h-[430px] rounded-md shadow-[0_5px_10px_1px_rgba(0,0,0,0.10)] bg-gray-50 flex flex-col gap-2 justify-center items-center'>
      <span className='text-md font-medium text-slate-600 text-start w-full p-2'>
        Reporte de productos en stock.
      </span>
      <div className='flex gap-2 items-center w-full'>
        <label htmlFor='all' className='inline-flex items-center gap-2'>
          <input
            type='radio'
            name='all'
            id='all'
            className='w-4 h-4 bg-slate-200 rounded-md'
            onChange={handleChange}
            defaultChecked
          />
          <span className='text-sm text-slate-500'>Todos</span>
        </label>
        <label htmlFor='all' className='inline-flex items-center gap-2'>
          <input
            type='radio'
            name='all'
            id='inStock'
            className='w-4 h-4 bg-slate-200 rounded-md'
            onChange={handleChange}
          />
          <span className='text-sm text-slate-500'>En Stock</span>
        </label>
        <label htmlFor='all' className='inline-flex items-center gap-2'>
          <input
            type='radio'
            name='all'
            id='none'
            className='w-4 h-4 bg-slate-200 rounded-md'
            onChange={handleChange}
          />
          <span className='text-sm text-slate-500'>Agotado</span>
        </label>
      </div>
      <ul
        className='h-full w-full overflow-auto flex flex-col gap-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-opacity-30
  [&::-webkit-scrollbar-track]:bg-slate-500
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-slate-500 rounded-lg text-xs'
      >
        {report.map((item, key) => (
          <li
            key={key + 1}
            className={`p-2 flex gap-2 items-center justify-between ${
              item.quantity === 0
                ? 'bg-gradient-to-r from-red-200 to-red-100 text-red-500 hover:bg-gradient-to-r hover:from-red-300 hover:to-red-100'
                : 'bg-gradient-to-r from-slate-200 to-slate-100 hover:bg-gradient-to-r hover:from-slate-300 hover:to-slate-100'
            } rounded-md bg-opacity-60 `}
          >
            <div className='flex gap-5 items-center w-2/4'>
              <span>{item.name}</span>
            </div>
            <span
              className={`p-2 ${
                item.quantity === 0
                  ? 'bg-red-300 text-red-500'
                  : 'bg-lime-300 text-green-600'
              } rounded-md bg-opacity-60`}
            >
              {item.quantity === 0 ? 'Agotado' : 'En stock'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BestSellers() {
  const [bestSellers, setBestSellers] = useState(null)
  const [bestGain, setBestGain] = useState(null)

  const [selected, setSelected] = useState(true)

  useEffect(() => {
    const fetchBestSellers = async () => {
      const response = await fetch(
        `http://localhost:3000/sales/report/best-sellers`
      )
      const result = await response.json()
      setBestSellers(result.result)
    }
    fetchBestSellers()
  }, [])

  useEffect(() => {
    const fetchBestGain = async () => {
      const response = await fetch(
        `http://localhost:3000/sales/report/best-gain`
      )
      const result = await response.json()
      setBestGain(result.result)
    }
    fetchBestGain()
  }, [])

  console.log({ bestSellers, bestGain })

  function handleChange(e) {
    const value = e.target.id
    if (value === 'seller') {
      setSelected(true)
    } else if (value === 'gain') {
      setSelected(false)
    }
  }

  return (
    <div className='p-2 h-[250px] rounded-md shadow-[0_5px_10px_1px_rgba(0,0,0,0.10)] bg-gray-50 flex flex-col gap-2 justify-center items-center'>
      <span className='text-md font-medium text-slate-600 text-start w-full p-2'>
        Reporte de mejores ventas.
      </span>
      <div className='flex gap-2 items-center w-full'>
        <label htmlFor='best' className='inline-flex items-center gap-2'>
          <input
            type='radio'
            name='best'
            id='seller'
            className='w-4 h-4 bg-slate-200 rounded-md'
            onClick={handleChange}
            defaultChecked
          />
          <span className='text-sm text-slate-500'>Mejor vendido</span>
        </label>
        <label htmlFor='best' className='inline-flex items-center gap-2'>
          <input
            type='radio'
            name='best'
            id='gain'
            className='w-4 h-4 bg-slate-200 rounded-md'
            onClick={handleChange}
          />
          <span className='text-sm text-slate-500'>Mayor ganancia</span>
        </label>
      </div>
      {selected && bestSellers ? (
        <>
          <div className='flex gap-4 items-center w-full'>
            <section className='flex flex-col gap-2 bg-gradient-to-r from-slate-200 to-slate-100 rounded-md p-3 w-full'>
              <div className='flex  flex-col gap-2'>
                <span className='text-xs text-slate-700'>Producto:</span>
                <span>{bestSellers[0].name}</span>
              </div>
              <div className='flex  flex-col gap-2'>
                <span className='text-xs text-slate-700'>
                  Ventas realizadas:{' '}
                </span>
                <span>{bestSellers[0].quantity_sold} unidades</span>
              </div>
            </section>

            <div className='flex flex-col gap-2 h-full w-full '>
              <span className='text-xs text-slate-700'>Ganancia obtenida:</span>
              <div className='bg-gradient-to-r from-slate-100 to-slate-200 rounded-md text-3xl  font-semibold h-full flex justify-center items-center'>
                {parseFloat(
                  bestSellers[0].price * bestSellers[0].quantity_sold
                ).toFixed(2)}{' '}
                $
              </div>
            </div>
          </div>
        </>
      ) : !selected && bestGain ? (
        <>
          <div className='flex gap-4 items-center w-full'>
            <section className='flex flex-col gap-2 bg-gradient-to-r from-slate-200 to-slate-100 rounded-md p-3 w-full'>
              <div className='flex  flex-col gap-2'>
                <span className='text-xs text-slate-700'>Producto:</span>
                <span className='text-sm'>{bestGain[0].name}</span>
              </div>
              <div className='flex  flex-col gap-2'>
                <span className='text-xs text-slate-700'>
                  Ventas realizadas:{' '}
                </span>
                <span>{bestGain[0].quantity_sale} unidades</span>
              </div>
            </section>

            <div className='flex flex-col gap-2 h-full w-full '>
              <span className='text-xs text-slate-700'>Ganancia obtenida:</span>
              <div className='bg-gradient-to-r from-slate-100 to-slate-200 rounded-md text-xl sm:text-3xl  font-semibold h-full flex justify-center items-center'>
                {parseFloat(bestGain[0].best_price).toFixed(2)} $
              </div>
            </div>
          </div>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  )
}
