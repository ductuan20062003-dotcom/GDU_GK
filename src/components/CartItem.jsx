import React from 'react'

export default function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-gray-600">$ {item.price.toFixed(2)} x {item.qty}</div>
      </div>
      <div className="flex items-center gap-2">
        <input type="number" min={1} value={item.qty} onChange={(e) => onUpdateQty(item.id, Math.max(1, Number(e.target.value)))} className="w-16 border rounded p-1" />
        <button onClick={() => onRemove(item.id)} className="px-2 py-1 border rounded">Xóa</button>
      </div>
    </div>
  )
}
