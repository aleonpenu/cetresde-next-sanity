'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type IntroOverlayProps = {
  /** Duración total antes de cerrar (ms) */
  durationMs?: number
  /** Callback al terminar o al hacer skip */
  onFinish: () => void
  /** Título opcional (branding) */
  title?: string
  /** Subtítulo opcional */
  subtitle?: string
  /** Ruta de la imagen en /public */
  imageSrc: string
  /** Modo de encuadre de imagen */
  imageDisplayMode?: 'cinematic' | 'contain' | 'cover'
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}

export default function IntroOverlay({
  durationMs = 4500,
  onFinish,
  title = 'Capricho Azahar 3D',
  subtitle = 'Donde las ideas toman forma',
  imageSrc,
  imageDisplayMode = 'cinematic',
}: IntroOverlayProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Para que el skip sea "claramente visible" y con foco
  const skipBtnRef = useRef<HTMLButtonElement | null>(null)

  const [phase, setPhase] = useState<'enter' | 'idle' | 'exit'>('enter')
  const [progress, setProgress] = useState(0)

  // Duraciones internas (ms)
  const enterMs = prefersReducedMotion ? 0 : 450
  const exitMs = prefersReducedMotion ? 0 : 700

  const idleMs = useMemo(() => {
    const remaining = durationMs - enterMs - exitMs
    return Math.max(0, remaining)
  }, [durationMs, enterMs, exitMs])

  useEffect(() => {
    // Foco inmediato al botón skip por accesibilidad
    skipBtnRef.current?.focus()

    let raf = 0
    const start = performance.now()

    const tick = (t: number) => {
      const elapsed = t - start
      const pct = Math.min(1, elapsed / durationMs)
      setProgress(pct)
      if (pct < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Fases
    const t1 = window.setTimeout(() => setPhase('idle'), enterMs)
    const t2 = window.setTimeout(() => setPhase('exit'), enterMs + idleMs)
    const t3 = window.setTimeout(() => onFinish(), durationMs)

    // Skip con teclado (ESC)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setPhase('exit')
        window.setTimeout(() => onFinish(), exitMs)
      }
      if (e.key === 'Enter' && document.activeElement === skipBtnRef.current) {
        e.preventDefault()
        setPhase('exit')
        window.setTimeout(() => onFinish(), exitMs)
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [durationMs, enterMs, exitMs, idleMs, onFinish])

  const handleSkip = () => {
    setPhase('exit')
    window.setTimeout(() => onFinish(), exitMs)
  }

  // Clases según fase
  const containerClass =
    phase === 'enter'
      ? 'opacity-0'
      : phase === 'idle'
        ? 'opacity-100'
        : 'opacity-0'

  const showCoverBackground = imageDisplayMode === 'cinematic' || imageDisplayMode === 'cover'
  const showContainedImage = imageDisplayMode === 'cinematic' || imageDisplayMode === 'contain'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Intro de la web"
      className={`fixed inset-0 z-[9999] transition-opacity ${prefersReducedMotion ? 'duration-0' : 'duration-700'} ${containerClass}`}
    >
      {/* Fondo imagen */}
      <div className="absolute inset-0 overflow-hidden">
        {showCoverBackground && (
          <Image
            src={imageSrc}
            alt="Intro landing sobre impresión 3D"
            fill
            priority
            className={[
              'object-cover',
              imageDisplayMode === 'cover' ? 'opacity-100 scale-100' : 'scale-105 opacity-55',
              prefersReducedMotion ? '' : 'intro-zoom',
              phase === 'exit' ? 'intro-blur' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        )}

        {/* Overlay para legibilidad + cine */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 intro-vignette" />
      </div>

      {/* Imagen principal completa */}
      {showContainedImage && (
        <div className="absolute inset-0 flex items-center justify-center px-4 py-10 sm:px-8 sm:py-12 pointer-events-none">
          <div className="relative h-full w-full max-w-7xl">
            <Image
              src={imageSrc}
              alt="Escena de introducción sobre impresión 3D"
              fill
              priority
              className={[
                'object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)]',
                prefersReducedMotion ? '' : 'intro-float',
                phase === 'exit' ? 'intro-blur' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          </div>
        </div>
      )}

      {/* Branding (sutil) */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center select-none">
          <div className="intro-glow text-white/95 font-semibold tracking-[0.24em] uppercase text-3xl sm:text-4xl">
            {title}
          </div>
          <div className="mt-3 text-white/80 text-sm sm:text-base tracking-wide">
            {subtitle}
          </div>
        </div>
      </div>

      {/* Skip + progreso (claramente visible) */}
      <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between gap-4">
        {/* Barra de progreso */}
        <div className="flex-1 h-2 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-white/70"
            style={{ width: `${Math.round(progress * 100)}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Botón Skip */}
        <button
          ref={skipBtnRef}
          onClick={handleSkip}
          className="
            rounded-xl px-4 py-3
            bg-white/90 hover:bg-white
            text-black font-semibold
            shadow-lg shadow-black/25
            focus:outline-none focus:ring-4 focus:ring-white/60
            active:scale-[0.98]
            transition whitespace-nowrap
          "
          aria-label="Saltar intro"
        >
          Saltar intro
          <span className="ml-2 text-black/60 font-medium">(ESC)</span>
        </button>
      </div>
    </div>
  )
}
