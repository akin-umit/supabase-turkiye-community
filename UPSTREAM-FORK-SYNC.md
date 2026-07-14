# Upstream Fork Sync Policy

This document explains how `akin-umit/supabase` stays connected to the official
`supabase/supabase` repository without losing community work or publishing
deployment-specific changes upstream.

## Repository Roles

| Repository | Role |
|---|---|
| `supabase/supabase` | Official upstream source. Read-only for this project unless an upstream PR is intentionally opened. |
| `akin-umit/supabase` | Clean fork for upstream-candidate work and Supabase source experiments. |
| `supabase-turkiye-private` | Private deployment validation. Never mirrored into the fork. |
| `supabase-turkiye-community` | Public documentation, generic tooling, and sanitized community releases. |

## Local Remote Setup

The local checkout of `akin-umit/supabase` must have both remotes:

```bash
git remote add upstream https://github.com/supabase/supabase.git
git remote set-url --push upstream DISABLED
git fetch upstream master --tags
git fetch origin master --tags
```

`upstream` is fetch-only. Do not push directly to `supabase/supabase`.

## Regular Update Check

Run this before starting an upstream-candidate task or updating self-hosted
baseline files:

```bash
git fetch upstream master --tags
git fetch origin master --tags
git rev-list --left-right --count origin/master...upstream/master
git log --oneline --decorate -10 upstream/master -- docker apps/studio
git log --oneline --decorate -10 origin/master -- docker apps/studio
```

The ahead/behind count is diagnostic only. It is not approval to reset, force
push, or blindly merge upstream.

## Safe Sync Rule

Use one of these paths:

1. **Upstream-candidate fix:** create a fresh branch from `upstream/master`,
   apply only the minimal generic fix, add tests, then push to
   `akin-umit/supabase`.
2. **Self-hosted baseline review:** compare the current self-hosted tag or
   commit with the new upstream tag, then copy only reviewed `docker/`,
   `apps/studio`, or documentation changes into the private/community flow.
3. **Fork maintenance:** if the fork default branch must be synced, first record
   backup refs and custom branches, then use a reviewed merge or GitHub sync.
   Do not force-push unless the owner explicitly approves the exact recovery
   plan.

## What Must Not Happen

- Do not make `akin-umit/supabase` the deployment repository.
- Do not copy private domains, Coolify IDs, credentials, logs, screenshots, or
  deployment evidence into the fork.
- Do not open upstream PRs with Turkiye community branding or private runtime
  behavior.
- Do not merge upstream `master` into a feature branch without checking whether
  the change is Cloud-only, self-hosted, or deployment-specific.

## Documentation Update Rule

Whenever upstream changes are reviewed or imported:

1. Update `UPSTREAM-CONTRIBUTIONS.md` if an upstream PR/issue is planned.
2. Update `CHANGELOG.md` and `versions.md` when image tags or self-hosted
   release baselines change.
3. Update `PLATFORM-CAPABILITIES*.md` when the supported/self-hosted boundary
   changes.
4. Link the public summary from `DISCUSSIONS.md` using a bilingual Development
   Log or Announcement post.

