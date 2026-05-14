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
  displayPolicy: 'every-load' | 'once-per-session'
  imageSrc: string
  title: string
  subtitle: string
  durationMs: number
  imageDisplayMode: 'cinematic' | 'contain' | 'cover'
}

interface SiteConfigResponse {
  introOverlay?: Partial<IntroConfig>
}

const fallbackIntroConfig: IntroConfig = {
  enabled: false,
  displayPolicy: 'once-per-session',
  imageSrc: '/intro/intro-landing.webp',
  title: 'Capricho Azahar 3D',
  subtitle: 'Donde las ideas toman forma',
  durationMs: 4500,
  imageDisplayMode: 'cinematic',
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(false)
  const [introConfig, setIntroConfig] = useState<IntroConfig>(fallbackIntroConfig)
  const [introResolved, setIntroResolved] = useState(false)

  useEffect(() => {
    const loadIntroConfig = async () => {
      try {
        const data = await client.fetch<SiteConfigResponse>(
          `*[_type == "siteConfig" && _id == "siteConfig"][0]{
            "introOverlay": introOverlay {
              enabled,
              displayPolicy,
              imageSrc,
              title,
              subtitle,
              durationMs,
              imageDisplayMode
            }
          }`
        )

        if (data?.introOverlay) {
          const intro = data.introOverlay
          setIntroConfig({
            enabled: intro.enabled ?? fallbackIntroConfig.enabled,
            displayPolicy: intro.displayPolicy || fallbackIntroConfig.displayPolicy,
            imageSrc: intro.imageSrc || fallbackIntroConfig.imageSrc,
            title: intro.title || fallbackIntroConfig.title,
            subtitle: intro.subtitle || fallbackIntroConfig.subtitle,
            durationMs: intro.durationMs || fallbackIntroConfig.durationMs,
            imageDisplayMode:
              intro.imageDisplayMode || fallbackIntroConfig.imageDisplayMode,
          })

          if (intro.enabled) {
            const displayPolicy = intro.displayPolicy || fallbackIntroConfig.displayPolicy
            const shouldShow =
              displayPolicy === 'every-load' || !sessionStorage.getItem('introSeen')

            if (shouldShow) {
              setShowIntro(true)
              if (displayPolicy === 'once-per-session') {
                sessionStorage.setItem('introSeen', '1')
              }
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load intro config from Sanity, using default', err)
      } finally {
        setIntroResolved(true)
      }
    }

    loadIntroConfig()
  }, [])

  const handleIntroFinish = () => {
    setShowIntro(false)
  }

  return (
    <>
      {!introResolved && (
        <div className="fixed inset-0 z-[9998] bg-background" aria-hidden="true" />
      )}
      {showIntro && introConfig.enabled && (
        <IntroOverlay
          imageSrc={introConfig.imageSrc}
          durationMs={introConfig.durationMs}
          title={introConfig.title}
          subtitle={introConfig.subtitle}
          imageDisplayMode={introConfig.imageDisplayMode}
          onFinish={handleIntroFinish}
        />
      )}
      <main className={!introResolved || showIntro ? 'invisible' : 'visible'}>
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
