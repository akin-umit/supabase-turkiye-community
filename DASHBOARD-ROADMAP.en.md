# Self-host Dashboard Roadmap

[Turkce](./DASHBOARD-ROADMAP.md)

The self-hosted panel is the real open-source Supabase Studio application. The
main difference from the Cloud dashboard is not styling but its data source.
Status, Compute, GitHub, Last Migration, Last Backup, request charts,
infrastructure topology, project creation, and billing are populated by
Supabase Platform control-plane APIs that are not included in the open-source
Docker stack.

## Available today

- Table and SQL editors
- Auth users and configuration
- Storage bucket/object operations
- Realtime inspector
- Security Advisor
- API keys and JWT/JWKS
- Edge Function listing and invocation
- Service logs when Logflare/Vector is enabled

## Can be added with a management API

The first read-only backend stage is present as the `management-api` service.
It provides service health, a sanitized deployment commit, and operator-verified
backup/migration status. Studio project-home cards are not connected to this
API yet; that panel integration is a separate stage.

- service health and restart counts
- deployed commit and image versions
- last migration and verified backup timestamp
- request, error, and success-rate metrics
- database size, connections, and Storage usage
- Function secret CRUD and controlled restart
- backup creation and restore-drill history
- Function deploy/restart/log operations

## Requires a separate control-plane product

- creating isolated projects/stacks from one panel
- per-project domains, secrets, volumes, and quotas
- organizations, teams, and project switching
- preview branch environments
- managed compute, HA, PITR, and billing

The presence of a Cloud page in the Studio source is not backend support. Those
queries are gated by `IS_PLATFORM` and call Platform APIs that are absent from
the open-source stack.

## Delivery order

1. **Operations dashboard:** health, commit, migration, backup, and Logflare
   metric cards.
2. **Panel operations:** Function secrets/deploy/logs and backup/restore jobs.
3. **Project factory:** isolated stacks through platform adapters, including
   but not limited to Coolify.
4. **Advanced platform:** teams, preview environments, HA/PITR, quotas, and
   optional billing.

A card is not complete until its backend source, authorization boundary,
loading/error state, tests, audit evidence, and rollback behavior are defined.

Every dashboard item added to the public plan must be labeled as planned,
private validation, public release, or upstream candidate. Work that passed on a
private test server is published to the community only after a sanitized PR,
changelog links, and the required forum/Discussion note are prepared. Rule:
[Community Publication Flow](./COMMUNITY-PUBLICATION-FLOW.md).

## Current Delivery Status

- Completed: Operations, Usage, Observability Lite, Dashboard Preferences, and
  persistent Function Secrets CRUD.
- Evidence-only: backup and migration status cards.
- Remaining: backup/restore job execution, migration execution, and a separate
  multi-project control plane.

Every new Studio package must preserve the accepted self-host surfaces first:
Function Secrets, API Keys, JWT/JWKS, Operations, Usage, Observability Lite,
Dashboard Preferences, Connect, status hover, and the copy menu. If one of
those surfaces disappears, the package is not accepted as a release until the
regression is fixed.

## Not Accepted or Easy to Misread

- If the public route returns `503`, dashboard or API-key smoke is not accepted.
  Fix Coolify/Kong backend health first.
- Gate 4 write smoke must not run until Gate 3 read-only routes are stable.
- A Cloud card being present in the Studio source does not mean a self-host
  backend exists for it.
- Backup and migration cards currently show operator evidence only; the panel
  does not yet create backups, run restores, or apply migrations.
- Rendering a route is not dashboard parity. Hover states, dropdowns, filters,
  sort controls, create buttons, nested tabs, empty/error states, and scroll
  coverage on long pages must be checked before a page is marked complete.

## Operator Summary

| Area | Status | Note |
|---|---|---|
| Self-host runtime foundation | Partially complete | Compose, key/JWKS, Function Secrets, Logflare/Vector, and the management API foundation exist. |
| Coolify deployment | Partially complete | Domain/backend-port and host-port traps are documented; every live environment still needs smoke evidence. |
| Cloud-like dashboard | Partial | Some cards exist; Cloud compute/topology/backup/PITR/project factory are not available yet. |
| Multi-project platform | Not started | Requires a separate orchestrator/control-plane product. |

Rough progress estimate: self-host runtime foundation 60-65 percent, Coolify
documentation 70 percent, Cloud-like dashboard 25-30 percent, multi-project
control plane 0-10 percent. These numbers are scope markers, not release
guarantees.

## 2026-07-14 Status Note

Two lessons from the Coolify/Kong work are now part of the public guidance:

1. Kong, the public gateway, must not be blocked by Studio health. Studio can be
   temporarily unhealthy while the gateway still needs to carry public routes.
2. Coolify domain routing is not the same as host-port publishing. Users browse
   `https://supabase.example.com`; the Coolify proxy targets the container's
   internal `kong:8000` backend.

This note is generic community guidance. In production, the final answer still
comes from container health, deployed commit, Compose config, and read-only
smoke evidence.

## 2026-07-14 Interaction Audit

The official Supabase dashboard behavior adds these self-host planning
boundaries:

- The next Project Home package is not broad route cloning. It is compact
  status, copy menu, self-host operations cards, usage cards, and
  backup/migration evidence cards.
- Observability and Logs are not only page lists. They include time-range
  selectors, filters, metric cards, empty/error states, and Logflare/Vector
  source status.
- For Integrations, Data API, Vault, Cron, and Database Webhooks can be shown as
  self-host surfaces when the required extension or service state exists.
  Cloud-only wrappers and integrations are active only when an open-source
  equivalent is deployed and verified.
- For Settings, API Keys, JWT/JWKS, Auth/SMTP, Storage, and Realtime can be
  active when backed by current config. Managed compute, PITR, billing,
  subscription, Cloud Log Drains, and hosted AI Assistant remain disabled or
  planned unless a separate operator backend exists.

The delivery order remains: read-only self-host evidence first, controlled panel
operations second, and a separate multi-project control plane last.

## Community Planning and Discussion Posts

When a dashboard or control-plane package starts:

1. Add the short public plan to `DASHBOARD-ROADMAP.en.md` and, when needed,
   `PLATFORM-CAPABILITIES.en.md`.
2. Describe private-test work only as sanitized, generalized evidence.
3. Do not publish a forum or GitHub Discussions update without changelog and
   roadmap links.
4. A new AI/operator handoff starts by reading `AGENTS.md`,
   `COMMUNITY-PUBLICATION-FLOW.md`, this roadmap, and `CHANGELOG.md`.
