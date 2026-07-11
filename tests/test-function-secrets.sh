#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
tool="$root/utils/manage-function-secrets.sh"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
export FUNCTIONS_ENV_FILE="$tmpdir/functions.env"

printf '%s\n' 'synthetic-value-one' | bash "$tool" set TEST_SECRET > "$tmpdir/set.out"
grep -Fq 'UPDATED: TEST_SECRET' "$tmpdir/set.out"
[[ "$(stat -c '%a' "$FUNCTIONS_ENV_FILE")" == "600" ]]
grep -Fq 'TEST_SECRET=synthetic-value-one' "$FUNCTIONS_ENV_FILE"
! grep -Fq 'synthetic-value-one' "$tmpdir/set.out"

printf '%s\n' 'spaces and $shell;characters "stay literal"' | bash "$tool" set COMPLEX_SECRET > /dev/null
grep -Fq 'COMPLEX_SECRET=spaces and $shell;characters "stay literal"' "$FUNCTIONS_ENV_FILE"

bash "$tool" list > "$tmpdir/list.out"
grep -Fxq 'TEST_SECRET' "$tmpdir/list.out"
grep -Fxq 'COMPLEX_SECRET' "$tmpdir/list.out"
! grep -Fq 'synthetic-value-one' "$tmpdir/list.out"

bash "$tool" unset TEST_SECRET > /dev/null
bash "$tool" unset COMPLEX_SECRET > /dev/null
! grep -q '^TEST_SECRET=' "$FUNCTIONS_ENV_FILE"
! grep -q '^COMPLEX_SECRET=' "$FUNCTIONS_ENV_FILE"

if printf '%s\n' value | bash "$tool" set invalid-name >/dev/null 2>&1; then
  echo 'Invalid secret name was accepted.' >&2
  exit 1
fi

if printf 'line-one\nline-two\n' | bash "$tool" set MULTILINE_SECRET >/dev/null 2>&1; then
  echo 'Multiline secret input was accepted.' >&2
  exit 1
fi

if printf '%s\n' value | bash "$tool" set JWT_SECRET >/dev/null 2>&1; then
  echo 'Reserved Edge Runtime variable was accepted.' >&2
  exit 1
fi

echo 'Function secret management tests passed.'
