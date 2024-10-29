import express from 'express'
import ProductsController from '../Controllers/ProductsController.js'

const productRouter = express.Router()

productRouter.get('/', ProductsController.getAll)

productRouter.get('/:id', ProductsController.getById)

productRouter.post('/', ProductsController.create)

productRouter.put('/:id', ProductsController.update)

productRouter.delete('/:id', ProductsController.delete)

export default productRouter
