## Allysha & Kevin · Wai Kai Wedding Book

This project is a **tropical, book-style wedding website** for Allysha and Kevin’s celebration at **Wai Kai, Oʻahu, Hawaiʻi** on **September 18, 2026**.

The layout is designed as an open book: each "page" has a **left and right section**, and guests turn the page using navigation buttons at the bottom, with a subtle **page‑turn animation** and lush greenery-inspired visuals.

### Run the site locally

- **Install dependencies** (already done if you ran `npm install`):

```bash
npm install
```

- **Start the development server**:

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

### Where to customize content

- **Main layout and copy**: `src/App.jsx`
  - The `spreads` array at the top controls each book spread (left/right page content).
  - You can edit headings, text, schedule times, travel notes, and RSVP wording directly there.
- **Styling & animations**:
  - Book layout, tropical background, and page‑turn animation: `src/App.css`
  - Global fonts and base styles: `src/index.css`

### Page‑turn behavior

- The **Previous page** and **Next page** buttons at the bottom navigate between spreads.
- Each click triggers a short **3D‑style page‑turn animation** to keep the feeling of a real book.

### Deployment

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder and can be deployed to static hosting (e.g. Netlify, Vercel, or GitHub Pages).
