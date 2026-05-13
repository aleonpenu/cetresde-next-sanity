'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Cube, PaintBrush, SealCheck, Sparkle, type Icon as PhosphorIcon } from '@phosphor-icons/react'
import { client } from '@/sanity/lib/client'

interface SanityService {
  _id: string
  title: string
  description: string
  icon: string
}

const iconMap: Record<string, PhosphorIcon> = {
  Cube,
  PaintBrush,
  SealCheck,
  Sparkle,
}

const fallbackServices = [
  { _id: '1', icon: 'Cube', title: 'Impresión 3D', description: 'Tecnología de última generación para crear piezas únicas con precisión milimétrica y acabados profesionales' },
  { _id: '2', icon: 'PaintBrush', title: 'Diseño Personalizado', description: 'Nuestro equipo convierte tus ideas en modelos 3D optimizados para una impresión perfecta' },
  { _id: '3', icon: 'Sparkle', title: 'Acabados Premium', description: 'Pintado, lijado y tratamiento de superficies para un resultado profesional y duradero' },
  { _id: '4', icon: 'SealCheck', title: 'Calidad Garantizada', description: 'Materiales certificados y control de calidad en cada fase del proceso de producción' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export default function Services() {
  const [services, setServices] = useState<SanityService[]>(fallbackServices)

  useEffect(() => {
    client
      .fetch<SanityService[]>(`*[_type == "service"] | order(_createdAt asc) { _id, title, description, icon }`)
      .then((data) => { if (data?.length) setServices(data) })
      .catch(() => {}) // usa fallback si falla
  }, [])

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De la idea al producto final, te acompañamos en cada paso del proceso
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Cube
            return (
              <motion.div key={service._id} variants={item}>
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-accent/50 group">
                  <div className="mb-4 inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <Icon size={32} weight="duotone" className="text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
