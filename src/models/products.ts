import pool from '../database'

export type Product = {
	id?: number
	name: string
	price: string
	category_id: number
}

export class ProductStore {
	async index(): Promise<Product[] | undefined> {
		try {
			const conn = await pool.connect()
			const sql = 'SELECT * FROM products'
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async show(id: number): Promise<Product | undefined> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async create(p: Product): Promise<Product | undefined> {
		try {
			const sql =
				'INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *'
			const conn = await pool.connect()
			const result = await conn.query(sql, [p.name, p.price, p.category_id])
			const product = result.rows[0]

			conn.release()

			return product
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async destroy(id: number): Promise<Product | undefined> {
		try {
			const sql = 'DELETE FROM products WHERE id IN ($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])
			const product = result.rows[0]

			conn.release()

			return product
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}
}
