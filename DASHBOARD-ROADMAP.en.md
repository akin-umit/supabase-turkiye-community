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
