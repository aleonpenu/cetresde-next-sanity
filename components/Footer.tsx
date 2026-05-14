 'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'

interface FooterQuickLink {
  label: string
  targetId: string
}

interface FooterConfig {
  footerBrandTitle: string
  footerDescription: string
  footerQuickLinks: FooterQuickLink[]
  footerServices: string[]
  footerCopyrightText: string
}

type FooterConfigResponse = Partial<FooterConfig> | null

const fallbackFooterConfig: FooterConfig = {
  footerBrandTitle: 'cetresde',
  footerDescription:
    'Transformamos tus ideas en realidad con tecnología de impresión 3D de última generación',
  footerQuickLinks: [
    { label: 'Inicio', targetId: 'top' },
    { label: 'Portfolio', targetId: 'portfolio' },
    { label: 'Contacto', targetId: 'contact' },
  ],
  footerServices: [
    'Impresión 3D Personalizada',
    'Diseño 3D a Medida',
    'Acabados Profesionales',
    'Prototipado Rápido',
  ],
  footerCopyrightText: '© 2026 cetresdé. Todos los derechos reservados.',
}

export default function Footer() {
  const [config, setConfig] = useState<FooterConfig>(fallbackFooterConfig)

  useEffect(() => {
    client
      .fetch<FooterConfigResponse>(`*[_type == "siteConfig"][0]{
        footerBrandTitle,
        footerDescription,
        footerQuickLinks,
        footerServices,
        footerCopyrightText
      }`)
      .then((data) => {
        if (!data) return
        setConfig({
          footerBrandTitle: data.footerBrandTitle || fallbackFooterConfig.footerBrandTitle,
          footerDescription: data.footerDescription || fallbackFooterConfig.footerDescription,
          footerQuickLinks: Array.isArray(data.footerQuickLinks)
            ? data.footerQuickLinks
            : fallbackFooterConfig.footerQuickLinks,
          footerServices: Array.isArray(data.footerServices)
            ? data.footerServices
            : fallbackFooterConfig.footerServices,
          footerCopyrightText:
            data.footerCopyrightText || fallbackFooterConfig.footerCopyrightText,
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
    <footer className="bg-[oklch(0.15_0_0)] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            oklch(0.52 0.22 25) 2px,
            oklch(0.52 0.22 25) 4px
          )`
        }} />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="h-20 mb-6 flex items-center">
              <h3 className="text-4xl font-bold tracking-tight text-white">
                {config.footerBrandTitle}
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              {config.footerDescription}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[oklch(0.52_0.22_25)] tracking-wide">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3 text-white/70">
              {config.footerQuickLinks.map((link) => (
                <li key={`${link.label}-${link.targetId}`}>
                  <button
                    onClick={() => scrollToTarget(link.targetId)}
                    className="hover:text-[oklch(0.52_0.22_25)] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[oklch(0.52_0.22_25)] tracking-wide">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3 text-white/70">
              {config.footerServices.map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <span className="text-[oklch(0.52_0.22_25)] mt-1">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[oklch(0.52_0.22_25)]/30 pt-8 text-center">
          <p className="text-white/50 text-sm">
            {config.footerCopyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}
