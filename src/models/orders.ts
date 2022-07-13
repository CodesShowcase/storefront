import pool from '../database'

export type Order = {
	id?: number
	user_id: number
	status: string
}

export type OrderItem = {
	id?: number
	order_id: number
	product_id: number
	quantity: number
}

export class OrderStore {
	async index(): Promise<Order[] | undefined> {
		try {
			const conn = await pool.connect()
			const sql = 'SELECT * FROM orders'
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async show(id: number): Promise<Order | undefined> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async create(o: Order): Promise<Order | undefined> {
		try {
			const sql =
				'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
			const conn = await pool.connect()
			const result = await conn.query(sql, [o.user_id, o.status])
			const order = result.rows[0]

			conn.release()

			return order
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async destroy(id: number): Promise<Order | undefined> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])
			const order = result.rows[0]

			conn.release()

			return order
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async showItem(order_id: number): Promise<OrderItem[] | undefined> {
		try {
			const sql = 'SELECT * FROM order_items WHERE order_id=($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [order_id])

			conn.release()

			return result.rows
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async createItem(i: OrderItem): Promise<OrderItem | undefined> {
		try {
			const sql =
				'INSERT INTO order_items (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
			const conn = await pool.connect()
			const result = await conn.query(sql, [
				i.order_id,
				i.product_id,
				i.quantity,
			])
			const item = result.rows[0]

			conn.release()

			return item
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async destroyItem(id: number): Promise<OrderItem | undefined> {
		try {
			const sql = 'DELETE FROM order_items WHERE id IN ($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])
			const item = result.rows[0]

			conn.release()

			return item
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}
}
