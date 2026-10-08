# Rule: No Hardcoded Data & Strict Env Isolation

1. Never hardcode mock product data, categories, prices, or user credentials in the main project.
2. All product, category, and market data must be fetched dynamically from the configured BazarDor APIs (`BASE_URL_1` with automated fallback to `BASE_URL_2`).
3. All secrets and API endpoints must reside exclusively in `.env`.
4. Ensure `.env*` and `Project Documentation/` remain ignored in `.gitignore` to prevent any data or secrets from leaking to git.
5. All UI must be 100% faithful to the Penpot design tokens and Bengali typography standards.
