import express, { Request, Response } from 'express'
import { Order, OrderItem, OrderStore } from '../models/orders'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new OrderStore()

const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const orders = await store.index()
		res.status(200).json(orders)
		return
	} catch (err) {
		res.status(401).json(`Could not get orders - ${err}`)
		return
	}
}

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const order = await store.show(req.params.userid as unknown as number)
		res.status(200).json(order)
		return
	} catch (err) {
		res.status(401).json(`Could not find order ${req.params.userid} - ${err}`)
		return
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
		return
	} catch (err) {
		res.status(401).json(`Could not add new order - ${err}`)
		return
	}
}

const destroy = async (req: Request, res: Response): Promise<void> => {
	try {
		const deleted = await store.destroy(req.body.id as unknown as number)
		res.status(200).json(deleted)
		return
	} catch (err) {
		res.status(401).json(`Could not delete product ${req.body.id} - ${err}`)
		return
	}
}

const showItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const orders = await store.showItem(req.params.orderid as unknown as number)
		res.status(200).json(orders)
		return
	} catch (err) {
		res.status(401).json(`Could not find order ${req.params.orderid} - ${err}`)
		return
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
		return
	} catch (err) {
		res.status(401).json(`Could not add new item - ${err}`)
		return
	}
}

const destroyItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const deleted = await store.destroyItem(req.body.id as unknown as number)
		res.status(200).json(deleted)
		return
	} catch (err) {
		res.status(401).json(`Could not delete item ${req.body.id} - ${err}`)
		return
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
