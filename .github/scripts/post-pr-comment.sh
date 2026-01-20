#!/bin/bash
set -euo pipefail

# Script to post or update a PR comment with validation errors
# Usage: post-pr-comment.sh <validation_output> <pr_number>

# Input validation
if [ $# -ne 2 ]; then
  echo "Error: Invalid number of arguments" >&2
  echo "Usage: $0 <validation_output> <pr_number>" >&2
  exit 1
fi

VALIDATION_OUTPUT="$1"
PR_NUMBER="$2"

if [ -z "$VALIDATION_OUTPUT" ]; then
  echo "Error: Validation output cannot be empty" >&2
  exit 1
fi

if [ -z "$PR_NUMBER" ]; then
  echo "Error: PR number cannot be empty" >&2
  exit 1
fi

# Create a unique identifier for our validation comment
COMMENT_MARKER="<!-- resume-validation-workflow-comment -->"

# Create comment body (using printf for proper formatting)
# shellcheck disable=SC2016
printf -v COMMENT_BODY '%s\n%s\n\n%s\n\n```text\n%s\n```\n\n%s' \
  "$COMMENT_MARKER" \
  "## ❌ Resume Validation Failed" \
  "The resume validation failed with the following errors:" \
  "$VALIDATION_OUTPUT" \
  "Please fix the validation errors and push the changes again."

# Check if a comment already exists with our unique marker
COMMENT_ID=$(gh pr view "$PR_NUMBER" --json comments --jq ".comments[] | select(.body | contains(\"$COMMENT_MARKER\")) | .id" | head -1)

if [ -n "$COMMENT_ID" ]; then
  # Update existing comment
  gh api \
    --method PATCH \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "/repos/$GITHUB_REPOSITORY/issues/comments/$COMMENT_ID" \
    -f body="$COMMENT_BODY"
  echo "Updated existing PR comment #$COMMENT_ID"
else
  # Create new comment
  gh pr comment "$PR_NUMBER" --body "$COMMENT_BODY"
  echo "Created new PR comment"
fi
