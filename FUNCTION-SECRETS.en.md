# Edge Functions Secret Management

Self-hosted Studio manages Edge Function secrets through a versioned JSON store.
Values are never revealed after saving; list responses contain only the name,
update timestamp, and SHA-256 digest.

## Runtime model

- Studio path: `/app/function-secrets/.supabase/function-secrets.json`
- Edge Runtime path: `/run/function-secrets/.supabase/function-secrets.json`
- Persistence: the `function-secrets` named volume
- New file mode: `0600`
- Activation: hot-loaded for subsequent function requests; no restart required

Function sources remain read-only in Studio. The secret volume is isolated from
the source bind mount, preserving values across Coolify release directories and
avoiding nested-mount failures.

Reserved runtime names such as `SUPABASE_*`, `SB_*`, `DENO_*`, `JWT_SECRET`,
and `VERIFY_JWT` cannot be managed. Invalid store updates retain the last valid
snapshot, and logs never include secret values.

## Safe verification

1. Open **Edge Functions > Secrets** in Studio.
2. Add a synthetic, non-sensitive secret.
3. Confirm the list shows a digest instead of plaintext.
4. Invoke a smoke function that returns only whether the variable exists.
5. Update the secret and verify the next request without restarting the runtime.
6. Delete it and confirm the next request no longer sees it.
7. Redeploy and confirm the named volume preserves the list.

Never commit the store, copy it into an image, print it in deployment logs, or
place it in an unencrypted backup. This is not a clone of the Supabase Cloud
control plane; it is an auditable secret CRUD and runtime-loading layer for one
self-hosted stack.
