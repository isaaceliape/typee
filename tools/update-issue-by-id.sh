#!/bin/bash

##############################################################################
# Update Issue by ID
#
# Updates a GitHub issue's properties (title, body, labels, state, assignee).
#
# Usage:
#   ./update-issue-by-id.sh <issue_number> [options]
#
# Arguments:
#   issue_number (required): GitHub issue number
#
# Options:
#   -h, --help                Show help message
#   -t, --title <TITLE>       Update issue title
#   -b, --body <BODY>         Update issue description
#   -s, --state <STATE>       Update state: open or closed
#   -l, --labels <LABELS>     Update labels (comma-separated, replaces existing)
#   -a, --assignee <USER>     Add assignee username
#   -u, --unassign            Remove all assignees
#   --add-label <LABEL>       Add a single label (without replacing others)
#   --remove-label <LABEL>    Remove a single label
#   -d, --dry-run             Show what would be changed without applying
#
# Examples:
#   ./update-issue-by-id.sh 26 --state closed
#   ./update-issue-by-id.sh 25 --title "New title" --body "New description"
#   ./update-issue-by-id.sh 27 --labels "epic,priority-high"
#   ./update-issue-by-id.sh 8 --assignee isaaceliape
#   ./update-issue-by-id.sh 26 --add-label "in-progress"
#   ./update-issue-by-id.sh 26 --dry-run --state closed --labels "bug,verified"
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
CHANGES_MADE=false

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
    error "Issue number is required\nUsage: ./update-issue-by-id.sh <issue_number> [options]"
fi

ISSUE_NUMBER=$1
shift

# Parse options
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            ;;
        -t|--title)
            NEW_TITLE="$2"
            shift 2
            ;;
        -b|--body)
            NEW_BODY="$2"
            shift 2
            ;;
        -s|--state)
            NEW_STATE="$2"
            shift 2
            ;;
        -l|--labels)
            NEW_LABELS="$2"
            shift 2
            ;;
        -a|--assignee)
            NEW_ASSIGNEE="$2"
            shift 2
            ;;
        -u|--unassign)
            UNASSIGN=true
            shift
            ;;
        --add-label)
            ADD_LABEL="$2"
            shift 2
            ;;
        --remove-label)
            REMOVE_LABEL="$2"
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Fetch current issue data
info "Fetching current issue #$ISSUE_NUMBER..."
CURRENT_DATA=$(gh issue view "$ISSUE_NUMBER" --json title,state,body,labels,assignees --repo isaaceliape/typee)

# Display current state if dry-run
if [ "$DRY_RUN" = true ]; then
    info "DRY RUN MODE - No changes will be applied"
    echo ""
fi

# Apply updates
if [ -n "$NEW_TITLE" ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would update title to: $NEW_TITLE"
    else
        info "Updating title..."
        gh issue edit "$ISSUE_NUMBER" --title "$NEW_TITLE" --repo isaaceliape/typee
        success "Title updated"
    fi
    CHANGES_MADE=true
fi

if [ -n "$NEW_BODY" ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would update body to: $NEW_BODY"
    else
        info "Updating description..."
        gh issue edit "$ISSUE_NUMBER" --body "$NEW_BODY" --repo isaaceliape/typee
        success "Description updated"
    fi
    CHANGES_MADE=true
fi

if [ -n "$NEW_STATE" ]; then
    if [ "$NEW_STATE" != "open" ] && [ "$NEW_STATE" != "closed" ]; then
        error "Invalid state. Use: open or closed"
    fi
    if [ "$DRY_RUN" = true ]; then
        warning "Would update state to: $NEW_STATE"
    else
        info "Updating state to $NEW_STATE..."
        if [ "$NEW_STATE" = "closed" ]; then
            gh issue close "$ISSUE_NUMBER" --repo isaaceliape/typee
        else
            gh issue reopen "$ISSUE_NUMBER" --repo isaaceliape/typee
        fi
        success "State updated to $NEW_STATE"
    fi
    CHANGES_MADE=true
fi

if [ -n "$NEW_LABELS" ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would update labels to: $NEW_LABELS"
    else
        info "Updating labels..."
        gh issue edit "$ISSUE_NUMBER" --remove-label '*' --add-label "$NEW_LABELS" --repo isaaceliape/typee 2>/dev/null || true
        success "Labels updated"
    fi
    CHANGES_MADE=true
fi

if [ -n "$ADD_LABEL" ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would add label: $ADD_LABEL"
    else
        info "Adding label $ADD_LABEL..."
        gh issue edit "$ISSUE_NUMBER" --add-label "$ADD_LABEL" --repo isaaceliape/typee
        success "Label added"
    fi
    CHANGES_MADE=true
fi

if [ -n "$REMOVE_LABEL" ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would remove label: $REMOVE_LABEL"
    else
        info "Removing label $REMOVE_LABEL..."
        gh issue edit "$ISSUE_NUMBER" --remove-label "$REMOVE_LABEL" --repo isaaceliape/typee
        success "Label removed"
    fi
    CHANGES_MADE=true
fi

if [ -n "$NEW_ASSIGNEE" ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would assign to: $NEW_ASSIGNEE"
    else
        info "Assigning to $NEW_ASSIGNEE..."
        gh issue edit "$ISSUE_NUMBER" --add-assignee "$NEW_ASSIGNEE" --repo isaaceliape/typee
        success "Assignee updated"
    fi
    CHANGES_MADE=true
fi

if [ "$UNASSIGN" = true ]; then
    if [ "$DRY_RUN" = true ]; then
        warning "Would remove all assignees"
    else
        info "Removing assignees..."
        gh issue edit "$ISSUE_NUMBER" --remove-assignee '*' --repo isaaceliape/typee 2>/dev/null || true
        success "Assignees removed"
    fi
    CHANGES_MADE=true
fi

if [ "$CHANGES_MADE" = false ]; then
    warning "No changes specified"
    exit 0
fi

if [ "$DRY_RUN" = false ]; then
    echo ""
    success "Issue #$ISSUE_NUMBER updated successfully"
fi
