#!/bin/bash

##############################################################################
# Create Pull Request from Issue
#
# Creates a new branch and pull request from a GitHub issue.
# Automatically generates branch name and PR description from issue details.
#
# Usage:
#   ./create-pr-from-issue.sh [options]
#
# Options:
#   -h, --help              Show help message
#   -i, --issue <NUMBER>    Issue number (required)
#   -b, --branch <NAME>     Custom branch name (optional, auto-generated if not provided)
#   -t, --title <TITLE>     Custom PR title (optional, uses issue title if not provided)
#   -d, --description <DESC> Custom PR description (optional, uses issue body if not provided)
#   --base <BRANCH>         Base branch to merge into (default: master)
#   --draft                 Create as draft PR
#   --no-branch             Use current branch instead of creating new one
#   --auto-format           Auto-format branch name (kebab-case from issue)
#   --link-issue            Include "Closes #issue" in PR description
#
# Examples:
#   ./create-pr-from-issue.sh --issue 31
#   ./create-pr-from-issue.sh -i 31 -b feature/my-feature --draft
#   ./create-pr-from-issue.sh --issue 26 --title "My custom title" --link-issue
#   ./create-pr-from-issue.sh -i 30 --base develop --auto-format
#   ./create-pr-from-issue.sh --issue 27 --no-branch
#
# Requirements:
#   - GitHub CLI (gh): https://cli.github.com
#   - Authenticated with GitHub: gh auth login
#   - Git installed and configured
#   - Inside a Git repository
#
##############################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Default values
ISSUE_NUMBER=""
BRANCH_NAME=""
PR_TITLE=""
PR_DESCRIPTION=""
BASE_BRANCH="master"
DRAFT=false
NO_BRANCH=false
AUTO_FORMAT=false
LINK_ISSUE=false

# Helper functions
error() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

show_help() {
    sed -n '/^##############################################################################/,/^##############################################################################/p' "$0" | sed '1d;$d'
    exit 0
}

# Auto-format branch name from title (convert to kebab-case)
auto_format_branch() {
    local input="$1"
    # Convert to lowercase and replace spaces/special chars with dashes
    echo "$input" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-\|-$//'
}

# Extract issue number from PR title if present
extract_issue_number() {
    local title="$1"
    echo "$title" | grep -oE '#[0-9]+' | head -1 | sed 's/#//'
}

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    error "GitHub CLI (gh) is not installed. Install it from: https://cli.github.com"
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    error "Not authenticated with GitHub. Run: gh auth login"
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    error "Git is not installed. Install it from: https://git-scm.com"
fi

# Check if in git repository (don't fail with set -e)
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    error "Not in a Git repository. Run this tool from a Git repository."
fi

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            ;;
        -i|--issue)
            ISSUE_NUMBER="$2"
            shift 2
            ;;
        -b|--branch)
            BRANCH_NAME="$2"
            shift 2
            ;;
        -t|--title)
            PR_TITLE="$2"
            shift 2
            ;;
        -d|--description)
            PR_DESCRIPTION="$2"
            shift 2
            ;;
        --base)
            BASE_BRANCH="$2"
            shift 2
            ;;
        --draft)
            DRAFT=true
            shift
            ;;
        --no-branch)
            NO_BRANCH=true
            shift
            ;;
        --auto-format)
            AUTO_FORMAT=true
            shift
            ;;
        --link-issue)
            LINK_ISSUE=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Validate arguments
if [ -z "$ISSUE_NUMBER" ]; then
    error "Issue number is required\nUsage: ./create-pr-from-issue.sh --issue <NUMBER> [options]"
fi

# Validate issue number is numeric
if ! [[ "$ISSUE_NUMBER" =~ ^[0-9]+$ ]]; then
    error "Invalid issue number: $ISSUE_NUMBER (must be numeric)"
fi

# Display header
echo "════════════════════════════════════════════════════════════"
echo "Create Pull Request from Issue"
echo "════════════════════════════════════════════════════════════"
echo ""

# Fetch issue details
info "Fetching issue #$ISSUE_NUMBER details..."
ISSUE_DATA=$(gh issue view "$ISSUE_NUMBER" --json number,title,body,labels,state --repo isaaceliape/typee)

# Extract issue information
ISSUE_TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')
ISSUE_BODY=$(echo "$ISSUE_DATA" | jq -r '.body // empty')
ISSUE_STATE=$(echo "$ISSUE_DATA" | jq -r '.state')
ISSUE_LABELS=$(echo "$ISSUE_DATA" | jq -r '.labels[] | .name' | paste -sd ',' -)

# Check if issue is closed
if [ "$ISSUE_STATE" = "CLOSED" ]; then
    warning "Issue #$ISSUE_NUMBER is already closed"
fi

# Display issue information
echo ""
echo "Issue Information:"
echo "  Title: $ISSUE_TITLE"
echo "  State: $ISSUE_STATE"
[ -n "$ISSUE_LABELS" ] && echo "  Labels: $ISSUE_LABELS" || echo "  Labels: None"
echo ""

