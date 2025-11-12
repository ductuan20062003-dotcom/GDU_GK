import { useMemo } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products, onAdd, category, setCategory }) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  return (
    <div>
      <nav className="flex gap-2 flex-wrap mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 rounded ${cat === category ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>
            {cat}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.filter(p => category === 'All' ? true : p.category === category).map(p => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  )
}
