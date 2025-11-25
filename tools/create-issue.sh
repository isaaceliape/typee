#!/bin/bash

##############################################################################
# Create Issue
#
# Creates a new GitHub issue with priority prefix and labels.
# Follows the pattern: [PRIORITY]: Issue Title
# Priority levels: 🔴 CRITICAL, 🟡 HIGH, 🟠 MEDIUM, 🟢 LOW, 🟣 REFACTOR, 🔵 EPIC
#
# Usage:
#   ./create-issue.sh [options]
#
# Options:
#   -h, --help                Show help message
#   -t, --title <TITLE>       Issue title (required)
#   -b, --body <BODY>         Issue body/description
#   -p, --priority <LEVEL>    Priority: CRITICAL, HIGH, MEDIUM, LOW, REFACTOR, EPIC (default: MEDIUM)
#   -l, --labels <LABELS>     Comma-separated labels (e.g., "bug,typescript")
#   -a, --assignee <USER>     Assign to user
#   --no-prefix               Create without priority prefix

# Examples:
#   ./create-issue.sh --title "Add feature X" --priority HIGH --labels "feature,enhancement"
#   ./create-issue.sh -t "Fix bug Y" -p CRITICAL -l "bug,typescript" -b "Description here"
#   ./create-issue.sh --title "Refactor module Z" --priority MEDIUM --labels "refactoring"
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
PRIORITY="MEDIUM"
TITLE=""
BODY=""
LABELS=""
ASSIGNEE=""
NO_PREFIX=false

# Helper function to get priority emoji
get_priority_emoji() {
    case $1 in
        CRITICAL) echo "🔴 CRITICAL" ;;
        HIGH) echo "🟡 HIGH" ;;
        MEDIUM) echo "🟠 MEDIUM" ;;
        LOW) echo "🟢 LOW" ;;
        REFACTOR) echo "🟣 REFACTOR" ;;
        EPIC) echo "🔵 EPIC" ;;
        *) echo "" ;;
    esac
}

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

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            ;;
        -t|--title)
            TITLE="$2"
            shift 2
            ;;
        -b|--body)
            BODY="$2"
            shift 2
            ;;
        -p|--priority)
            PRIORITY="$2"
            shift 2
            ;;
        -l|--labels)
            LABELS="$2"
            shift 2
            ;;
        -a|--assignee)
            ASSIGNEE="$2"
            shift 2
            ;;
        --no-prefix)
            NO_PREFIX=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Validate arguments
if [ -z "$TITLE" ]; then
    error "Title is required\nUsage: ./create-issue.sh --title <TITLE> [options]"
fi

# Validate priority
case $PRIORITY in
    CRITICAL|HIGH|MEDIUM|LOW)
        ;;
    *)
        error "Invalid priority: $PRIORITY. Use: CRITICAL, HIGH, MEDIUM, or LOW"
        ;;
esac

# Build final title with prefix
if [ "$NO_PREFIX" = true ]; then
    FINAL_TITLE="$TITLE"
else
    PREFIX_EMOJI=$(get_priority_emoji "$PRIORITY")
    FINAL_TITLE="$PREFIX_EMOJI: $TITLE"
fi

# Display issue details
echo "════════════════════════════════════════════════════════════"
echo "Creating Issue"
echo "════════════════════════════════════════════════════════════"
echo "Title: $FINAL_TITLE"
echo "Priority: $PRIORITY"
[ -n "$BODY" ] && echo "Has Description: Yes" || echo "Has Description: No"
[ -n "$LABELS" ] && echo "Labels: $LABELS" || echo "Labels: None"
[ -n "$ASSIGNEE" ] && echo "Assignee: $ASSIGNEE" || echo "Assignee: None"
echo "════════════════════════════════════════════════════════════"

# Create the issue
info "Creating issue..."

# Build gh command
GH_CMD="gh issue create --title \"$FINAL_TITLE\" --repo isaaceliape/typee"

# Add body if provided
if [ -n "$BODY" ]; then
    GH_CMD="$GH_CMD --body \"$BODY\""
fi

# Add labels if provided
if [ -n "$LABELS" ]; then
    GH_CMD="$GH_CMD --label \"$LABELS\""
fi

# Add assignee if provided
if [ -n "$ASSIGNEE" ]; then
    GH_CMD="$GH_CMD --assignee \"$ASSIGNEE\""
fi

# Execute command
ISSUE_URL=$(eval "$GH_CMD")

echo ""
success "Issue created successfully!"
info "URL: $ISSUE_URL"

# Extract issue number from URL
ISSUE_NUMBER=$(echo "$ISSUE_URL" | grep -oE '[0-9]+$')
echo ""
echo "════════════════════════════════════════════════════════════"
echo "Issue #$ISSUE_NUMBER created successfully!"
echo "════════════════════════════════════════════════════════════"
