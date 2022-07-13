import supertest, { Response, Test } from 'supertest'
import app from '../../server'

const req: supertest.SuperTest<Test> = supertest(app)

describe('Order API', (): void => {
  describe('Unauthorized without token: GET orders [all] /orders', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.get('/orders')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: GET orders [for user] /orders/:userid', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.get('/orders/1')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: POST orders [new] /orders', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.post('/orders')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: DELETE orders [specific] /orders', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.delete('/orders')
      expect(response.status).toBe(401)
    })
  })

  describe('Unauthorized without token: GET items [for order] /orders/items/:orderid', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.get('/orders/1')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: POST items [new] /orders/items', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.post('/orders/items')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: DELETE items [specific] /orders', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.delete('/orders/items')
      expect(response.status).toBe(401)
    })
  })
})

describe('Product API', (): void => {
  describe('Authorized without token: GET products [all] /orders', () => {
    it('returns 200 | valid endpoint', async () => {
      const response: Response = await req.get('/products')
      expect(response.status).toBe(200)
    })
  })
  describe('Authorized without token: GET product [specific] /orders/:id', () => {
    it('returns 200 | valid endpoint', async () => {
      const response: Response = await req.get('/products/1')
      expect(response.status).toBe(200)
    })
  })
  describe('Unauthorized without token: POST products [new] /products', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.post('/products')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: DELETE products [specific] /products', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.delete('/products')
      expect(response.status).toBe(401)
    })
  })
})

describe('User API', (): void => {
  describe('Unauthorized without token: GET users [all] /users', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.get('/users')
      expect(response.status).toBe(401)
    })
  })
  describe('Unauthorized without token: GET user [specific] /users/:id', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.get('/users/1')
      expect(response.status).toBe(401)
    })
  })
  describe('Authorized without token: POST users [new] /users', () => {
    it('returns 200 | valid endpoint', async () => {
      const response: Response = await req.post('/users')
      expect(response.status).toBe(200)
    })
  })
  describe('Unauthorized without token: DELETE users [specific] /users', () => {
    it('returns 401 | invalid endpoint', async () => {
      const response: Response = await req.delete('/users')
      expect(response.status).toBe(401)
    })
  })
  describe('Authorized without token: POST users [login] /users/login', () => {
    it('returns 200 | valid endpoint', async () => {
      const response: Response = await req.post('/users')
      expect(response.status).toBe(200)
    })
  })
})
