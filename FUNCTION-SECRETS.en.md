# Edge Functions Secret Management

The secret CRUD UI in Supabase Cloud belongs to its managed control plane. A
self-hosted deployment supplies environment variables to Edge Runtime instead.
This repository implements that model with a portable file and without storing
secret values in Git.

## Usage

The default file is `volumes/functions/.env`. It is stored with mode `0600` and
is ignored by Git.

```bash
printf '%s\n' "$VALUE" | bash utils/manage-function-secrets.sh set SECRET_NAME
bash utils/manage-function-secrets.sh list
bash utils/manage-function-secrets.sh unset SECRET_NAME
docker compose up -d --force-recreate functions
```

`list` prints names only. Values are never written to command output. Multiline
values are not supported.

## Coolify Note

Some Coolify releases omit a service-level `env_file` entry while generating
their active Compose model. The Functions service therefore includes a startup
fallback that safely loads the same mounted file. Do not manually edit a
Coolify-generated Compose file because a later deployment will overwrite it.

Runtime shell variables inside Compose must be escaped as `$$line`. A single
`$line` is expanded before the container starts and breaks the loader.

## Safe Verification

Set a synthetic secret, recreate the Functions container, and check only its
name in PID 1's environment without printing the value:

```bash
docker exec "$FUNCTIONS_CONTAINER" sh -c \
  'tr "\000" "\n" < /proc/1/environ | grep -q "^SYNTHETIC_SECRET="'
```

`docker exec ... test -n "$SYNTHETIC_SECRET"` can produce a false negative. A
new exec process does not inherit variables exported dynamically into PID 1 by
the entrypoint. Remove the synthetic secret and recreate the container after
the test.

This is not a clone of Supabase Cloud's secret control plane. It is auditable,
file-based secret management for self-hosted Edge Runtime.
