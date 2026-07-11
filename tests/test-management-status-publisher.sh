#!/usr/bin/env sh
set -eu

root=$(mktemp -d)
trap 'rm -rf "$root"' EXIT HUP INT TERM

STATUS_DIR="$root" sh utils/publish-management-status.sh backup-verified
grep -Eq '^\{"status":"verified","lastVerifiedAt":"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"\}$' \
  "$root/backup-status.json"

STATUS_DIR="$root" sh utils/publish-management-status.sh \
  migration-applied 20260711100000_example
grep -Eq '^\{"status":"applied","lastApplied":"20260711100000_example","appliedAt":"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"\}$' \
  "$root/migration-status.json"

if STATUS_DIR="$root" sh utils/publish-management-status.sh \
  migration-applied 'unsafe/value'; then
  echo 'Unsafe migration identifier was accepted.' >&2
  exit 1
fi

test "$(wc -l < "$root/backup-status.json")" -eq 1
test "$(wc -l < "$root/migration-status.json")" -eq 1

echo 'Management status publisher tests passed.'