# Generate branch name if not provided
if [ -z "$BRANCH_NAME" ]; then
    if [ "$AUTO_FORMAT" = true ]; then
        # Auto-format from issue title
        FORMATTED_TITLE=$(echo "$ISSUE_TITLE" | sed 's/^[🔴🟡🟠🟢🟣🔵] \([A-Z]\+\): //' | sed 's/^[🔴🟡🟠🟢🟣🔵] //')
        BRANCH_NAME="feature/$(auto_format_branch "$FORMATTED_TITLE")"
    else
        # Use issue type from title with issue number
        if [[ "$ISSUE_TITLE" =~ ^[^:]*:\ (.*)$ ]]; then
            # Extract type and title from priority prefix
            TYPE=$(echo "$ISSUE_TITLE" | sed 's/^[🔴🟡🟠🟢🟣🔵] \([A-Z]\+\).*/\L\1/' | tr '[:upper:]' '[:lower:]')
            [ -z "$TYPE" ] || [ "$TYPE" = "medium" ] && TYPE="feature"
            CLEAN_TITLE=$(echo "$ISSUE_TITLE" | sed 's/^[🔴🟡🟠🟢🟣🔵] [A-Z]\+: //' | sed 's/^[🔴🟡🟠🟢🟣🔵] //')
            BRANCH_NAME="$TYPE/issue-$ISSUE_NUMBER-$(auto_format_branch "$CLEAN_TITLE")"
        else
            BRANCH_NAME="feature/issue-$ISSUE_NUMBER"
        fi
    fi
fi

info "Generated branch name: $BRANCH_NAME"

# Use provided PR title or issue title
if [ -z "$PR_TITLE" ]; then
    PR_TITLE="$ISSUE_TITLE"
fi

# Generate PR description
if [ -z "$PR_DESCRIPTION" ]; then
    PR_DESCRIPTION="## Summary

This PR addresses issue #$ISSUE_NUMBER: $ISSUE_TITLE

## Changes

Please describe the changes made in this PR.

## How to Test

Please provide testing steps.

## Checklist

- [ ] Tests pass locally
- [ ] Code follows project guidelines
- [ ] Documentation updated if needed
- [ ] No breaking changes"

    # Add issue body if available
    if [ -n "$ISSUE_BODY" ]; then
        PR_DESCRIPTION="## Issue Description

$ISSUE_BODY

---

## Implementation

Please describe your implementation approach.

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

Please provide testing steps to verify this implementation.

## Checklist

- [ ] Tests pass locally
- [ ] Code follows project guidelines  
- [ ] Documentation updated if needed
- [ ] Related issue #$ISSUE_NUMBER addressed"
    fi
fi

# Add link to issue if requested
if [ "$LINK_ISSUE" = true ]; then
    PR_DESCRIPTION="$PR_DESCRIPTION

---

Closes #$ISSUE_NUMBER"
fi

# Display PR information
echo "Pull Request Information:"
echo "  Title: $PR_TITLE"
echo "  Branch: $BRANCH_NAME"
echo "  Base Branch: $BASE_BRANCH"
[ "$DRAFT" = true ] && echo "  Draft: Yes" || echo "  Draft: No"
echo "  Link Issue: $LINK_ISSUE"
echo ""

# Create branch if not using current branch
if [ "$NO_BRANCH" = false ]; then
    info "Creating new branch: $BRANCH_NAME"
    
    # Check if branch already exists
    if git rev-parse --verify "$BRANCH_NAME" > /dev/null 2>&1; then
        warning "Branch $BRANCH_NAME already exists"
        info "Switching to existing branch..."
        git checkout "$BRANCH_NAME"
    else
        # Create new branch from base
        git fetch origin "$BASE_BRANCH" > /dev/null 2>&1 || true
        git checkout -b "$BRANCH_NAME" "origin/$BASE_BRANCH" 2>/dev/null || git checkout -b "$BRANCH_NAME"
    fi
    
    success "Switched to branch: $BRANCH_NAME"
else
    BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
    info "Using current branch: $BRANCH_NAME"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

# Check if branch has commits ahead of base
COMMITS_AHEAD=$(git rev-list --count "origin/$BASE_BRANCH..$BRANCH_NAME" 2>/dev/null || echo "0")
if [ "$COMMITS_AHEAD" = "0" ]; then
    warning "No commits found on $BRANCH_NAME ahead of $BASE_BRANCH"
    info "Make sure to commit your changes before creating the PR"
    echo ""
fi

# Display PR preview
echo "Pull Request Preview:"
echo "────────────────────────────────────────────────────────────"
echo "Title: $PR_TITLE"
echo ""
echo "Description:"
echo "$PR_DESCRIPTION"
echo "────────────────────────────────────────────────────────────"
echo ""

# Push branch if not already on remote
if [ "$NO_BRANCH" = false ]; then
    info "Pushing branch to remote..."
    git push -u origin "$BRANCH_NAME" 2>&1 | grep -v "^hint:" | grep -v "^remote:" || true
    success "Branch pushed to remote"
fi

echo ""

# Create PR
info "Creating pull request..."

# Build gh pr create command
GH_CMD="gh pr create --title \"$PR_TITLE\" --base \"$BASE_BRANCH\" --head \"$BRANCH_NAME\""

if [ "$DRAFT" = true ]; then
    GH_CMD="$GH_CMD --draft"
fi

# Use heredoc for body to handle multiline content
PR_URL=$(eval "$GH_CMD" --body "$(cat <<'EOF'
$PR_DESCRIPTION
EOF
)")

success "Pull request created!"
echo ""
echo "════════════════════════════════════════════════════════════"
echo "Pull Request Created Successfully!"
echo "════════════════════════════════════════════════════════════"
echo "URL: $PR_URL"
echo ""
echo "Next Steps:"
echo "  1. Review the PR on GitHub"
echo "  2. Request code review"
echo "  3. Address any feedback"
echo "  4. Merge when approved and checks pass"
echo ""
echo "PR Information:"
echo "  Branch: $BRANCH_NAME → $BASE_BRANCH"
echo "  Draft: $DRAFT"
echo "  Related Issue: #$ISSUE_NUMBER"
echo "════════════════════════════════════════════════════════════"
