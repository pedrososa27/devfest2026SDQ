# DevFest Santo Domingo - Landing Page

Una landing page moderna y responsiva para el evento DevFest Santo Domingo, construida con Next.js, React y Tailwind CSS.

## 🚀 Características

- **Header Responsivo**: Navegación fija con menú móvil
- **Hero Section**: Llamada a la acción convincente con gradientes
- **Features**: Sección destacando los beneficios del evento
- **Speakers**: Galería de presentadores destacados
- **Pricing**: Tres planes de tickets con características diferenciadas
- **CTA Final**: Sección de llamada a la acción antes del footer
- **Footer**: Información completa con enlaces sociales

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn

## 🛠️ Instalación

El proyecto ya está configurado. Para ejecutarlo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
app/
├── components/
│   ├── Header.tsx       - Navegación principal con menú responsivo
│   ├── Hero.tsx         - Sección principal con CTA
│   ├── Features.tsx     - Beneficios del evento
│   ├── Speakers.tsx     - Presentadores destacados
│   ├── Pricing.tsx      - Opciones de tickets
│   ├── CTA.tsx          - Llamada a la acción final
│   └── Footer.tsx       - Pie de página
├── page.tsx             - Página principal
└── layout.tsx           - Layout global
```

## 🎨 Personalización

### Colores

Los colores primarios están definidos en `tailwind.config.ts`:

```typescript
colors: {
  primary: '#2563EB',    // Azul
  secondary: '#7C3AED',  // Púrpura
  accent: '#EC4899',     // Rosa
}
```

### Contenido

- **Header**: Edita `app/components/Header.tsx` para cambiar navegación
- **Precios**: Modifica el array `tiers` en `app/components/Pricing.tsx`
- **Presentadores**: Actualiza el array `speakers` en `app/components/Speakers.tsx`

## 📱 Responsive Design

El diseño es completamente responsivo usando:
- Tailwind CSS Grid y Flexbox
- Media queries con `md:` y `lg:` prefixes
- Menú móvil adaptativo

## 🔗 Enlaces y Navegación

Los enlaces de navegación apuntan a secciones usando anchors (`#`):
- `#about` - Sobre el evento
- `#schedule` - Horario
- `#pricing` - Precios
- `#speakers` - Presentadores

## 📦 Dependencias Principales

- **Next.js 15+**: Framework React
- **React 19+**: Librería UI
- **Tailwind CSS 3+**: Utilidades CSS

## 🚀 Despliegue

Para deployar en Vercel:

```bash
npm run build
# Vercel detectará automáticamente que es un proyecto Next.js
```

O usa:
```bash
vercel
```

## 📝 Notas de Desarrollo

- Usa componentes `'use client'` para interactividad
- Los componentes sin estado son estáticos por defecto
- Todos los estilos usan Tailwind CSS
- Los iconos se implementan con emojis por simplicidad

## 🤝 Contribución

Para agregar nuevas secciones:

1. Crea un nuevo archivo en `app/components/NuevaSeccion.tsx`
2. Implementa el componente
3. Importa en `app/page.tsx`
4. Integra en el layout principal

## 📄 Licencia

Este proyecto es parte de DevFest Santo Domingo 2026.

---

**Última actualización**: Abril 2026
