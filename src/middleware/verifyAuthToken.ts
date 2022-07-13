import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization
		const token = authorizationHeader ? authorizationHeader.split(' ')[1] : ''
		jwt.verify(token, process.env.JWT_SECRET as string)
		// It is also possible to check for token and invalidity separately
		// (!token) => no token present | (!decoded) => Invalid token
		next()
	} catch (error) {
		res.status(401).send('There was a problem with the token')
	}
}

export default verifyAuthToken
