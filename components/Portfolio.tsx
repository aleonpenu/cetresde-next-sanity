'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { MagnifyingGlassPlus } from '@phosphor-icons/react'
import { client } from '@/sanity/lib/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const builder = createImageUrlBuilder({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! })
const urlFor = (source: object) => builder.image(source).url()

interface PortfolioItem {
  _id: string
  title: string
  category: string
  categoryTitle?: string
  description: string
  material: string
  image: string | object
  isSanity?: boolean
}

interface CategoryTab {
  value: string
  label: string
}

const fallbackItems: PortfolioItem[] = [
  { _id: '1', title: 'Paso Procesional Miniatura', category: 'cofradias', description: 'Réplica detallada de paso procesional de Semana Santa con acabados en oro y pintado a mano', material: 'PLA Premium + Acabado Dorado', image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80' },
  { _id: '2', title: 'Figuras Nazarenas', category: 'cofradias', description: 'Colección de figuras de nazarenos personalizadas con los colores de tu cofradía', material: 'Resina + Pintado Personalizado', image: '/images/nazareno.webp' },
  { _id: '3', title: 'Toppers Personalizados', category: 'fiestas', description: 'Decoraciones únicas para tartas con el personaje favorito del cumpleañero', material: 'PLA Multicolor', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
  { _id: '4', title: 'Piñatas Modulares', category: 'fiestas', description: 'Estructuras modulares reutilizables para fiestas infantiles con diseños temáticos', material: 'PETG Resistente', image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&q=80' },
  { _id: '5', title: 'Tazas Personalizadas', category: 'merchandising', description: 'Diseños 3D adheridos a tazas cerámicas con nombres, logos o mensajes personalizados', material: 'PLA + Adhesivo Permanente', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80' },
  { _id: '6', title: 'Llaveros Corporativos', category: 'merchandising', description: 'Merchandising empresarial con logos en 3D, ideal para eventos y regalos corporativos', material: 'PLA Premium', image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80' },
  { _id: '7', title: 'Joyería Artesanal', category: 'regalos', description: 'Pendientes, collares y pulseras con diseños geométricos modernos', material: 'Resina Flexible + Acabado UV', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80' },
  { _id: '8', title: 'Organizadores Personalizados', category: 'regalos', description: 'Soluciones de almacenamiento diseñadas a medida para cualquier espacio', material: 'PETG Duradero', image: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=800&q=80' },
]

const fallbackCategories: CategoryTab[] = [
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
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(fallbackItems)
  const [categories, setCategories] = useState<CategoryTab[]>(fallbackCategories)
  const [activeCategory, setActiveCategory] = useState('todos')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    Promise.all([
      client.fetch<
        Array<{
          _id: string
          title: string
          categorySlug: string
          categoryTitle?: string
          description: string
          material: string
          image: object
        }>
      >(
        `*[_type == "portfolioItem"] | order(order asc) {
          _id,
          title,
          "categorySlug": coalesce(category->slug.current, category),
          "categoryTitle": coalesce(category->title, category),
          description,
          material,
          image
        }`
      ),
      client.fetch<Array<{ _id: string; title: string; slug: { current: string } }>>(
        `*[_type == "category" && section == "portfolio"] | order(order asc, title asc) {
          _id,
          title,
          slug
        }`
      ),
    ])
      .then(([itemsData, categoriesData]) => {
        if (itemsData?.length) {
          setPortfolioItems(
            itemsData.map((d) => ({
              _id: d._id,
              title: d.title,
              category: d.categorySlug,
              categoryTitle: d.categoryTitle,
              description: d.description,
              material: d.material,
              image: d.image,
              isSanity: true,
            }))
          )
        }

        if (categoriesData?.length) {
          setCategories([
            { value: 'todos', label: 'Todos' },
            ...categoriesData
              .filter((c) => !!c.slug?.current)
              .map((c) => ({ value: c.slug.current, label: c.title })),
          ])
        } else if (itemsData?.length) {
          const uniqueFromItems = Array.from(
            new Map(
              itemsData
                .filter((i) => !!i.categorySlug)
                .map((i) => [
                  i.categorySlug,
                  {
                    value: i.categorySlug,
                    label: i.categoryTitle || i.categorySlug,
                  },
                ])
            ).values()
          )
          setCategories([{ value: 'todos', label: 'Todos' }, ...uniqueFromItems])
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!categories.some((c) => c.value === activeCategory)) {
      setActiveCategory('todos')
    }
  }, [activeCategory, categories])

  const getImageUrl = (item: PortfolioItem) =>
    item.isSanity ? urlFor(item.image as object) : (item.image as string)

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
          <TabsList className="flex flex-wrap w-full max-w-4xl mx-auto h-auto gap-2 bg-muted/50 p-2 justify-center">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.value} 
                value={cat.value}
                className="text-xs md:text-sm py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
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
                {(activeCategory === 'todos' ? portfolioItems : portfolioItems.filter(i => i.category === activeCategory)).map((portfolioItem) => (
                  <motion.div key={portfolioItem._id} variants={item}>
                    <Card 
                      className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-accent/50"
                      onClick={() => setSelectedItem(portfolioItem)}
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img 
                          src={getImageUrl(portfolioItem)} 
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
                    src={getImageUrl(selectedItem)} 
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
