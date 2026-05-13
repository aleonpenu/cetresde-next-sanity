'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Printer, Gift, Lightbulb, Zap } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Impresión Personalizada',
    description: 'Figuras y objetos únicos diseñados según tus especificaciones',
    icon: Printer,
    color: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    title: 'Regalos Personalizados',
    description: 'Regalos únicos para ocasiones especiales y celebraciones',
    icon: Gift,
    color: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 3,
    title: 'Prototipos Rápidos',
    description: 'Desarrolla tus ideas con prototipos en 3D de alta precisión',
    icon: Lightbulb,
    color: 'bg-yellow-100 dark:bg-yellow-900',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: 4,
    title: 'Producciones en Serie',
    description: 'Fabricación escalable para proyectos comerciales',
    icon: Zap,
    color: 'bg-pink-100 dark:bg-pink-900',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Soluciones completas de impresión 3D para empresas, eventos y proyectos personales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
