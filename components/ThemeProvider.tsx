'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'

// Shape returned by sanity-plugin-color-input
interface SanityColor {
  hex?: string
  alpha?: number
  hsl?: { h: number; s: number; l: number; a?: number }
}

interface ThemeColors {
  primary?: SanityColor
  primaryForeground?: SanityColor
  secondary?: SanityColor
  secondaryForeground?: SanityColor
  accent?: SanityColor
  accentForeground?: SanityColor
  background?: SanityColor
  foreground?: SanityColor
  card?: SanityColor
  cardForeground?: SanityColor
  muted?: SanityColor
  mutedForeground?: SanityColor
  destructive?: SanityColor
  border?: SanityColor
  ring?: SanityColor
}

interface ThemeConfig {
  name: string
  colors?: ThemeColors
  typography?: {
    borderRadius?: string
    fontFamily?: string
  }
}

/** Convert a SanityColor object to the "H S% L%" string Tailwind CSS vars expect */
function toHsl(color: SanityColor | undefined): string | null {
  if (!color?.hsl) return null
  const { h, s, l } = color.hsl
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig | null>(null)

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const activeTheme = await client.fetch<ThemeConfig>(
          `*[_type == "themeConfig" && isActive == true][0]{
            name,
            colors,
            typography
          }`
        )
        if (activeTheme) setTheme(activeTheme)
      } catch (err) {
        console.warn('Failed to load theme from Sanity, using default', err)
      }
    }
    loadTheme()
  }, [])

  useEffect(() => {
    if (!theme) return
    const root = document.documentElement

    if (theme.colors) {
      const map: Record<keyof ThemeColors, string> = {
        primary: '--primary',
        primaryForeground: '--primary-foreground',
        secondary: '--secondary',
        secondaryForeground: '--secondary-foreground',
        accent: '--accent',
        accentForeground: '--accent-foreground',
        background: '--background',
        foreground: '--foreground',
        card: '--card',
        cardForeground: '--card-foreground',
        muted: '--muted',
        mutedForeground: '--muted-foreground',
        destructive: '--destructive',
        border: '--border',
        ring: '--ring',
      }
      for (const [key, cssVar] of Object.entries(map) as [keyof ThemeColors, string][]) {
        const hsl = toHsl(theme.colors[key])
        if (hsl) root.style.setProperty(cssVar, hsl)
      }
    }

    if (theme.typography?.borderRadius) {
      root.style.setProperty('--radius', theme.typography.borderRadius)
    }
    if (theme.typography?.fontFamily) {
      root.style.setProperty('--font-sans', theme.typography.fontFamily)
    }
  }, [theme])

  return <>{children}</>
}
