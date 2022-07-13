import { OrderStore } from '../../models/orders'


const store = new OrderStore()

describe('Order Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	it('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	it('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	it('should have a show order item method', () => {
		expect(store.showItem).toBeDefined()
	})

	it('should have a create order item method', () => {
		expect(store.createItem).toBeDefined()
	})

	it('should have a destroy order item method', () => {
		expect(store.destroyItem).toBeDefined()
	})

  it('create method should add an order', async () => {
    const result = await store.create({
      user_id: 1,
      status: 'active'
    })
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active'
    })
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'active'
      },
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active'
    })
  })

  it('create method should add an order item', async () => {
    const result = await store.createItem({
      order_id: 1,
      product_id: 1,
      quantity: 10
    })
    expect(result).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 10
    })
  })

  it('index method should return a list of order items', async () => {
    const result = await store.showItem(1)
    expect(result).toEqual([
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 10
      },
    ])
  })

  it('destroy method should remove the order item', async () => {
    await store.destroyItem(1)
    const result = await store.showItem(1)
    expect(result).toEqual([])
  })

  it('destroy method should remove the order', async () => {
    await store.destroy(1)
    const result = await store.index()
    expect(result).toEqual([])
  })

})
