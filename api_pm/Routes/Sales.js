import express from 'express'
import SalesController from '../Controllers/SalesController.js'

const salesRouter = express.Router()

salesRouter.get('/', SalesController.getAll)

salesRouter.get('/:id', SalesController.getById)

salesRouter.post('/add', SalesController.create)

salesRouter.put('/:id', SalesController.update)

salesRouter.delete('/:id', SalesController.delete)

salesRouter.get('/report/byMonths', SalesController.report)

salesRouter.get('/report/best-sellers', SalesController.bestSellers)

salesRouter.get('/report/best-gain', SalesController.bestGain)

export default salesRouter
