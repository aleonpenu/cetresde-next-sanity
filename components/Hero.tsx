'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-blue-900"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-purple-900"></div>
        <div className="absolute -bottom-8 left-1/2 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-pink-900"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
              CETRESDÉ
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Impresión 3D Personalizada
            </p>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transformamos tus ideas en realidad con tecnología de impresión 3D de última generación.
            Personalización sin límites para eventos, negocios y sueños especiales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-8">
              Nuestros Servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              Contacta con Nosotros
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Proyectos Realizados</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">10+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Años Experiencia</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">100%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
