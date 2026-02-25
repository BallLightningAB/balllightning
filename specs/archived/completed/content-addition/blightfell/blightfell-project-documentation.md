**Project: Lead Integrations Engineer (Web3 \& Game Services)**

Merlyn Labs (Blightfell) — Contract via Ball Lightning AB ·

Contract Sep 2025 - Present · 5 mos

Remote

Owned the end-to-end Favor system: on-chain purchase → backend verification → Neon Postgres ledger/credits → in-game balance \& spend, with an auditable trail and recovery-friendly operations.



Built the Blightfell.com purchase experience (Next.js/React/TypeScript, Tailwind, shadcn/ui): auth + wallet linking, pricing/quantity UX, and transaction handoff to credit Favor reliably.



Implemented idempotent spend + anti-double-spend protections using Upstash Redis guards/locks + Neon ledger semantics to handle concurrency and retries safely.



Shipped Unity ↔ backend server-to-server endpoints for balance, spend, ownership/entitlements, plus cron/credit jobs and production runbooks for Early Access operations.



Delivered the Blood Moon bundle flow spanning a second chain (e.g., Arbitrum) with automated crediting/airdrops to Abstract Global Wallet, integrating auth + ownership checks across systems.



Took ownership of unfamiliar legacy infrastructure when needed (e.g., AWS EC2/RDS/EBS backup + cost containment for KOTE) and documented constraints/risks for the team.



Skills: Technical Project Management · Systems Integration · Full-Stack Development · API Integration · Front-End Development



**Images:**

"\\src\\assets\\portfolio\\blightfell\\blightfell-site.jpg"

Live landing and purchase site where players connect a wallet, acquire Favor, and manage key Web3/game entry flows. Serves as the front door to the verified crediting pipeline powering in-game Favor balance.



Screenshot of the live purchase UX on Blightfell.com where players connect a wallet and acquire Favor (quantity + cost preview). The on-chain purchase is verified server-side and credited idempotently into the Favor ledger so balance is reliably available in-game.



"\\src\\assets\\portfolio\\blightfell\\blightfell-steam"

Blightfell on Steam — Early Access

Steam store page for Blightfell. Favor purchased on Blightfell.com is reflected in-game via backend APIs and ledger-based accounting to keep balances consistent and prevent duplicate spend.



"\\src\\assets\\portfolio\\blightfell\\blightfell-ingame.jpg"

In-game Favor balance — spendable session currency

In-game UI showing the player’s current Favor balance and how Favor is consumed for gameplay/session actions. This surface is backed by server-to-server APIs and ledger-based accounting so balance reflects verified purchases and prevents duplicate spends across retries or concurrent requests.



"\\src\\assets\\portfolio\\blightfell\\blightfell-architecture.jpg"

Integrations \& Infrastructure (Blightfell.com)

High-level system map of the Favor economy: Blightfell.com (Next.js) connects players and the Unity client to backend services that verify on-chain purchases, write to an auditable Neon Postgres ledger, enforce anti-double-spend via Redis guards, and coordinate jobs/schedulers. Also shows CI/CD, logging/monitoring, and external providers (game backend + chain provider).

