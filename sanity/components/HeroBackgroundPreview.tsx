import React from 'react'

export function GeometricPreview() {
  return (
    <div className="relative w-full h-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded border border-slate-700 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(100,150,220,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(100,150,220,0.15)_1px,transparent_1px)] bg-[size:12px_12px]" />
      {/* Cuadrados rotantes */}
      <div className="absolute top-1 left-1 w-6 h-6 border border-blue-400/50 rounded rotate-45 transform" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border border-cyan-400/40 rounded-lg" />
      {/* Puntos */}
      <div className="absolute top-3 right-3 w-1 h-1 bg-blue-400/70 rounded-full" />
      <div className="absolute bottom-4 left-3 w-1 h-1 bg-cyan-400/70 rounded-full" />
      <div className="flex items-center justify-center h-full text-xs font-medium text-slate-300">
        ⬡ Geométrico
      </div>
    </div>
  )
}

export function ParticlesPreview() {
  return (
    <div className="relative w-full h-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 rounded border border-slate-700 overflow-hidden">
      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(65,120,220,0.08),transparent_60%)]" />
      {/* Partículas */}
      {[
        { top: '20%', left: '15%' },
        { top: '35%', right: '20%' },
        { top: '60%', left: '25%' },
        { bottom: '15%', right: '15%' },
        { bottom: '25%', left: '10%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
          style={pos as React.CSSProperties}
        />
      ))}
      <div className="flex items-center justify-center h-full text-xs font-medium text-slate-300">
        ✦ Partículas
      </div>
    </div>
  )
}

export function WavesPreview() {
  return (
    <div className="relative w-full h-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded border border-slate-700 overflow-hidden">
      {/* Capas de ondas */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d="M0,20 Q25,10 50,20 T100,20" stroke="rgba(100,150,220,0.4)" strokeWidth="0.5" fill="none" />
        <path d="M0,25 Q25,18 50,25 T100,25" stroke="rgba(80,180,220,0.3)" strokeWidth="0.5" fill="none" />
        <path d="M0,30 Q25,22 50,30 T100,30" stroke="rgba(120,100,220,0.2)" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="flex items-center justify-center h-full text-xs font-medium text-slate-300">
        〰 Ondas
      </div>
    </div>
  )
}

export function StaticImagePreview() {
  return (
    <div className="relative w-full h-24 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 rounded border border-slate-600 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex flex-col items-center justify-center gap-1">
        <div className="text-xl">🖼</div>
        <div className="text-xs font-medium text-slate-300">Imagen estática</div>
      </div>
    </div>
  )
}
