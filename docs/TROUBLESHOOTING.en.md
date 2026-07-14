# Troubleshooting

[Turkce](./TROUBLESHOOTING.md)

This page is a short decision tree for operators so they do not get lost in
logs and HTTP errors. Do not share secrets, real domains, or production data.

## First Split

1. What HTTP code does `https://supabase.example.com` return?
2. Does Coolify show the expected deployed commit?
3. After a Compose change, did you run `Reload Compose File` and `Save`?
4. Is the public domain attached only to the `kong` service?
5. Is the domain backend/internal port `8000`?

## Common Symptoms

| Symptom | Likely cause | What to do |
|---|---|---|
| `503 Service Unavailable` | Coolify proxy has no healthy backend. | Check `kong` health, domain-service mapping, internal port `8000`, restart counts, and deployed commit. |
| `http://supabase.example.com:8000` opens Coolify login | Host port 8000 belongs to the Coolify layer. | Do not use that URL; route the public HTTPS domain to the `kong:8000` backend. |
| `401 Basic` | Studio entry is protected and the route is alive. | Log in with the deployment username/password. |
| `401 Key` | Expected rejection without an API key. | Run anon/service/publishable/secret key smoke in a controlled environment. |
| `missing function name in request` | Edge Runtime is reachable but no function path was provided. | Test a known function path. |
| `name resolution failed` | Compose network alias is missing or an old Compose model is running. | Check `supabase-studio`, `supabase-edge-functions`, and `realtime-dev.supabase-realtime` aliases. |

## Why Did These Settings Change?

Short answer: the old layout could appear to work in some Coolify deployments,
but once host ports and proxy backend ports were confused, users either landed
on the Coolify login page or the public HTTPS domain returned `503`.

The historical summary and linked documents for this change live in [CHANGELOG.md](../CHANGELOG.md#coolify-gateway-and-acceptance-documentation---2026-07-14).

- Kong host-port publishing was separated from the base Compose file.
- The Coolify domain is documented as belonging only to the `kong` service.
- The backend/internal port is explicitly `8000`.
- Gate 4 write smoke must not run before Gate 3 read-only routes are stable.

These changes do not change Supabase API behavior. They make public routing and
operator acceptance more predictable.

## Gate Order

- **Gate 3 read-only:** route, health, and expected rejection codes. Writes no
  data.
- **Gate 4 temporary-data:** creates synthetic Auth user, Storage bucket,
  Function invocation, and Realtime channel; then cleans them up.
- **Gate 5 Studio UI:** checks Studio pages visually and behaviorally after
  Basic auth login.

Do not run Gate 4 while Gate 3 is unstable.

## Reporting

- Report HTTP code, endpoint, expected result, and actual result.
- Do not share secret values, cookies, tokens, real customer data, or private
  domains.
- Do not say "working" without deployed commit, service health, and smoke
  evidence.
