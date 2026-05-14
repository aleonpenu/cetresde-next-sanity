'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import IntroOverlay from '@/components/IntroOverlay'
import { client } from '@/sanity/lib/client'

interface IntroConfig {
  enabled: boolean
  imageSrc: string
  title: string
  subtitle: string
  durationMs: number
}

type IntroConfigResponse = Partial<IntroConfig> | null

const fallbackIntroConfig: IntroConfig = {
  enabled: false,
  imageSrc: '/intro/intro-landing.webp',
  title: 'Capricho Azahar 3D',
  subtitle: 'Donde las ideas toman forma',
  durationMs: 4500,
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(false)
  const [introConfig, setIntroConfig] = useState<IntroConfig>(fallbackIntroConfig)

  useEffect(() => {
    const loadIntroConfig = async () => {
      try {
        const data = await client.fetch<IntroConfigResponse>(
          `*[_type == "siteConfig"][0]{
            "introOverlay": introOverlay {
              enabled,
              imageSrc,
              title,
              subtitle,
              durationMs
            }
          }`
        )

        if (data?.introOverlay) {
          const intro = data.introOverlay
          setIntroConfig({
            enabled: intro.enabled ?? fallbackIntroConfig.enabled,
            imageSrc: intro.imageSrc || fallbackIntroConfig.imageSrc,
            title: intro.title || fallbackIntroConfig.title,
            subtitle: intro.subtitle || fallbackIntroConfig.subtitle,
            durationMs: intro.durationMs || fallbackIntroConfig.durationMs,
          })

          // Solo mostrar intro si está habilitada y no se ha visto en esta sesión
          if (intro.enabled) {
            const already = sessionStorage.getItem('introSeen')
            if (!already) {
              setShowIntro(true)
              sessionStorage.setItem('introSeen', '1')
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load intro config from Sanity, using default', err)
      }
    }

    loadIntroConfig()
  }, [])

  const handleIntroFinish = () => {
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && introConfig.enabled && (
        <IntroOverlay
          imageSrc={introConfig.imageSrc}
          durationMs={introConfig.durationMs}
          title={introConfig.title}
          subtitle={introConfig.subtitle}
          onFinish={handleIntroFinish}
        />
      )}
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
