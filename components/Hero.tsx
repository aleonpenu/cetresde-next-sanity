'use client'
import { useEffect, useState } from 'react'
import HeroBackground, { HeroBackgroundType } from '@/components/HeroBackground'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import LogoShape from '@/components/LogoShape'
import Printer3D from '@/components/Printer3D'
import { client } from '@/sanity/lib/client'

interface HeroConfig {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroPrimaryCtaText: string
  heroPrimaryCtaTarget: string
  heroSecondaryCtaText: string
  heroSecondaryCtaTarget: string
  heroBackgroundType: HeroBackgroundType
  heroBackgroundImage: string
  heroBackgroundOverlay: number
}

type HeroConfigResponse = Partial<HeroConfig> | null

const fallbackHeroConfig: HeroConfig = {
  heroTitle: 'CETRESDÉ',
  heroSubtitle: 'Impresión 3D personalizada para tus momentos especiales',
  heroDescription:
    'Desde cofradías de Semana Santa hasta fiestas infantiles, transformamos tus ideas en realidad con tecnología de impresión 3D de última generación',
  heroPrimaryCtaText: 'Solicitar Presupuesto',
  heroPrimaryCtaTarget: 'contact',
  heroSecondaryCtaText: 'Ver Portfolio',
  heroSecondaryCtaTarget: 'portfolio',
  heroBackgroundType: 'geometric',
  heroBackgroundImage: '',
  heroBackgroundOverlay: 60,
}

export default function Hero() {
  const [config, setConfig] = useState<HeroConfig>(fallbackHeroConfig)

  useEffect(() => {
    client
      .fetch<HeroConfigResponse>(`*[_type == "siteConfig" && _id == "siteConfig"][0]{
        heroTitle,
        heroSubtitle,
        heroDescription,
        heroPrimaryCtaText,
        heroPrimaryCtaTarget,
        heroSecondaryCtaText,
        heroSecondaryCtaTarget,
        heroBackgroundType,
        heroBackgroundImage,
        heroBackgroundOverlay
      }`)
      .then((data) => {
        if (!data) return
        setConfig({
          heroTitle: data.heroTitle || fallbackHeroConfig.heroTitle,
          heroSubtitle: data.heroSubtitle || fallbackHeroConfig.heroSubtitle,
          heroDescription: data.heroDescription || fallbackHeroConfig.heroDescription,
          heroPrimaryCtaText: data.heroPrimaryCtaText || fallbackHeroConfig.heroPrimaryCtaText,
          heroPrimaryCtaTarget: data.heroPrimaryCtaTarget || fallbackHeroConfig.heroPrimaryCtaTarget,
          heroSecondaryCtaText:
            data.heroSecondaryCtaText || fallbackHeroConfig.heroSecondaryCtaText,
          heroSecondaryCtaTarget:
            data.heroSecondaryCtaTarget || fallbackHeroConfig.heroSecondaryCtaTarget,
          heroBackgroundType:
            (data.heroBackgroundType as HeroBackgroundType) || fallbackHeroConfig.heroBackgroundType,
          heroBackgroundImage: data.heroBackgroundImage || fallbackHeroConfig.heroBackgroundImage,
          heroBackgroundOverlay: data.heroBackgroundOverlay ?? fallbackHeroConfig.heroBackgroundOverlay,
        })
      })
      .catch(() => {})
  }, [])

  const scrollToTarget = (targetId: string) => {
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-accent/5">
      <HeroBackground
        type={config.heroBackgroundType}
        imageSrc={config.heroBackgroundImage || undefined}
        overlayOpacity={config.heroBackgroundOverlay}
      />
      
      <div className="container relative z-10 px-4 py-12 md:py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start gap-4 mb-8"
            >
              <LogoShape className="h-36 md:h-40 lg:h-48 w-auto flex-shrink-0" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {config.heroTitle}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground mb-6"
            >
              {config.heroSubtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-sm md:text-base text-foreground/70 mb-8"
            >
              {config.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all"
                  onClick={() => scrollToTarget(config.heroPrimaryCtaTarget)}
                >
                  {config.heroPrimaryCtaText}
                  <ArrowRight className="ml-2" weight="bold" />
                </Button>
              </motion.div>

              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg font-semibold tracking-wide transition-all"
                onClick={() => scrollToTarget(config.heroSecondaryCtaTarget)}
              >
                {config.heroSecondaryCtaText}
              </Button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl"></div>
            <div className="relative h-full w-full perspective-1000">
              <Printer3D />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  )
}
