import express, { Application, Request, Response } from 'express'
import orderRoutes from './handlers/orderHandler'
import productRoutes from './handlers/productHandler'
import userRoutes from './handlers/userHandler'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'

const app: Application = express()
const port = process.env.EXPRESS_PORT as string

app.use(helmet())
app.use(morgan('short'))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Storefront API')
})

orderRoutes(app)
productRoutes(app)
userRoutes(app)

app.listen(port, function () {
    console.log(`starting app on: ${port}`)
})

export default app
