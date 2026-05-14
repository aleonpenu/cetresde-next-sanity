'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export type HeroBackgroundType =
  | 'geometric'   // Fondo actual: hexágonos, cubos 3D, partículas pulsantes
  | 'particles'   // Solo partículas flotantes, más minimalista
  | 'waves'       // Ondas SVG animadas
  | 'static-image' // Imagen estática con overlay oscuro

interface HeroBackgroundProps {
  type?: HeroBackgroundType
  /** Solo para type="static-image": ruta o URL de la imagen */
  imageSrc?: string
  /** Opacidad del overlay oscuro para static-image (0-100) */
  overlayOpacity?: number
}

// ─── Geometric (fondo original) ──────────────────────────────────────────────
function GeometricBackground() {
  return (
    <>
      {/* Gradiente radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(65,120,220,0.08),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(50,180,220,0.08),transparent_50%)]" />

      {/* Grid de líneas */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,120,220,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(65,120,220,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Cuadrados rotantes */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[10%] left-[5%] w-40 h-40 border-2 border-primary/40 rounded-lg transform rotate-45 animate-spin-slow" style={{ animationDuration: '20s' }} />
        <div className="absolute top-[60%] right-[8%] w-32 h-32 border-2 border-accent/40 rounded-lg transform -rotate-12 animate-spin-slow" style={{ animationDuration: '25s' }} />
        <div className="absolute bottom-[20%] left-[15%] w-24 h-24 border-2 border-secondary/40 rounded-lg transform rotate-12 animate-spin-slow" style={{ animationDuration: '30s' }} />
      </div>

      {/* Puntos pulsantes */}
      <div className="absolute inset-0">
        {[
          { top: '15%', right: '10%',  size: 'w-3 h-3',   color: 'bg-primary/70',   delay: '0s' },
          { top: '45%', left: '8%',    size: 'w-2.5 h-2.5', color: 'bg-accent/70',  delay: '0.5s' },
          { bottom: '30%', right: '20%', size: 'w-3 h-3',  color: 'bg-secondary/70', delay: '1s' },
          { top: '70%', left: '25%',   size: 'w-2.5 h-2.5', color: 'bg-primary/70', delay: '1.5s' },
          { top: '25%', left: '40%',   size: 'w-2 h-2',    color: 'bg-accent/70',   delay: '2s' },
          { bottom: '50%', right: '35%', size: 'w-2 h-2',  color: 'bg-primary/60',  delay: '2.5s' },
          { top: '35%', right: '45%',  size: 'w-2.5 h-2.5', color: 'bg-secondary/60', delay: '3s' },
        ].map((dot, i) => (
          <div
            key={i}
            className={`absolute ${dot.size} ${dot.color} rounded-full animate-pulse`}
            style={{ top: dot.top, bottom: dot.bottom, left: dot.left, right: dot.right, animationDelay: dot.delay } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Hexágonos SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="rgba(65,120,220,0.5)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Cubo 3D flotante — top left */}
      <motion.div
        className="absolute top-[20%] left-[12%] w-48 h-48 opacity-[0.12]"
        animate={{ rotateY: [0, 360], rotateX: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full border-2 border-primary/60 relative">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-accent/50 transform translate-x-2 translate-y-2" />
          <div className="absolute top-0 left-0 w-full h-full border-2 border-secondary/40 transform translate-x-4 translate-y-4" />
        </div>
      </motion.div>

      {/* Arco decorativo — bottom right */}
      <motion.div
        className="absolute bottom-[25%] right-[15%] w-40 h-40 opacity-[0.12]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl" />
          <div className="absolute inset-0 border-b-2 border-r-2 border-accent/50 rounded-br-3xl" />
        </div>
      </motion.div>
    </>
  )
}

// ─── Particles (minimalista) ──────────────────────────────────────────────────
function ParticlesBackground() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${5 + (i * 4.7) % 90}%`,
    y: `${10 + (i * 7.3) % 80}%`,
    size: i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-2 h-2' : 'w-1.5 h-1.5',
    color: i % 3 === 0 ? 'bg-primary/50' : i % 3 === 1 ? 'bg-accent/50' : 'bg-secondary/50',
    duration: 2 + (i % 4),
    delay: (i * 0.3) % 4,
    floatY: 8 + (i % 12),
  }))

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(65,120,220,0.06),transparent_70%)]" />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.size} ${p.color} rounded-full`}
          style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -p.floatY, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Líneas de conexión sutiles */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="rgba(65,120,220,0.8)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </>
  )
}

// ─── Waves (ondas) ────────────────────────────────────────────────────────────
function WavesBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
      {[
        { fill: 'rgba(65,120,220,0.07)', d: 'M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z', duration: 8, y: '75%' },
        { fill: 'rgba(50,180,220,0.06)', d: 'M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,261.3C672,277,768,267,864,240C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z', duration: 12, y: '80%' },
        { fill: 'rgba(100,80,220,0.05)', d: 'M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,192C672,181,768,203,864,224C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z', duration: 16, y: '85%' },
      ].map((wave, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 bottom-0"
          style={{ top: wave.y }}
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: wave.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-[200%]" preserveAspectRatio="none">
            <path fill={wave.fill} d={wave.d} />
          </svg>
        </motion.div>
      ))}
      {/* Efecto de brillo superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
    </>
  )
}

// ─── Static image ─────────────────────────────────────────────────────────────
function StaticImageBackground({ imageSrc, overlayOpacity = 60 }: { imageSrc: string; overlayOpacity?: number }) {
  return (
    <>
      <Image
        src={imageSrc}
        alt="Hero background"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity / 100 }}
      />
      {/* Viñeta sutil en bordes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
    </>
  )
}

// ─── Export principal ─────────────────────────────────────────────────────────
export default function HeroBackground({ type = 'geometric', imageSrc, overlayOpacity }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {type === 'geometric' && <GeometricBackground />}
      {type === 'particles' && <ParticlesBackground />}
      {type === 'waves' && <WavesBackground />}
      {type === 'static-image' && imageSrc && (
        <StaticImageBackground imageSrc={imageSrc} overlayOpacity={overlayOpacity} />
      )}
    </div>
  )
}
