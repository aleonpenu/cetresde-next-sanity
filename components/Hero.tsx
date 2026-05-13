'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import LogoShape from '@/components/LogoShape'
import Printer3D from '@/components/Printer3D'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(65,120,220,0.08),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(50,180,220,0.08),transparent_50%)]"></div>
      
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,120,220,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(65,120,220,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[10%] left-[5%] w-40 h-40 border-2 border-primary/40 rounded-lg transform rotate-45 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-[60%] right-[8%] w-32 h-32 border-2 border-accent/40 rounded-lg transform -rotate-12 animate-spin-slow" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-[20%] left-[15%] w-24 h-24 border-2 border-secondary/40 rounded-lg transform rotate-12 animate-spin-slow" style={{ animationDuration: '30s' }}></div>
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-[15%] right-[10%] w-3 h-3 bg-primary/70 rounded-full animate-pulse"></div>
        <div className="absolute top-[45%] left-[8%] w-2.5 h-2.5 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[30%] right-[20%] w-3 h-3 bg-secondary/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[70%] left-[25%] w-2.5 h-2.5 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[25%] left-[40%] w-2 h-2 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[50%] right-[35%] w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-[35%] right-[45%] w-2.5 h-2.5 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="rgba(65,120,220,0.5)" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      <motion.div 
        className="absolute top-[20%] left-[12%] w-48 h-48 opacity-12"
        animate={{ 
          rotateY: [0, 360],
          rotateX: [0, 360]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-full h-full border-2 border-primary/60 relative">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-accent/50 transform translate-x-2 translate-y-2"></div>
          <div className="absolute top-0 left-0 w-full h-full border-2 border-secondary/40 transform translate-x-4 translate-y-4"></div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-[25%] right-[15%] w-40 h-40 opacity-12"
        animate={{ 
          rotate: 360
        }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl"></div>
          <div className="absolute inset-0 border-b-2 border-r-2 border-accent/50 rounded-br-3xl"></div>
        </div>
      </motion.div>
      
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
                CETRESDÉ
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground mb-6"
            >
              Impresión 3D personalizada para tus momentos especiales
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-sm md:text-base text-foreground/70 mb-8"
            >
              Desde cofradías de Semana Santa hasta fiestas infantiles, transformamos tus ideas en realidad con tecnología de impresión 3D de última generación
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
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Solicitar Presupuesto
                  <ArrowRight className="ml-2" weight="bold" />
                </Button>
              </motion.div>

              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg font-semibold tracking-wide transition-all"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Portfolio
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
