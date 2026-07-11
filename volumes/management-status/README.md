# Management Status Files

This directory is mounted read-only into the internal management API. Runtime
JSON files are ignored by Git and must contain sanitized status only.

`backup-status.json`:

```json
{
  "status": "verified",
  "lastVerifiedAt": "2026-01-01T00:00:00Z"
}
```

`migration-status.json`:

```json
{
  "status": "applied",
  "lastApplied": "20260101000000_example",
  "appliedAt": "2026-01-01T00:00:00Z"
}
```

The backup job may publish `verified` only after its checksum verification has
passed. Write to a temporary file in this directory and rename it atomically.
Never include paths, database names, credentials, archive names or error text.

Use the tested publisher only after the owning job has succeeded:

```sh
sh utils/publish-management-status.sh backup-verified
sh utils/publish-management-status.sh migration-applied 20260101000000_example
```

These commands record an already verified outcome; they do not perform backup,
checksum or migration verification themselves.
