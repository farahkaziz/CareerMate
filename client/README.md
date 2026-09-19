# CareerMate Client (Jobs)

This is a minimal React + Vite frontend for the CareerMate Jobs page.

Run locally:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173 to view the Jobs page. The dev server proxies `/api` to `http://localhost:5000`, so the existing backend does not need changes.

The Jobs page calls `/api/jobs?query=...` and displays job cards.
