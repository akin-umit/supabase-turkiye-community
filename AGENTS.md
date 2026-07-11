# Supabase Turkiye Community - AI Contributor Instructions

This file applies to every human contributor, AI coding agent, and AI-assisted developer working in this repository. Read it before inspecting, editing, generating, committing, reviewing, or publishing changes.

## Project Identity

- This is an independent community project for Turkish-first Supabase documentation and reusable self-hosting improvements.
- It is not Supabase Cloud, is not maintained by Supabase, and must not claim official partnership, endorsement, or regional representation.
- Preserve attribution to `supabase/supabase`, Apache-2.0 notices, third-party licenses, and trademark boundaries.
- Public examples must use neutral values such as `supabase.example.com`, `app.example.com`, `YOUR_SECRET`, and `YOUR_SERVER_IP`.

## Mandatory Start Check

1. Read `AGENTS.md`, `README.md` or `README.en.md`, `CONTRIBUTING.md`, `SECURITY.md`, and the task-specific document.
2. Run `git status --short`, `git branch -vv`, and `git remote -v`.
3. Identify whether the change is documentation-only, deployment-only, security-sensitive, or an upstream candidate.
4. Search existing Issues, Discussions, and pull requests before duplicating work.
5. Preserve unrelated changes and keep the patch narrowly scoped.

## AI and AI-Assisted Contributions

- AI-generated code and documentation are allowed, but the human contributor remains responsible for every submitted line.
- Pull requests must disclose meaningful AI assistance and name the verified areas, not private prompts or credentials.
- Do not claim a command, deployment, migration, restore, or test was executed when it was only suggested or simulated.
- Review generated commands for destructive behavior, platform assumptions, outdated versions, and secret exposure.
- Verify changeable technical claims against current official Supabase or component documentation.
- Never paste private chat history, credentials, customer data, production logs, internal URLs, or proprietary code into this repository.
- AI review is advisory. It does not replace CI, human ownership, clean-environment testing, or maintainer approval.

## Security and Privacy

Never commit or publish:

- `.env` files, API/JWT/service-role/secret keys, passwords, private keys, SMTP/database credentials, cookies, tokens, or webhook secrets.
- Real customer, tenant, user, billing, database, backup, Storage, incident, or production log data.
- Private domains, IP addresses, repository links, server/Coolify resource IDs, deployment IDs, container IDs, or screenshots containing them.
- Runtime volumes, database dumps, generated credentials, or private deployment configuration.

Stop immediately if a diff contains an unknown token-like value, real hostname, personal data, production evidence, or an unclear generated file. Remove it, rotate credentials if exposure occurred, and repeat the complete scan.

## Implementation Rules

- Prefer upstream Supabase patterns and current official Compose behavior over community-only abstractions.
- Do not weaken authentication, RLS, TLS, firewall guidance, secret scans, health checks, backups, or branch protection to simplify setup.
- A reverse proxy does not automatically close directly published host ports. Document firewall or bind-address requirements explicitly.
- One self-hosted Compose stack represents one isolated Supabase project unless a separately reviewed architecture says otherwise.
- Keep private deployment changes out of public commits. Reproduce reusable fixes with placeholders in a clean public branch.
- Do not automatically sync private repository history into this repository.

## Required Validation

Run the checks relevant to the change:

```bash
docker compose --env-file .env.example config -q
find . -type f -name '*.sh' -print0 | xargs -0 -n1 bash -n
git diff --check
```

Also verify documentation links, Turkish/English behavioral parity, secret safety, changed service smoke tests, migration/rollback impact, and upstream reproduction where applicable. If a required environment is unavailable, state exactly what was not run.

## Pull Request and Commit Rules

- Work on a branch and submit a pull request; do not push feature work directly to `main`.
- Use focused Turkish commit subjects with an appropriate emoji for this repository.
- Complete the PR template, including AI assistance, tests, security impact, migration, and rollback.
- Required CI must pass before merge. Review the final diff after generated changes.
- Classify the PR as `community-only`, `deployment-only`, or `upstream-candidate`.

## Upstream Contributions

- Community merge does not automatically authorize a Supabase upstream submission.
- Reproduce the issue against the current target repository and search existing Issues/PRs.
- Move only the minimal generic fix and tests to a clean branch in the appropriate fork.
- Remove community branding, platform-specific behavior, and private deployment evidence.
- Follow the target repository's current contribution guide and obtain owner approval before the public upstream action.

## Agent Completion Report

Every agent must report changed behavior, checks actually executed, private-data review results, unverified items, and any public post, deploy, deletion, migration, or upstream action that still needs explicit human approval.
