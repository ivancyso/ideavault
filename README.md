# IdeaVault 💡

A daily-curated startup idea directory. One validated startup idea every day — with market research, business model, and go-to-market strategy.

## Structure

- `index.html` — Homepage with filterable idea grid
- `idea.html` — Individual idea detail page (loaded dynamically)
- `ideas.json` — The data file. Each new idea is added here daily.
- `style.css` — All styles
- `app.js` — Client-side JS

## Adding a new idea

Append a new object to `ideas.json` following the existing schema:

```json
{
  "id": "002",
  "slug": "your-idea-slug",
  "date": "YYYY-MM-DD",
  "title": "Idea Title",
  "tagline": "One line that captures the value prop.",
  "category": "Category",
  "stage": "Idea",
  "market_size": "Market size description",
  "problem": "Problem statement...",
  "solution": "Solution description...",
  "business_model": "How it makes money...",
  "why_now": "Timing rationale...",
  "moat": "Defensibility...",
  "go_to_market": "GTM strategy...",
  "risks": "Risk 1. Risk 2. Risk 3.",
  "similar_companies": "Comp 1, Comp 2, Comp 3",
  "founder_fit": "Ideal founder background...",
  "sources": ["https://source1.com", "https://source2.com"]
}
```

## Deployment

Deployed to Vercel. Auto-deploys on push to `main`.

Built with [IdeaVault](https://github.com/ivancyso/ideavault) — open source.
