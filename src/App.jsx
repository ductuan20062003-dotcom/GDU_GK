import React, { useEffect, useState, useMemo } from 'react'
import { SAMPLE_PRODUCTS } from './data/products'
import { loadState, saveState } from './utils/localStorage'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  VND: { symbol: '₫', rate: 24000 },
  EUR: { symbol: '€', rate: 0.92 },
}
const TAX_RATE = 0.08

export default function App() {
  const [products] = useState(SAMPLE_PRODUCTS)
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState(() => loadState('cart_v2', []))
  const [currency, setCurrency] = useState(() => loadState('currency_v2', 'USD'))
  const [coupon, setCoupon] = useState(() => loadState('coupon_v2', null))
  const [couponInput, setCouponInput] = useState('')

  useEffect(() => saveState('cart_v2', cart), [cart])
  useEffect(() => saveState('currency_v2', currency), [currency])
  useEffect(() => saveState('coupon_v2', coupon), [coupon])

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) return prev.map(p => p.id === product.id ? { ...p, qty: Math.min(p.qty + 1, product.stock) } : p)
      return [...prev, { id: product.id, title: product.title, price: product.price, qty: 1 }]
    })
  }

  function removeFromCart(id) { setCart(prev => prev.filter(p => p.id !== id)) }
  function updateQty(id, qty) { if (qty < 1) return; setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p)) }
  function clearCart() { setCart([]) }

  function applyCoupon(code) {
    const normalized = code.trim().toUpperCase()
    if (normalized === 'SAVE10') { setCoupon({ code: normalized, type: 'percent', value: 10 }); return { ok: true, msg: 'Áp dụng mã SAVE10: giảm 10%' }}
    if (normalized === 'TAKE5') { setCoupon({ code: normalized, type: 'fixed', value: 5 }); return { ok: true, msg: 'Áp dụng mã TAKE5: giảm $5' }}
    setCoupon(null); return { ok: false, msg: 'Mã không hợp lệ' }
  }

  const sub = useMemo(() => cart.reduce((s, p) => s + p.price * p.qty, 0), [cart])
  const discount = useMemo(() => {
    if (!coupon) return 0
    if (coupon.type === 'percent') return (coupon.value / 100) * sub
    if (coupon.type === 'fixed') return coupon.value
    return 0
  }, [coupon, sub])
  const afterDiscount = Math.max(0, sub - discount)
  const tax = afterDiscount * TAX_RATE
  const total = afterDiscount + tax

  function totalInCurrency(amount) { return amount * CURRENCIES[currency].rate }
  function currencyFormatter(amount) {
    const { symbol } = CURRENCIES[currency]
    const value = totalInCurrency(amount)
    if (currency === 'VND') return `${symbol} ${Math.round(value).toLocaleString()}`
    return `${symbol} ${value.toFixed(2)}`
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Header title="Shopping FAST" currency={currency} setCurrency={setCurrency} currencies={CURRENCIES} />
          <ProductList products={products} onAdd={addToCart} category={category} setCategory={setCategory} />
        </div>

        <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} clearCart={clearCart} subtotal={sub} discount={discount} tax={tax} total={total} currencyFormatter={currencyFormatter} coupon={coupon} applyCoupon={applyCoupon} couponInput={couponInput} setCouponInput={setCouponInput} />
      </div>
    </div>
   
  )
}
