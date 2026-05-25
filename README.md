# CampusCompass - College Discovery Platform

CampusCompass is a production-grade, highly responsive, and architecturally clean frontend application designed for discovering, filtering, and comparing academic institutions in India. Inspired by modern SaaS dashboard interfaces and college databases (like Collegedunia and Careers360), this platform delivers a seamless, high-fidelity experience optimized for usability, data clarity, and API caching state handling.

---

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **State Management**:
  - **Global & Client State**: Zustand (for light, high-performance client state: authentication, comparison lists, filters, active UI states)
  - **Server State Handling**: TanStack Query (`@tanstack/react-query`) (for query caching, pagination, infinite scroll, loading/error states, and mock API simulation)
- **Styling**: Tailwind CSS + `clsx` / `tailwind-merge` for modular UI combinations
- **Icons**: Lucide React
- **Animations**: Framer Motion (for modal transitions, drawer slides, and card animations)

---

## 🛠️ Architecture Explanation

We implement a **Feature-based architecture** under `src/` to ensure high modularity, scalability, and ease of maintainability. This decouples shared global blocks from specific feature modules.

```
src/
  app/                     # Next.js App Router pages and layouts
    auth/                  # Authentication subpages (Login, Signup)
    colleges/              # College Explorer and Detail screens
    compare/               # Side-by-side Comparative grid
    dashboard/             # User personalised saved bookmarks board
  components/              # Shared reusable UI elements (Button, Input, Card, Modal, etc.)
  features/                # Core product modules (landing, listings, detail, compare, auth, dashboard)
  services/                # Centralized simulated API layers & Mock Databases
  store/                   # State management (Zustand stores for Auth, Saved, Compare)
  types/                   # TypeScript interfaces and type definitions
  lib/                     # Global utilities (class merging, currency formatters)
  constants/               # Static configurations and range limits
```

### Advantages:
1. **Domain Isolation**: Code related to the Compare engine is isolated from Auth, minimizing merge conflicts and code scattering.
2. **Type Safety**: Fully defined types for all entities ensuring zero compile-time bugs.
3. **Decoupled API Layer**: Centralized API abstraction using async/await with simulated latencies (300ms–800ms) to model real-world networking constraints.

---

## 🗂️ Reusable Component System

We built a custom component library designed with strict UX aesthetics and full accessibility (ARIA, focus styling) in mind:

- **`<Button />`**: Supports multiple variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`), sizing profiles, and built-in loading spinner animations.
- **`<Input />`**: Standard inputs supporting left-aligned decorative icons and crisp focus rings.
- **`<Checkbox />`**: Self-contained check inputs designed with custom SVG markers, ideal for filters and checklist comparison matrices.
- **`<Slider />`**: A custom dual-thumb range selector overlay mapping annual tuition limits dynamically without external slide packages.
- **`<RatingBadge />`**: A custom badge color-coding ratings dynamically (emerald-green for excellent `>4.5`, amber for very good `>3.8`, slate for decents) with star icons.
- **`<SkeletonLoader />`**: Modular loading placeholders matching Listings, Details, and Cards layouts perfectly.
- **`<EmptyState />`**: Visually beautiful panels displaying friendly icons, descriptive messages, and CTA buttons when filters or dashboards return 0 items.
- **`<Modal />`**: Smooth overlays utilizing Framer Motion for gallery and filter drawer operations.
- **`<Tabs />`**: Context-driven tabs engine mapping list, triggers, and content nodes dynamically.
- **`<Toast />`**: A premium notifications queue system triggering overlay alerts (`toast.success`, `toast.error`, `toast.info`).

---

## 🧠 State Management Strategy

We divide the application state into two dedicated layers:

### 1. Global & Local Client State (Zustand)
- **`useAuthStore`**: Handles user authentication, bookmark lists (saved colleges), saved comparisons, and recently viewed browser history. It automatically syncs adjustments with `localStorage` for session persistence.
- **`useCompareStore`**: Tracks selected colleges for side-by-side comparisons (enforcing a maximum limit of 3, preventing duplicates, and rendering a floating bottom drawer).
- **`useFilterStore`**: Manages filter metrics (fee ranges, check lists, ratings) and text search queries. Includes a master reset command.

### 2. Server & Cache State (TanStack Query)
Handles data fetching and indexing asynchronously.
- Caches search queries (`staleTime: 60000ms`) to optimize performance and prevent redundant API queries.
- Manages pagination page indices seamlessly.
- Handles visual loading skeleton state transitions during transitions.

---

## 🚀 Setup & Run Instructions

Follow these simple steps to launch the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### 3. Verify Production Build
To test compilation performance:
```bash
npm run build
npm run start
```
