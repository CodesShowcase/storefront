import { UserStore } from '../../models/users'


const store = new UserStore()

describe('User Model', () => {
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

	it('should have a authenticate method', () => {
		expect(store.authenticate).toBeDefined()
	})

	it('create method should add a user', async () => {
		const result = await store.create({
			firstname: 'Tabita',
			lastname: 'Testuser',
			username: 'tabita',
			password: 'testpass'
		})
		expect(result).toEqual({
			id: 2,
			firstname: 'Tabita',
			lastname: 'Testuser',
			username: 'tabita',
			password: 'testpass'
		})
	})

	it('index method should return a list of users', async () => {
		const result = await store.index()
		expect(result).toEqual([
			{
				id: 1,
				firstname: 'First',
				lastname: 'Dummy',
				username: 'user',
				password: 'password'
			},
			{
				id: 2,
				firstname: 'Tabita',
				lastname: 'Testuser',
				username: 'tabita',
				password: 'testpass'
			},
		])
	})

	it('show method should return the correct user', async () => {
		const result = await store.show(2)
		expect(result).toEqual({
			id: 2,
			firstname: 'Tabita',
			lastname: 'Testuser',
			username: 'tabita',
			password: 'testpass'
		})
	})

	it('authenticate method should login the user', async () => {
		const result = await store.authenticate('tabita')
		expect(result).toEqual({
			id: 2,
			firstname: 'Tabita',
			lastname: 'Testuser',
			username: 'tabita',
			password: 'testpass'
		})
	})

	it('destroy method should remove the user', async () => {
		await store.destroy(2)
		const result = await store.index()
		expect(result).toEqual([
			{
				id: 1,
				firstname: 'First',
				lastname: 'Dummy',
				username: 'user',
				password: 'password'
			},
		])
	})
})
