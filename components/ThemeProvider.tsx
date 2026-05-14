'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'

interface ThemeConfig {
  name: string
  colors?: {
    primary?: string
    primaryForeground?: string
    secondary?: string
    secondaryForeground?: string
    accent?: string
    accentForeground?: string
    background?: string
    foreground?: string
    card?: string
    cardForeground?: string
    muted?: string
    mutedForeground?: string
    destructive?: string
    destructiveForeground?: string
    border?: string
    input?: string
    ring?: string
  }
  typography?: {
    borderRadius?: string
    fontFamily?: string
  }
}

const defaultTheme: ThemeConfig = {
  name: 'default',
  colors: {
    primary: '8 75% 45%',
    primaryForeground: '0 0% 100%',
    secondary: '5 40% 30%',
    secondaryForeground: '0 0% 100%',
    accent: '15 70% 55%',
    accentForeground: '0 5% 97%',
    background: '0 5% 97%',
    foreground: '0 5% 20%',
    card: '0 0% 100%',
    cardForeground: '0 5% 20%',
    muted: '0 3% 95%',
    mutedForeground: '0 3% 45%',
    destructive: '0 84% 60%',
    destructiveForeground: '0 0% 100%',
    border: '0 3% 89%',
    input: '0 3% 89%',
    ring: '8 75% 45%',
  },
  typography: {
    borderRadius: '0.75rem',
  },
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)

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
        if (activeTheme) {
          setTheme({ ...defaultTheme, ...activeTheme })
        }
      } catch (err) {
        console.warn('Failed to load theme from Sanity, using default', err)
      }
    }

    loadTheme()
  }, [])

  // Inyectar variables CSS dinámicamente
  useEffect(() => {
    const root = document.documentElement
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        if (value) {
          const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
          root.style.setProperty(cssVar, value)
        }
      })
    }
    if (theme.typography?.borderRadius) {
      root.style.setProperty('--radius', theme.typography.borderRadius)
    }
  }, [theme])

  return <>{children}</>
}
