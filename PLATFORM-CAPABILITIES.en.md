# Platform Capabilities and Evidence

[Türkçe sürüm](./PLATFORM-CAPABILITIES.md)

This document separates repository presence from runtime proof. A service appearing in Compose does not mean that every production environment has configured or smoke-tested it.

## Status Vocabulary

| Status | Exact meaning |
|---|---|
| **Included - default** | Present in base `docker-compose.yml` and starts when required environment values are supplied. |
| **Included - optional** | An overlay or script exists and requires explicit enablement and validation. |
| **External configuration required** | Support exists but depends on an external SMTP, SMS, OAuth, S3, DNS, or similar provider. |
| **Not provided** | Not part of this distribution, usually a Supabase Cloud control-plane capability. |
| **Planned** | Must link to an accepted Issue or roadmap item. It is not used without that evidence. |
| **Unverified** | Configuration may exist, but current clean-install/runtime evidence is unavailable. |

## Base Stack

| Capability | Status | Evidence and limit |
|---|---|---|
| PostgreSQL | Included - default | `db` service; backup, maintenance, and HA remain operator responsibilities. |
| Studio | Included - default | `studio` service; not the Cloud organization/project control plane. |
| Auth | Included - default | Email/password support; SMTP, SMS, and OAuth require configuration. |
| REST and GraphQL | Included - default | PostgREST plus database extension/configuration; authorization still depends on RLS and grants. |
| Realtime | Included - default | `realtime` service; database publications and permissions must be configured. |
| Storage and imgproxy | Included - default | Local persistent storage by default. |
| Edge Functions | Included - default | Runs on the deployed infrastructure, not a managed global edge network. |
| postgres-meta | Included - default | Database metadata service used by Studio. |
| Supavisor | Included - default | Connection pooler; published host ports require firewall/bind protection. |
| Kong | Included - default | Main public application gateway; direct host ports must still be restricted. |
| Community operational Management API | Included - default | Internal read-only service health and sanitized status data. It is not Supabase Platform API; Studio cards are not connected yet. |

GitHub Actions validates base Compose and shell syntax. That is not production runtime proof.

## Optional and External Capabilities

| Capability | Status | Requirement |
|---|---|---|
| Logflare/Vector analytics | Included - optional | `docker-compose.logs.yml`, additional resources, separate runtime validation. |
| S3-compatible Storage | Included - optional | S3 overlay, provider credentials, bucket, and backend tests. |
| RustFS | Included - optional | RustFS overlay; not started by the base stack. |
| Caddy/Nginx HTTPS proxy | Included - optional | Proxy overlay plus DNS and TLS configuration. |
| Envoy gateway | Included - optional | Envoy overlay; does not automatically replace the default Kong path. |
| PostgreSQL 17 upgrade | Included - optional | Upgrade tooling; requires backup, restore, and rollback validation. |
| SMTP, OAuth, and SMS | External configuration required | Provider setup, callback URLs, and secrets are required. |

The presence of optional files does not guarantee that every overlay combination is supported. Validate each selected combination separately.

If the public domain returns `503 Service Unavailable`, that deployment is not
accepted as verified. Check the Coolify/Kong backend route, service health,
internal port `8000`, and Compose reload state before running write smoke tests
for Auth, Storage, or Realtime.

## Not Provided by Self-Hosting

- Cloud organization and multi-project control plane
- Managed backup/PITR, High Availability, and automatic scaling
- Supabase Platform Management API and managed branching. The community
  operational API is not a Cloud control-plane equivalent.
- Managed global multi-region Edge Functions
- Cloud-only ETL, advanced analytics, and integrations without an independently deployed open-source equivalent

These are not described as planned unless an accepted and linked Issue or roadmap item exists.

## Runtime Verification Contract

A capability is runtime-verified only when evidence records the commit SHA, selected overlays, Compose validation, stable container health/restarts, read-only endpoint smoke test, persistent-data visibility where relevant, and rollback path.

Without that evidence, documentation may say **included**, **optional**, or **unverified**, but must not claim production validation.

Documentation update rules: [DOCUMENTATION-MAINTENANCE.md](./DOCUMENTATION-MAINTENANCE.md).

## Verified Community Studio Extensions

| Capability | Verified boundary |
|---|---|
| Operations cards | Read-only service health and deployed commit from the internal Management API. |
| Usage cards | Last-24-hour aggregation from self-hosted Logflare raw tables. |
| Observability Lite | Query Performance only; cloud control-plane reports remain disabled. |
| Dashboard Preferences | Local browser preferences with no platform API or billing dependency. |
| Function Secrets | Redacted CRUD, persistent named volume, and Edge Runtime hot reload. |

Backup and migration cards display only operator-published status evidence. The
dashboard does not yet create backups, execute restores, or apply migrations.

## Plan, Private Validation, and Public Release

Every new platform capability must use an explicit state:

- **Plan:** accepted target that is not implemented yet.
- **Private validation:** tested in our private deployment or staging
  environment, but not yet sanitized for this public repository.
- **Public release:** merged into this repository, CI/link/secret checks passed,
  and linked from the changelog.
- **Upstream candidate:** generic change that may be proposed to Supabase or a
  component upstream repository.

The same distinction applies to forum announcements and AI handoff notes. Full
rule: [COMMUNITY-PUBLICATION-FLOW.md](./COMMUNITY-PUBLICATION-FLOW.md).
