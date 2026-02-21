Ball Lightning AB is a software consulting and product development company specialising in full-stack web development, systems integration, and AI-driven solutions. Founded by Nicolas Brulay in Mölndal, Sweden.

This repository is the **company site** for Ball Lightning AB — an SEO-first, multi-page site built on TanStack Start.

📚 Shared Brand System
This project is part of the Ball Lightning AB ecosystem and shares architecture, policies, and design systems with other projects. See the [Ball Lightning Brand System](https://github.com/BallLightningAB/brand-system) for shared resources:
- [Shared Ecosystem PDD](https://github.com/BallLightningAB/brand-system/blob/main/shared-ecosystem-pdd.yaml)
- [Shared Architecture](https://github.com/BallLightningAB/brand-system/blob/main/shared-architecture.yaml)
- [Shared Design System](https://github.com/BallLightningAB/brand-system/blob/main/shared-design-system.yaml)

🎯 Purpose
Showcase consulting services (Landing Page, Smart Site, Integrations & APIs), portfolio of completed projects, and provide a direct contact channel.

🧠 Tech Stack
TanStack Start, TailwindCSS v4, Shadcn UI, Biome + Ultracite, Resend (contact form only)

🌐 Domain
https://balllightning.cloud

## Security baseline

Ball Lightning treats secret leakage as a first-class concern:

- **Local pre-commit hooks**: `detect-private-key` and `gitleaks protect` run on every `git commit` via `.pre-commit-config.yaml`. Before committing, install `pre-commit` and `gitleaks` globally and run `pre-commit install` in this repo.
- **CI secret scanning**: The GitHub Actions workflow `.github/workflows/secret-scan.yml` runs Gitleaks on pushes and pull requests to `main`, uploading results to the repository’s Security tab.
- **Shared configuration**: `gitleaks.toml` centralizes allowlists and rules shared between local and CI scans; avoid weakening this config unless there is a clear, documented justification.

## Validation (zod)

This project uses [zod](https://zod.dev/) for runtime validation and type inference.
A central helper is defined in `src/lib/validation/zod.ts`. When adding schemas for
env, loaders, or forms, import `z` from there:

```ts
import { z } from "@/lib/validation/zod";
```

## Project Documentation

This project's documentation is organized as follows:

### Core Documents
- **[Ball Lightning PDD](specs/balllightning-pdd.yaml)** - Project-specific Product Definition Document
- **[Memory Bank Usage Guide](specs/memory-bank/memory-bank-usage.yaml)** - How to use the memory bank system
- **[CHANGELOG](specs/memory-bank/CHANGELOG.yaml)** - Version history and release tracking
- **[Active Context](specs/memory-bank/active-context.yaml)** - Current roadmap and progress tracking

### Shared Ecosystem Resources
- **[Shared Ecosystem PDD](https://github.com/BallLightningAB/brand-system/blob/main/shared-ecosystem-pdd.yaml)** - Ecosystem-wide product definitions
- **[Shared Architecture](https://github.com/BallLightningAB/brand-system/blob/main/shared-architecture.yaml)** - Common architecture patterns and policies
- **[Shared Design System](https://github.com/BallLightningAB/brand-system/blob/main/shared-design-system.yaml)** - Design tokens, components, and guidelines

## License & Funding
- License: see [LICENSE](LICENSE)
- Funding: see [FUNDING.yml](FUNDING.yml)

## © 2026 Nicolas Brulay / Ball Lightning AB