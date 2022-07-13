import pool from '../database'

export type User = {
	id?: number
	firstname?: string
	lastname?: string
	username: string
	password: string
}

export class UserStore {
	async index(): Promise<User[] | undefined> {
		try {
			const conn = await pool.connect()
			const sql = 'SELECT * FROM users'
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async show(id: number): Promise<User | undefined> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async create(u: User): Promise<User | undefined> {
		try {
			const sql =
				'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *'
			const conn = await pool.connect()
			const result = await conn.query(sql, [
				u.firstname,
				u.lastname,
				u.username,
				u.password,
			])
			const user = result.rows[0]

			conn.release()

			return user
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async destroy(id: number): Promise<User | undefined> {
		try {
			const sql = 'DELETE FROM users WHERE id IN ($1)'
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])
			const user = result.rows[0]

			conn.release()

			return user
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	async authenticate(username: string): Promise<User | null> {
		const sql = 'SELECT * FROM users WHERE username=($1)'
		const conn = await pool.connect()
		const result = await conn.query(sql, [username])

		conn.release()

		if (result.rows.length) {
			const user = result.rows[0]
			return user
		}
		return null
	}
}
