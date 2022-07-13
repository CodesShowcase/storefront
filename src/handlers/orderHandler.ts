import express, { Request, Response } from 'express'
import { Order, OrderItem, OrderStore } from '../models/orders'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new OrderStore()

const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const orders = await store.index()
		res.status(200).json(orders)
	} catch (err) {
		res.status(401).json(`Could not get orders - ${err}`)
	}
}

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const order = await store.show(req.params.userid as unknown as number)
		res.status(200).json(order)
	} catch (err) {
		res.status(401).json(`Could not find order ${req.params.userid} - ${err}`)
	}
}

const create = async (req: Request, res: Response): Promise<void> => {
	try {
		const order: Order = {
			user_id: req.body.user_id as number,
			status: req.body.status as string,
		}
		const newOrder = await store.create(order)
		res.status(200).json(newOrder)
	} catch (err) {
		res.status(401).json(`Could not add new order - ${err}`)
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

const showItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const orders = await store.showItem(req.params.orderid as unknown as number)
		res.status(200).json(orders)
	} catch (err) {
		res.status(401).json(`Could not find order ${req.params.orderid} - ${err}`)
	}
}

const createItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const orderItem: OrderItem = {
			// better would be enum and unknown => number
			order_id: req.body.order_id as number,
			product_id: req.body.product_id as number,
			quantity: req.body.quantity as number,
		}

		const newItem = await store.createItem(orderItem)
		res.status(200).json(newItem)
	} catch (err) {
		res.status(401).json(`Could not add new item - ${err}`)
	}
}

const destroyItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const deleted = await store.destroyItem(req.body.id as unknown as number)
		res.status(200).json(deleted)
	} catch (err) {
		res.status(401).json(`Could not delete item ${req.body.id} - ${err}`)
	}
}

const orderRoutes = (app: express.Application) => {
	app.get('/orders', verifyAuthToken, index)
	app.get('/orders/:userid', verifyAuthToken, show)
	app.post('/orders', verifyAuthToken, create)
	app.delete('/orders', verifyAuthToken, destroy)
	app.get('/orders/items/:orderid', verifyAuthToken, showItem)
	app.post('/orders/items', verifyAuthToken, createItem)
	app.delete('/orders/items', verifyAuthToken, destroyItem)
}

export default orderRoutes
