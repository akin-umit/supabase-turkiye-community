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

Platforms can normalize or omit Compose `env_file`, and Compose interpolation
can change values containing `$`. The Functions service therefore does not use
the secret file as `env_file`; it loads the raw mounted file safely at startup.
Do not manually edit a platform-generated Compose file.

Runtime shell variables inside Compose must be escaped as `$$line`. A single
`$line` is expanded before the container starts and breaks the loader.

The loader never overrides names already supplied by the service `environment`
block. The management tool rejects reserved runtime names such as `JWT_SECRET`,
`SUPABASE_URL`, and `SUPABASE_DB_URL`. Multiline input fails instead of being
silently truncated.

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
