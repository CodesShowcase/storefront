import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/users'
import verifyAuthToken from '../middleware/verifyAuthToken'
import bcrypt from 'bcrypt'


const store = new UserStore()

const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const users = await store.index()
		res.status(200).json(users)
	} catch (err) {
		res.status(401).json(`Could not get users - ${err}`)
	}
}

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await store.show(req.params.id as unknown as number)
		res.status(200).json(user)
	} catch (err) {
		res.status(401).json(`Could not find user ${req.params.id} - ${err}`)
	}
}

const create = async (req: Request, res: Response): Promise<void> => {
	try {
		const user: User = {
			firstname: req.body.firstname as string,
			lastname: req.body.lastname as string,
			username: req.body.username as string,
			password: req.body.password as string,
		}
		const hash = bcrypt.hashSync(
			user.password + (process.env.BCRYPT_SALT as string),
			parseInt(process.env.SALT_ROUNDS as string),
		)
		user.password = hash
		const newUser = await store.create(user)
		const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string)
		res.status(200).json(token)
	} catch (err) {
		res.status(401).json(`Could not add new user - ${err}`)
	}
}

const destroy = async (req: Request, res: Response): Promise<void> => {
	try {
		const deleted = await store.destroy(req.body.id as unknown as number)
		res.status(200).json(deleted)
	} catch (err) {
		res.status(401).json(`Could not delete user ${req.body.id} - ${err}`)
	}
}

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const user: User = {
			username: req.body.username as string,
			password: req.body.password as string,
		}
		const loginUser = await store.authenticate(user.username)
		if (loginUser !== null) {
			if ( bcrypt.compareSync( user.password + (process.env.BCRYPT_SALT as string), loginUser.password,	) ) {
				const token = jwt.sign(
					{ user: loginUser },
					process.env.JWT_SECRET as string,
				)
				res.status(200).json(token)
			} else { res.status(401).json(`Could not authenticate user`) }
		} else { res.status(401).json(`Could not authenticate user`) }
	} catch (err) {
		res.status(401).json(`Could not login user - ${err}`)
	}
}

const userRoutes = (app: express.Application) => {
	app.get('/users', verifyAuthToken, index)
	app.get('/users/:id', verifyAuthToken, show)
	app.post('/users', create)
	app.delete('/users', verifyAuthToken, destroy)
	app.post('/users/login', login)
}

export default userRoutes
