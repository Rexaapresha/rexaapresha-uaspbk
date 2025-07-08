import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../src/store/cart'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds item to cart', () => {
    const cart = useCartStore()
    cart.addItem({ id: 1, name: 'Test' })
    expect(cart.items.length).toBe(1)
  })
})
