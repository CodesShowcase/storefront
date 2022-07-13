import { ProductStore } from '../../models/products'


const store = new ProductStore()

describe('Product Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	it('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	it('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	it('should have a destroy method', () => {
		expect(store.destroy).toBeDefined()
	})

	it('create method should add a product', async () => {
		const result = await store.create({
			name: 'Minion',
			price: '2.14',
			category_id: 1
		})
		expect(result).toEqual({
			id: 2,
			name: 'Minion',
			price: '2.14',
			category_id: 1
		})
	})

	it('index method should return a list of products', async () => {
		const result = await store.index()
		expect(result).toEqual([
      {
				id: 1,
				name: 'Dummy Product',
				price: '9.99',
				category_id: 1
			},
      {
				id: 2,
				name: 'Minion',
				price: '2.14',
				category_id: 1
			},
		])
	})

	it('show method should return the correct product', async () => {
		const result = await store.show(2)
		expect(result).toEqual({
			id: 2,
			name: 'Minion',
			price: '2.14',
			category_id: 1
		})
	})

	it('destroy method should remove the product', async () => {
		await store.destroy(2)
		const result = await store.index()
		expect(result).toEqual([
      {
				id: 1,
				name: 'Dummy Product',
				price: '9.99',
				category_id: 1
			},
    ])
	})
})
