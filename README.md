# Nuxt Solitaire

This is a nuxt implementation of the popular single-player card game Klondike Solitaire.

## ToDo

- [x] Add undo/redo features [(See)](https://vueuse.org/core/useRefHistory/#userefhistory)
- [x] Add game reset
- [x] Add timer/score system
- [x] Save scores in table
- [x] Add about page with rules for example
- [x] Add auto complete once all cards are flipped and on the tableau piles
- [x] Translations
- [x] Add filters to stats table
- [ ] Detect unwinnable game
- [ ] Rework global stlying and add dark mode
- [ ] Rework scoring system
- [ ] Save stats in real Database and link to user accounts
- [ ] Feedback
    - Edit card color
    - Edit button color
    - Fix finish button -> can be triggerd again
    - Fix timer from running again after revisiting tab after winning

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```
