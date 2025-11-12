import React from 'react'
import CartItem from './CartItem'

export default function Cart({ cart, onUpdateQty, onRemove, clearCart, subtotal, discount, tax, total, currencyFormatter, coupon, applyCoupon, couponInput, setCouponInput }) {
  return (
    <aside className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Giỏ hàng</h2>

      {cart.length === 0 ? (
        <div className="text-sm text-gray-500">Chưa có sản phẩm trong giỏ.</div>
      ) : (
        <div className="space-y-3">
          {cart.map(item => (
            <CartItem key={item.id} item={item} onUpdateQty={onUpdateQty} onRemove={onRemove} />
          ))}

          <div className="flex justify-between items-center">
            <button onClick={clearCart} className="text-sm text-red-600">Xóa tất cả</button>
            <button onClick={() => alert('Checkout demo - integrate payment gateway')} className="bg-indigo-600 text-white px-3 py-1 rounded">Thanh toán</button>
          </div>
        </div>
      )}

      <div className="mt-4 border-t pt-3 space-y-2 text-sm">
        <div className="flex justify-between"><span>Tạm tính</span><span>{currencyFormatter(subtotal)}</span></div>
        <div className="flex justify-between"><span>Giảm giá</span><span>{currencyFormatter(discount)}</span></div>
        <div className="flex justify-between"><span>Thuế</span><span>{currencyFormatter(tax)}</span></div>
        <div className="flex justify-between font-semibold text-lg"><span>Tổng</span><span>{currencyFormatter(total)}</span></div>
      </div>

      <div className="mt-3">
        <label className="block text-sm">Mã giảm giá</label>
        <div className="flex gap-2 mt-1">
          <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 border rounded p-1" placeholder="Nhập mã (SAVE10, TAKE5)" />
          <button onClick={() => { const res = applyCoupon(couponInput); alert(res.msg); }} className="px-3 py-1 border rounded">Áp dụng</button>
        </div>
        {coupon && <div className="text-sm text-green-600 mt-1">Đã áp dụng: {coupon.code}</div>}
      </div>

      <div className="mt-3 text-xs text-gray-500"></div>
    </aside>
  )
}
