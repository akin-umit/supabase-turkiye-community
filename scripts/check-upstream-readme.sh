#!/bin/sh
set -eu

REPOSITORY="supabase/supabase"
BRANCH="master"
PATH_FILTER="README.md"
TRACKED_SHA="cf17967a3a46c6efa2d8875bb1839333e417f31e"

if [ -n "${GITHUB_TOKEN:-}" ]; then
  API_RESPONSE="$(curl -fsSL \
    -H 'Accept: application/vnd.github+json' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "https://api.github.com/repos/${REPOSITORY}/commits?path=${PATH_FILTER}&sha=${BRANCH}&per_page=1")"
else
  API_RESPONSE="$(curl -fsSL \
    -H 'Accept: application/vnd.github+json' \
    "https://api.github.com/repos/${REPOSITORY}/commits?path=${PATH_FILTER}&sha=${BRANCH}&per_page=1")"
fi

LATEST_SHA="$(printf '%s' "$API_RESPONSE" \
  | tr ',' '\n' \
  | sed -n 's/^[[:space:]]*"sha":[[:space:]]*"\([0-9a-f]*\)",*$/\1/p' \
  | head -n 1)"

if [ -z "$LATEST_SHA" ]; then
  echo "Unable to resolve the latest upstream README commit." >&2
  exit 1
fi

if [ "$LATEST_SHA" = "$TRACKED_SHA" ]; then
  echo "up-to-date: $TRACKED_SHA"
  exit 0
fi

echo "outdated"
echo "tracked=$TRACKED_SHA"
echo "latest=$LATEST_SHA"
echo "diff=https://github.com/${REPOSITORY}/compare/${TRACKED_SHA}...${LATEST_SHA}"
exit 2
