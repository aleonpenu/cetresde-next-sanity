# 📋 Componentes a Integrar en cetresde-next-sanity

## ✅ Ya Listo
- Estructura Next.js 16 + React 19
- Sanity CMS configurado
- Tailwind CSS v3
- Sistema de rutas

## 📦 Componentes por Integrar (desde spark-template)

### 1. **Componentes Principales** (HIGH PRIORITY)
- [ ] **Hero.tsx** - Banner principal con animaciones
- [ ] **Services.tsx** - Grid de servicios de impresión 3D
- [ ] **Portfolio.tsx** - Galería de trabajos con tabs y modal
- [ ] **Contact.tsx** - Formulario de contacto
- [ ] **Footer.tsx** - Pie de página

### 2. **Componentes UI de Radix** (Copy as-is)
Archivos base que funcionan directamente:
```
- button.tsx
- card.tsx
- input.tsx
- textarea.tsx
- select.tsx
- dialog.tsx
- tabs.tsx
- badge.tsx
- form.tsx
- label.tsx
- separator.tsx
```

### 3. **Componentes 3D** (MEDIUM PRIORITY)
- [ ] **Printer3D.tsx** - Componente 3D con Three.js
- [ ] **LogoShape.tsx** - Forma animada del logo

### 4. **Componentes Personalizados** (MEDIUM PRIORITY)
- [ ] **Header/Navigation** - Menú principal adaptado a Next.js
- [ ] **ErrorFallback.tsx** - Manejo de errores

---

## 🔧 Plan de Integración

### Fase 1: UI Basics (Ready Now)
Copiar directamente desde spark-template/src/components/ui/:
- button, card, input, textarea, label, form
- select, dialog, tabs, badge, separator

### Fase 2: Componentes Principales (Next Week)
Adaptar para Next.js + Sanity:
- Hero → Datos de Sanity (configuración general)
- Services → Query a Sanity (servicios dinámicos)
- Portfolio → Query a Sanity (trabajos dinámicos)
- Contact → Envío a Sanity o API externa
- Footer → Datos de configuración de Sanity

### Fase 3: Componentes Avanzados (Future)
- Printer3D con Three.js
- LogoShape animado
- Integraciones de e-commerce

---

## 📁 Estructura Esperada (Post-Integración)

```
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── form.tsx
│   ├── dialog.tsx
│   ├── tabs.tsx
│   └── ... (otros componentes básicos)
├── Hero.tsx
├── Services.tsx
├── Portfolio.tsx
├── Contact.tsx
├── Footer.tsx
├── Header.tsx
└── ThreeDComponents/
    ├── Printer3D.tsx
    └── LogoShape.tsx
```

---

## 🚀 Siguiente Paso
1. Copiar componentes UI de Fase 1
2. Crear versión simple de Hero para próxima sesión
3. Conectar con Sanity CMS
