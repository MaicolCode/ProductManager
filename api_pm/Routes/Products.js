import express from 'express'
import ProductController from '../Controllers/ProductController.js'

const productRouter = express.Router()

productRouter.get('/', ProductController.getAll)

productRouter.get('/:id', ProductController.getById)

productRouter.post('/', ProductController.create)

productRouter.put('/:id', ProductController.update)

productRouter.delete('/:id', ProductController.delete)

export default productRouter
