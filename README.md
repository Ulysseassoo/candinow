# Candinow 🚀

> Un tracker de candidatures moderne, offline-first et privacy-first pour simplifier votre recherche d'emploi.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://candinow.com)
[![Built with React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-orange)](https://web.dev/progressive-web-apps/)
[![License: Custom](https://img.shields.io/badge/License-Source--Available-yellow.svg)](LICENSE)

![Candinow Banner](https://via.placeholder.com/1200x400/FFB7C5/2D3142?text=Candinow+-+Job+Application+Tracker)

## ✨ Pourquoi Candinow ?

La recherche d'emploi peut être stressante. Suivre ses candidatures dans un tableur Excel devient vite laborieux et inefficace. **Candinow** a été créé pour résoudre ce problème avec une solution simple, gratuite et respectueuse de vos données.

### 🎯 Fonctionnalités principales

- **📬 Relances automatiques intelligentes**
  - Système d'escalade : 5 jours → 5 jours → 7 jours
  - Statut "ghosted" automatique après 3 relances
  - Vue dédiée "Actions du jour"

- **📊 Dashboard avec statistiques**
  - Répartition par statut (candidatures, entretiens, offres, rejets)
  - Évolution temporelle de vos candidatures
  - Statistiques par domaine d'activité

- **💾 100% Offline & Privacy-First**
  - Toutes vos données restent locales (localStorage)
  - Aucun backend, aucun tracking
  - Fonctionne entièrement hors ligne

- **⚡ PWA Installable**
  - Installez l'app sur votre ordinateur ou téléphone
  - Notifications pour les relances (avec permission)
  - Cache intelligent pour une performance optimale

- **🎨 Personnalisation**
  - 3 thèmes professionnels (Rose, Corporate, Classic)
  - 2 dark modes pour réduire la fatigue oculaire
  - Interface responsive mobile/tablet/desktop

- **📥 Import/Export**
  - Export JSON pour backup
  - Export CSV pour analyse externe
  - Import JSON pour restauration

## 🚀 Démarrage rapide

### Prérequis

- [Bun](https://bun.sh/) v1.0+ (recommandé) ou Node.js 18+
- Git

### Installation

```bash
# Cloner le repo (si disponible publiquement)
git clone https://github.com/username/candinow.git
cd candinow

# Installer les dépendances
bun install

# Lancer le serveur de développement
bun --bun run dev
```

L'application sera disponible sur `http://localhost:3000`

### Build de production

```bash
# Build optimisé pour Vercel (recommandé)
bun run build

# Build local avec pre-rendering Puppeteer
bun run build:local

# Preview du build
bun run preview
```

## 💻 Stack technique

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - File-based routing avec code splitting
- **Zustand** - State management avec persist middleware
- **Tailwind CSS v4** - Styling avec @tailwindcss/vite
- **Framer Motion** - Animations fluides
- **Recharts** - Graphiques et visualisations
- **shadcn/ui** - Composants UI réutilisables

### Tooling
- **Vite 7** - Build tool ultra-rapide
- **Vitest** - Testing framework
- **ESLint + Prettier** - Code quality

### PWA
- **vite-plugin-pwa** - Service Worker avec Workbox
- **Web Vitals** - Mesures de performance

### Deployment
- **Vercel** - Hosting avec optimisations automatiques
- **Resend** - Service email pour le feedback

## 📁 Structure du projet

```
candinow/
├── public/                 # Assets statiques
├── scripts/               # Scripts de build
│   ├── generate-static-files.mjs  # Sitemap & robots.txt
│   └── prerender.mjs              # Pre-rendering Puppeteer
├── src/
│   ├── components/        # Composants React
│   │   ├── ui/           # shadcn/ui components
│   │   ├── dashboard/    # Dashboard components
│   │   └── settings/     # Settings components
│   ├── lib/              # Utilitaires
│   │   ├── dateUtils.ts
│   │   ├── followUpUtils.ts
│   │   ├── themes.ts
│   │   └── exportUtils.ts
│   ├── routes/           # TanStack Router routes
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript types
│   └── main.tsx          # Entry point
├── api/                  # Serverless functions (Vercel)
│   └── feedback.ts
└── package.json
```

## 🎨 Thèmes disponibles

| Thème | Description | Type |
|-------|-------------|------|
| **Rose** | Palette pastel moderne et douce | Light |
| **Corporate** | Dark mode professionnel (LinkedIn style) | Dark |
| **Classic** | Dark mode sobre avec touches violettes | Dark |

## 📝 Scripts disponibles

```bash
# Développement
bun --bun run dev              # Serveur de dev (port 3000)

# Build
bun run build                  # Build production (Vercel)
bun run build:local            # Build avec pre-rendering local
bun run preview                # Preview du build

# Qualité du code
bun run lint                   # ESLint
bun run format                 # Prettier
bun run check                  # Format + Lint fix

# Tests
bun run test                   # Run tests avec Vitest

# Composants
bun run add:component          # Ajouter un composant shadcn/ui
```

## 🔧 Configuration

### Variables d'environnement

Pour activer le système de feedback par email :

```env
RESEND_API_KEY=your_resend_api_key
RESEND_EMAIL_TO=your@email.com
VITE_BACKEND_API_URL=yourbackendapi.com
```

### Service Worker

Le service worker gère automatiquement :
- Cache des assets (JS, CSS, HTML, images)
- Stratégie Network-Only pour les API routes
- Fallback vers index.html pour les routes SPA

### Guidelines

- Respectez la structure du code existante
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation si nécessaire
- Suivez les conventions TypeScript

## 📄 Licence

Ce projet utilise une **licence personnalisée "Source-Available"**.

### ✅ Vous pouvez :
- Consulter et étudier le code source
- Utiliser l'application sur [candinow.com](https://candinow.com)
- Fork le repo pour apprendre
- Soumettre des pull requests et contribuer

### ❌ Vous ne pouvez pas (sans permission écrite) :
- Utiliser le code à des fins commerciales
- Redistribuer ou publier des versions modifiées
- Héberger votre propre instance de Candinow
- Utiliser le code dans des projets commerciaux ou propriétaires

### 💼 Licence commerciale

Pour un usage commercial, déploiement en entreprise, ou solutions white-label, contactez : **assooulysse@gmail.com**

Voir le fichier [LICENSE](LICENSE) pour tous les détails légaux.

## 👨‍💻 Auteur

**Ulysse**

- 🌐 [Site web](https://candinow.com)
- 📧 [Email](mailto:assooulysse@gmail.com)

---

<p align="center">
  <em>Si ce projet vous aide dans votre recherche d'emploi, n'hésitez pas à le partager ! 🚀</em>
</p>
