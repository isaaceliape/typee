#!/bin/bash

##############################################################################
# Remove Issue by ID
#
# Closes a GitHub issue by marking it as closed.
# Note: GitHub doesn't support permanent deletion via CLI for security reasons.
# This script closes issues; they can be reopened if needed.
#
# Usage:
#   ./remove-issue-by-id.sh <issue_number> [options]
#
# Arguments:
#   issue_number (required): GitHub issue number
#
# Options:
#   -h, --help              Show help message
#   -r, --reason <REASON>   Closing reason/comment (optional)
#   -d, --dry-run           Show what would be done without applying
#   -f, --force             Skip confirmation prompt
#
# Examples:
#   ./remove-issue-by-id.sh 26
#   ./remove-issue-by-id.sh 26 --reason "Completed"
#   ./remove-issue-by-id.sh 26 --dry-run
#   ./remove-issue-by-id.sh 26 --force --reason "Duplicate"
#
# Requirements:
#   - GitHub CLI (gh): https://cli.github.com
#   - Authenticated with GitHub: gh auth login
#
##############################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DRY_RUN=false
FORCE=false
REASON=""

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
    sed -n '/^##############################################################################/,/^##############################################################################/p' "$0" | tail -n +2 | head -n -1
    exit 0
}

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    error "GitHub CLI (gh) is not installed. Install it from: https://cli.github.com"
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    error "Not authenticated with GitHub. Run: gh auth login"
fi

# Validate arguments
if [ $# -lt 1 ]; then
    error "Issue number is required\nUsage: ./remove-issue-by-id.sh <issue_number> [options]"
fi

ISSUE_NUMBER=$1
shift

# Parse options
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            ;;
        -r|--reason)
            REASON="$2"
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Fetch current issue data
info "Fetching issue #$ISSUE_NUMBER..."
ISSUE_DATA=$(gh issue view "$ISSUE_NUMBER" --json number,title,state,url --repo isaaceliape/typee 2>/dev/null || error "Issue #$ISSUE_NUMBER not found")

# Extract data
ISSUE_TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')
ISSUE_STATE=$(echo "$ISSUE_DATA" | jq -r '.state')
ISSUE_URL=$(echo "$ISSUE_DATA" | jq -r '.url')

# Check if already closed
if [ "$ISSUE_STATE" = "CLOSED" ]; then
    warning "Issue #$ISSUE_NUMBER is already closed"
    info "URL: $ISSUE_URL"
    exit 0
fi

# Display issue details
echo "════════════════════════════════════════════════════════════"
echo "Issue #$ISSUE_NUMBER"
echo "Title: $ISSUE_TITLE"
echo "State: $ISSUE_STATE"
echo "URL: $ISSUE_URL"
echo "════════════════════════════════════════════════════════════"

# Dry run mode
if [ "$DRY_RUN" = true ]; then
    warning "DRY RUN MODE - Issue will not be closed"
    info "Would close issue #$ISSUE_NUMBER"
    if [ -n "$REASON" ]; then
        info "Reason: $REASON"
    fi
    exit 0
fi

# Ask for confirmation if not forced
if [ "$FORCE" = false ]; then
    echo ""
    read -p "Close issue #$ISSUE_NUMBER? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        warning "Cancelled"
        exit 0
    fi
fi

# Close the issue
info "Closing issue #$ISSUE_NUMBER..."
gh issue close "$ISSUE_NUMBER" --repo isaaceliape/typee

# Add comment if reason provided
if [ -n "$REASON" ]; then
    info "Adding closing comment..."
    gh issue comment "$ISSUE_NUMBER" --body "Closed: $REASON" --repo isaaceliape/typee
fi

echo ""
success "Issue #$ISSUE_NUMBER closed successfully"
info "To reopen: gh issue reopen $ISSUE_NUMBER --repo isaaceliape/typee"
