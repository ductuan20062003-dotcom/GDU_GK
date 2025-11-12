import React from 'react'
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
          <img src ="https://th.bing.com/th/id/OIP.83YFmvKI6vgr6tN72pCPdwHaHa?w=198&h=198&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.1&pid=1.7&rm=3"></img>
          
          </div>
        <div className="flex-1">
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="font-bold">$ {product.price.toFixed(2)}</div>
            <div className="flex gap-2">
              <button onClick={() => onAdd(product)} className="px-3 py-1 border rounded">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
