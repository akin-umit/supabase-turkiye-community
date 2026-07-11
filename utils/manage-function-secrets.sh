#!/usr/bin/env bash
set -euo pipefail

secrets_file="${FUNCTIONS_ENV_FILE:-volumes/functions/.env}"
command_name="${1:-}"
secret_name="${2:-}"

usage() {
  cat <<'EOF'
Usage:
  bash utils/manage-function-secrets.sh list
  bash utils/manage-function-secrets.sh set NAME
  bash utils/manage-function-secrets.sh unset NAME

For set, provide the value on standard input. Values are never printed.
EOF
}

validate_name() {
  [[ "$1" =~ ^[A-Z][A-Z0-9_]*$ ]] || {
    echo "ERROR: secret names must match ^[A-Z][A-Z0-9_]*$" >&2
    exit 1
  }
}

prepare_file() {
  mkdir -p "$(dirname "$secrets_file")"
  touch "$secrets_file"
  chmod 600 "$secrets_file"
}

case "$command_name" in
  list)
    prepare_file
    cut -d= -f1 "$secrets_file" | grep -E '^[A-Z][A-Z0-9_]*$' | sort -u || true
    ;;
  set)
    validate_name "$secret_name"
    IFS= read -r secret_value || true
    [[ -n "$secret_value" ]] || {
      echo "ERROR: a non-empty value is required on standard input" >&2
      exit 1
    }
    [[ "$secret_value" != *$'\n'* && "$secret_value" != *$'\r'* ]] || {
      echo "ERROR: multiline values are not supported" >&2
      exit 1
    }
    prepare_file
    tmp="$(mktemp "${secrets_file}.tmp.XXXXXX")"
    trap 'rm -f "$tmp"' EXIT
    grep -v "^${secret_name}=" "$secrets_file" > "$tmp" || true
    printf '%s=%s\n' "$secret_name" "$secret_value" >> "$tmp"
    chmod 600 "$tmp"
    mv "$tmp" "$secrets_file"
    trap - EXIT
    echo "UPDATED: $secret_name"
    echo "Redeploy Edge Runtime to apply the change."
    ;;
  unset)
    validate_name "$secret_name"
    prepare_file
    tmp="$(mktemp "${secrets_file}.tmp.XXXXXX")"
    trap 'rm -f "$tmp"' EXIT
    grep -v "^${secret_name}=" "$secrets_file" > "$tmp" || true
    chmod 600 "$tmp"
    mv "$tmp" "$secrets_file"
    trap - EXIT
    echo "REMOVED: $secret_name"
    echo "Redeploy Edge Runtime to apply the change."
    ;;
  *)
    usage >&2
    exit 1
    ;;
esac
