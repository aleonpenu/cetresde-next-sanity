'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { MagnifyingGlassPlus } from '@phosphor-icons/react'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  material: string
  image: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Paso Procesional Miniatura',
    category: 'cofradias',
    description: 'Réplica detallada de paso procesional de Semana Santa con acabados en oro y pintado a mano',
    material: 'PLA Premium + Acabado Dorado',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80'
  },
  {
    id: 2,
    title: 'Figuras Nazarenas',
    category: 'cofradias',
    description: 'Colección de figuras de nazarenos personalizadas con los colores de tu cofradía',
    material: 'Resina + Pintado Personalizado',
    image: '/images/nazareno.webp'
  },
  {
    id: 3,
    title: 'Toppers Personalizados',
    category: 'fiestas',
    description: 'Decoraciones únicas para tartas con el personaje favorito del cumpleañero',
    material: 'PLA Multicolor',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
  },
  {
    id: 4,
    title: 'Piñatas Modulares',
    category: 'fiestas',
    description: 'Estructuras modulares reutilizables para fiestas infantiles con diseños temáticos',
    material: 'PETG Resistente',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&q=80'
  },
  {
    id: 5,
    title: 'Tazas Personalizadas',
    category: 'merchandising',
    description: 'Diseños 3D adheridos a tazas cerámicas con nombres, logos o mensajes personalizados',
    material: 'PLA + Adhesivo Permanente',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80'
  },
  {
    id: 6,
    title: 'Llaveros Corporativos',
    category: 'merchandising',
    description: 'Merchandising empresarial con logos en 3D, ideal para eventos y regalos corporativos',
    material: 'PLA Premium',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80'
  },
  {
    id: 7,
    title: 'Joyería Artesanal',
    category: 'regalos',
    description: 'Pendientes, collares y pulseras con diseños geométricos modernos',
    material: 'Resina Flexible + Acabado UV',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
  },
  {
    id: 8,
    title: 'Organizadores Personalizados',
    category: 'regalos',
    description: 'Soluciones de almacenamiento diseñadas a medida para cualquier espacio',
    material: 'PETG Duradero',
    image: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=800&q=80'
  }
]

const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'cofradias', label: 'Cofradías' },
  { value: 'fiestas', label: 'Fiestas Infantiles' },
  { value: 'merchandising', label: 'Merchandising' },
  { value: 'regalos', label: 'Regalos' }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filteredItems = activeCategory === 'todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestro Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora algunos de nuestros proyectos más destacados
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.value} 
                value={cat.value}
                className="text-xs md:text-sm py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filteredItems.map((portfolioItem) => (
                  <motion.div key={portfolioItem.id} variants={item}>
                    <Card 
                      className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-accent/50"
                      onClick={() => setSelectedItem(portfolioItem)}
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img 
                          src={portfolioItem.image} 
                          alt={portfolioItem.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <div className="flex items-center gap-2 text-white">
                            <MagnifyingGlassPlus size={24} weight="bold" />
                            <span className="font-semibold">Ver detalles</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                          {portfolioItem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {portfolioItem.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent">
                      {selectedItem.material}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
