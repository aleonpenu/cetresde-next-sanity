import React from 'react'
import { StringInputProps } from 'sanity'
import {
  GeometricPreview,
  ParticlesPreview,
  WavesPreview,
  StaticImagePreview,
} from './HeroBackgroundPreview'

interface BackgroundOption {
  title: string
  value: string
  description: string
  component: React.ComponentType
}

const backgroundOptions: BackgroundOption[] = [
  {
    title: '⬡ Geométrico',
    value: 'geometric',
    description: 'Hexágonos, cubos 3D, cuadrados rotantes y puntos pulsantes',
    component: GeometricPreview,
  },
  {
    title: '✦ Partículas',
    value: 'particles',
    description: 'Puntos flotantes minimalistas con movimiento suave',
    component: ParticlesPreview,
  },
  {
    title: '〰 Ondas',
    value: 'waves',
    description: 'Capas animadas de ondas SVG con efecto marino',
    component: WavesBackground,
  },
  {
    title: '🖼 Imagen estática',
    value: 'static-image',
    description: 'Tu propia imagen de fondo con overlay oscuro ajustable',
    component: StaticImagePreview,
  },
]

export function HeroBackgroundSelector(props: StringInputProps) {
  const { value, onChange } = props

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {backgroundOptions.map((option) => {
          const isSelected = value === option.value
          const Preview = option.component

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}

              <Preview />

              <div className="mt-2">
                <p className="text-xs font-bold text-slate-900">{option.title}</p>
                <p className="text-xs text-slate-600 mt-1">{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Alias for Wave preview to avoid naming conflict
function StaticImageBackground() {
  return <StaticImagePreview />
}
