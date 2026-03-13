# CodePocket

A personal code snippet manager built with Next.js. Save, organize, search, and annotate your code snippets — with AI assistance powered by Google Gemini.

---

## Features

- **Snippet Management** — Create, edit, delete, and organize code snippets with title, description, language, tags, and folder
- **Three View Modes** — Card grid, compact grid, and list view, switchable from the dashboard toolbar
- **AI Features (Gemini)** — Automatically explain code, suggest tags, generate a title, and detect the programming language with one click
- **Syntax Highlighting** — 15+ themes (VS Code Dark+, Dracula, Nord, Night Owl, Synthwave '84, and more) powered by Shiki and React Syntax Highlighter
- **Search & Filters** — Real-time search by title/description; filter by folder, tag, and language simultaneously
- **Folder & Tag Organization** — Built-in folders (Personal, Work, Open Source, Learning, Archived) plus custom per-snippet tags
- **Persistent Settings** — Appearance, code viewing, editor, and snippet organization preferences stored in `localStorage`
- **Dark / Light / System Theme** — One-click theme toggle with `next-themes`
- **Context Menus** — Right-click any snippet card for quick actions (edit, delete, move to folder)
- **Command Palette** — `⌘K` / `Ctrl+K` to search snippets from the header
- **Sound Effects** — Subtle audio feedback on interactions (can be disabled in Settings)
- **No Backend Required** — All snippet data is stored in the browser's `localStorage`

---

## Tech Stack

| Layer               | Technology                              |
| ------------------- | --------------------------------------- |
| Framework           | Next.js 16 (App Router)                 |
| Language            | TypeScript 5                            |
| UI Library          | React 19                                |
| Styling             | Tailwind CSS v4                         |
| Components          | shadcn/ui + custom cubby-ui             |
| Animations          | Framer Motion                           |
| Syntax Highlighting | Shiki, React Syntax Highlighter         |
| AI                  | Google Gemini (`@google/genai`)         |
| Icons               | HugeIcons, Lucide React, Simple Icons   |
| Toasts              | sileo / sonner                          |
| Themes              | next-themes                             |
| 3D Effects          | Three.js (landing page particle effect) |

---

## Supported Languages

JavaScript, TypeScript, Python, Go, Rust, Java, C++, HTML, CSS, JSON, Markdown, SQL, Shell

---

## Project Structure

```
codepocket/
├── app/
│   ├── layout.tsx              # Root layout (fonts, theme, settings providers)
│   ├── page.tsx                # Entry point → MainPage
│   └── api/ai/
│       ├── explain-code/       # POST — explains what a snippet does
│       ├── suggest-tags/       # POST — suggests relevant tags
│       ├── generate-title/     # POST — generates a snippet title
│       └── detect-language/    # POST — detects the programming language
├── components/
│   ├── landing/                # Landing / welcome page
│   ├── dashboard/              # Main dashboard (header, view switcher, filters)
│   ├── sidebar/                # Collapsible sidebar (folders, tags)
│   ├── header/                 # Search bar + command palette + new snippet button
│   ├── snippet-card/           # Card view item
│   ├── snippet-list/           # List view item
│   ├── snippet-compact-grid/   # Compact grid view item
│   ├── snippet-grid/           # Grid layout wrapper
│   ├── editor-modal/           # Create / edit snippet modal with AI buttons
│   ├── settings-modal/         # Settings dialog (5 tabs)
│   ├── code-block/             # Syntax-highlighted code preview
│   ├── empty-state/            # No-results UI
│   ├── global-context-menu.tsx # App-wide right-click menu
│   └── ui/                     # shadcn/ui + cubby-ui primitives
├── contexts/
│   └── settings-context.tsx    # Global settings context
├── hooks/
│   ├── use-snippets.ts         # CRUD + localStorage persistence
│   ├── use-filters.ts          # Search, folder, tag, language filtering
│   ├── use-settings.ts         # Settings state + localStorage sync
│   ├── use-sound.ts            # Sound playback hook
│   └── use-mobile.ts           # Mobile breakpoint detection
├── lib/
│   ├── types.ts                # Snippet type, LANGUAGES, FOLDERS constants
│   ├── syntax-themes.ts        # Theme name → Prism theme object mapping
│   ├── sound-engine.ts         # Web Audio API-based sound engine
│   ├── toast-utils.ts          # Typed toast helpers
│   └── utils.ts                # cn() utility
└── services/
    └── geminiService.ts        # Gemini API calls (explain, tags, title, language)
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

The app works without this key, but all AI features (explain code, suggest tags, generate title, detect language) will be unavailable.

> Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build for production         |
| `npm start`     | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

## Settings

The settings modal (gear icon in the dashboard header) has five tabs:

| Tab              | Options                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------- |
| **Appearance**   | Theme (light/dark/system), accent color, font size                                        |
| **Code Viewing** | Syntax theme for light/dark mode, line numbers, line wrapping, code font size             |
| **Editor**       | Font family, font size, tab size, spaces vs tabs, word wrap, auto-save                    |
| **Snippets**     | Default language, default folder, sort order, view mode, search behavior, tag suggestions |
| **General**      | Interface language, keyboard shortcuts, notifications, sound effects                      |

All settings persist in `localStorage` and apply immediately without a page reload.

---

## AI API Routes

All routes accept `POST` requests with a JSON body.

| Route                     | Body                 | Response             |
| ------------------------- | -------------------- | -------------------- |
| `/api/ai/explain-code`    | `{ code, language }` | `{ description }`    |
| `/api/ai/suggest-tags`    | `{ code }`           | `{ tags: string[] }` |
| `/api/ai/generate-title`  | `{ code }`           | `{ title }`          |
| `/api/ai/detect-language` | `{ code }`           | `{ language }`       |

---

## Data Storage

All snippets are stored in `localStorage` under the key `CodePocket_data`. No database or external backend is required. Clearing browser storage will remove all saved snippets.

Each snippet has the following shape:

```ts
interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string; // one of LANGUAGES constant
  tags: string[];
  folder: string; // one of FOLDERS constant
  createdAt: number;
  updatedAt: number;
}
```

---

## Deployment

Deploy to [Vercel](https://vercel.com) in one click — add `GEMINI_API_KEY` as an environment variable in the project settings.

```bash
npm run build
npm start
```
