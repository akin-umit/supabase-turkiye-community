# Read-only Operational Management API

[Turkce](./MANAGEMENT-API.md)

This repository includes an internal `management-api` service for reporting
the operational state of one self-hosted Supabase stack. It is not the
Supabase Cloud Platform API and does not provide organization/project creation,
billing, branching, High Availability, or PITR.

## Security boundary

- Only `/health` is unauthenticated.
- `/v1/overview` requires `Authorization: Bearer <MANAGEMENT_API_TOKEN>`.
- The service has no host port and no Docker socket mount.
- Its root filesystem is read-only, Linux capabilities are dropped, and
  `no-new-privileges` is enabled.
- The browser must never receive the token. A future Studio integration must
  call it through a server-side proxy.
- Database passwords, API keys, secrets, file paths, and raw errors are never
  returned.

## Overview contract

`GET /v1/overview` returns sanitized fields for:

- core service state as `healthy` or `unavailable`,
- a valid deployment commit and the Management API version,
- the last operator-verified backup timestamp,
- the last operator-applied migration identifier and timestamp.

Analytics and Vector are optional. Set `MANAGEMENT_ENABLE_ANALYTICS=true` and
`MANAGEMENT_ENABLE_VECTOR=true` only when the related logging services run.

After the owning backup or migration job completes its own verification:

```sh
sh utils/publish-management-status.sh backup-verified
sh utils/publish-management-status.sh migration-applied 20260101000000_example
```

These commands do not verify a backup, checksum, or migration. They atomically
publish a previously verified result as sanitized JSON. Studio project-home
cards are not connected to this API yet.
