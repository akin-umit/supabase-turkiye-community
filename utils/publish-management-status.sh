#!/usr/bin/env sh
set -eu

status_dir=${STATUS_DIR:-./volumes/management-status}
command_name=${1:-}
value=${2:-}

usage() {
  echo 'Usage: publish-management-status.sh backup-verified | migration-applied MIGRATION_ID' >&2
  exit 2
}

write_atomic() {
  target=$1
  content=$2
  mkdir -p "$status_dir"
  umask 077
  temporary=$(mktemp "$status_dir/.status.XXXXXX")
  trap 'rm -f "$temporary"' EXIT HUP INT TERM
  printf '%s\n' "$content" > "$temporary"
  mv "$temporary" "$status_dir/$target"
  trap - EXIT HUP INT TERM
}

timestamp=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

case "$command_name" in
  backup-verified)
    [ "$#" -eq 1 ] || usage
    write_atomic backup-status.json \
      "{\"status\":\"verified\",\"lastVerifiedAt\":\"$timestamp\"}"
    ;;
  migration-applied)
    [ "$#" -eq 2 ] || usage
    case "$value" in
      ''|*[!A-Za-z0-9_.-]*)
        echo 'Migration identifier contains unsupported characters.' >&2
        exit 2
        ;;
    esac
    [ "${#value}" -le 128 ] || {
      echo 'Migration identifier exceeds 128 characters.' >&2
      exit 2
    }
    write_atomic migration-status.json \
      "{\"status\":\"applied\",\"lastApplied\":\"$value\",\"appliedAt\":\"$timestamp\"}"
    ;;
  *) usage ;;
esac
