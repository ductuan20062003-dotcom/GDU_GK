import React from 'react'

export default function Header({ title, currency, setCurrency, currencies }) {
  return (
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-3 items-center">
        <label className="text-sm">Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border rounded p-1">
          {Object.keys(currencies).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </header>
  )
}