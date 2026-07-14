# Community Publication Flow / Community Yayin Akisi

This document defines how private test-server work becomes public community
planning, documentation, forum updates, and future AI/operator handoff context.

Bu belge, private test sunucusunda yapilan isin public community planina,
dokumantasyona, forum/Discussion guncellemelerine ve gelecekteki AI/operator
devrine nasil tasinacagini tanimlar.

## Purpose / Amac

The project has three separate evidence levels:

1. **Planned:** the idea is accepted as a roadmap item, but no implementation is
   validated yet.
2. **Private validation:** the change exists in the private test/deployment
   environment and has passed the relevant private checks.
3. **Public community release:** the generic, sanitized change is merged into
   this repository with documentation, tests, and public-safe evidence.

These levels must not be mixed. A private test result does not automatically
become a public feature claim, and a public plan does not mean the feature is
already available.

Bu seviyeler karistirilmaz. Private test sonucu otomatik public ozellik iddiasi
degildir; public planda yazan bir hedef de ozelligin hazir oldugu anlamina
gelmez.

## Private Test Server to Community Rule

When a feature, fix, or operational lesson is developed on the private test
server:

1. Record the private result in the private repository with commit, date,
   rollback note, and exact checks.
2. Decide whether the result is `private-only`, `community-candidate`, or
   `upstream-candidate`.
3. For `community-candidate` work, copy only reusable behavior into a clean
   public branch.
4. Replace all private domains, project names, server IDs, credentials, logs,
   screenshots, and operational evidence with neutral examples.
5. Update the affected public documents in the same pull request.
6. Link the change from `CHANGELOG.md` and from the practical guide that a new
   operator will read.
7. Publish a forum or GitHub Discussion update only after the public PR is
   merged or clearly label it as a roadmap/request-for-feedback post.

## Required Public Documentation Updates

Every public feature or plan update must check these files:

| Change type | Required public documents |
|---|---|
| Dashboard or Studio behavior | `DASHBOARD-ROADMAP*.md`, `PLATFORM-CAPABILITIES*.md`, `CHANGELOG.md` |
| Compose, Coolify, domain, proxy, or port behavior | `COOLIFY.md`, `DEPLOYMENT.md`, `docs/TROUBLESHOOTING*.md`, `CHANGELOG.md` |
| Secrets, API keys, JWT, Auth, or Edge Functions | `CONFIG.md`, `SECURITY.md`, `FUNCTION-SECRETS*.md`, setup guides, `CHANGELOG.md` |
| Backup, restore, migration, or upgrade | `OPERATIONS.md`, `RESTORE-DRILL*.md`, `MIGRATION.md`, `CHANGELOG.md` |
| Multi-project/control-plane planning | `DASHBOARD-ROADMAP*.md`, `PLATFORM-CAPABILITIES*.md`, `COMMUNITY-PUBLICATION-FLOW.md` |
| Contributor or AI workflow | `AGENTS.md`, `CONTRIBUTING.md`, `DOCUMENTATION-MAINTENANCE.md`, this file |

If a listed document is not updated, the pull request must explain why.

## Forum and Discussion Publication Rule

Public community posts should be short, factual, and linked back to the canonical
repository documents.

Public community paylasimlari kisa, kanitli ve ana repo belgelerine bagli
olmalidir.

Use this order:

1. **Roadmap post:** describe the problem, target, and what is not available
   yet.
2. **Validation post:** share that a private or staging test passed, without
   private evidence or secrets.
3. **Release post:** link the merged public PR, changelog entry, setup guide,
   and troubleshooting guide.
4. **Feedback post:** ask users for reproduction details, screenshots with
   secrets removed, and deployment environment information.

Do not publish private deployment screenshots, real domains, logs, credentials,
server IDs, Coolify IDs, or private commit links.

Discussion kategori plani ve iki dilli paylasim sablonlari:
[DISCUSSIONS.md](./DISCUSSIONS.md).

Private deployment ekran goruntuleri, gercek domainler, loglar, credentiallar,
server ID'leri, Coolify ID'leri veya private commit linkleri yayinlanmaz.

## AI and New Machine Handoff Rule

The repository must stay understandable after a fresh clone on a new computer or
by a new AI agent. The minimum handoff reading order is:

1. `AGENTS.md`
2. `README.md` or `README.en.md`
3. `PLATFORM-CAPABILITIES.md` or `PLATFORM-CAPABILITIES.en.md`
4. `DASHBOARD-ROADMAP.md` or `DASHBOARD-ROADMAP.en.md`
5. `CHANGELOG.md`
6. `DOCUMENTATION-MAINTENANCE.md`
7. This file
8. The task-specific guide, for example `COOLIFY.md`, `FUNCTION-SECRETS.md`,
   `OPERATIONS.md`, or `docs/TROUBLESHOOTING.md`

An AI agent must not rely on chat history as the source of truth. If a fact is
important for future work, it belongs in one of the repository documents above.

## Acceptance Checklist

A change is ready for public community publication only when all applicable
items are true:

- The feature state is labeled as planned, partial, evidence-only, verified, or
  not provided.
- The old behavior, reason for change, new behavior, and user action are
  documented.
- `CHANGELOG.md` links to the affected practical documents.
- Turkish and English documents are updated when the behavior affects both
  audiences.
- Secret and private-data scans are clean.
- CI and Markdown link checks pass.
- Any forum or Discussion draft links back to the canonical repository pages.
