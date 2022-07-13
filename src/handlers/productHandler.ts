import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new ProductStore()

const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const products = await store.index()
		res.status(200).json(products)
	} catch (err) {
		res.status(401).json(`Could not get products - ${err}`)
	}
}

const show = async (req: Request, res: Response): Promise<void> => {
	console.log(req.params.id)
	try {
		const product = await store.show(req.params.id as unknown as number)
		res.status(200).json(product)
	} catch (err) {
		res.status(401).json(`Could not find product ${req.params.id} - ${err}`)
	}
}

const create = async (req: Request, res: Response): Promise<void> => {
	try {
		const product: Product = {
			// better would be enum and unknown => number
			name: req.body.name as string,
			price: req.body.price as string,
			category_id: req.body.category_id as number,
		}
		const newProduct = await store.create(product)
		res.status(200).json(newProduct)
	} catch (err) {
		res.status(401).json(`Could not add new product ${req.body.name} - ${err}`)
	}
}

const destroy = async (req: Request, res: Response): Promise<void> => {
	try {
		const deleted = await store.destroy(req.body.id as unknown as number)
		res.status(200).json(deleted)
	} catch (err) {
		res.status(401).json(`Could not delete product ${req.body.id} - ${err}`)
	}
}

const productRoutes = (app: express.Application) => {
	app.get('/products', index)
	app.get('/products/:id', show)
	app.post('/products', verifyAuthToken, create)
	app.delete('/products', verifyAuthToken, destroy)
}

export default productRoutes
