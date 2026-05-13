'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const portfolioItems = [
  {
    id: 1,
    title: 'Paso Procesional Miniatura',
    category: 'cofradias',
    description: 'Réplica detallada de paso procesional',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&q=80',
  },
  {
    id: 2,
    title: 'Figuras Nazarenas',
    category: 'cofradias',
    description: 'Colección de figuras personalizadas',
    image: '/images/nazareno.webp',
  },
  {
    id: 3,
    title: 'Toppers Personalizados',
    category: 'fiestas',
    description: 'Decoraciones para tartas',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
  },
  {
    id: 4,
    title: 'Miniaturas Decorativas',
    category: 'decoracion',
    description: 'Figuras para decoración del hogar',
    image: 'https://images.unsplash.com/photo-1578926314433-b6c7d2541da3?w=400&q=80',
  },
]

const categories = ['todos', 'cofradias', 'fiestas', 'decoracion']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('todos')

  const filtered = activeCategory === 'todos'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestro Portafolio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Algunos de nuestros proyectos realizados
          </p>
        </div>

        <Tabs defaultValue="todos" onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat === 'todos' ? 'Todos' : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(item => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative overflow-hidden h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="capitalize">{item.category}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
