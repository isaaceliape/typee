#!/bin/bash

##############################################################################
# Get All Issues
#
# Lists all GitHub issues for the repository with filtering and formatting.
#
# Usage:
#   ./get-all-issues.sh [options]
#
# Options:
#   -h, --help              Show help message
#   -s, --state <STATE>     Filter by state: open, closed, all (default: open)
#   -l, --labels <LABELS>   Filter by labels (comma-separated)
#   -a, --assignee <USER>   Filter by assignee username
#   -j, --json              Output as JSON
#   -c, --csv               Output as CSV
#   -t, --table             Output as table (default)
#   -L, --limit <NUMBER>    Limit results to N issues (default: 100)
#   -s, --sort <FIELD>      Sort by: created, updated, comments (default: updated)
#
# Examples:
#   ./get-all-issues.sh
#   ./get-all-issues.sh --state closed
#   ./get-all-issues.sh --labels "bug,enhancement" --json
#   ./get-all-issues.sh --assignee isaaceliape --csv
#   ./get-all-issues.sh --limit 50 --sort created
#
# Requirements:
#   - GitHub CLI (gh): https://cli.github.com
#   - Authenticated with GitHub: gh auth login
#   - jq: Command-line JSON processor (optional but recommended)
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
STATE="open"
FORMAT="table"
LIMIT=100
SORT="updated"
LABELS=""
ASSIGNEE=""

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
        -s|--state)
            STATE="$2"
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
        -j|--json)
            FORMAT="json"
            shift
            ;;
        -c|--csv)
            FORMAT="csv"
            shift
            ;;
        -t|--table)
            FORMAT="table"
            shift
            ;;
        -L|--limit)
            LIMIT="$2"
            shift 2
            ;;
        --sort)
            SORT="$2"
            shift 2
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Validate state
case $STATE in
    open|closed|all)
        ;;
    *)
        error "Invalid state: $STATE. Use: open, closed, or all"
        ;;
esac

# Build search query for labels and assignee
SEARCH_QUERY=""

# Add labels filter
if [ -n "$LABELS" ]; then
    IFS=',' read -ra LABEL_ARRAY <<< "$LABELS"
    for label in "${LABEL_ARRAY[@]}"; do
        SEARCH_QUERY="$SEARCH_QUERY label:\"$(echo $label | xargs)\""
    done
fi

# Add assignee filter
if [ -n "$ASSIGNEE" ]; then
    SEARCH_QUERY="$SEARCH_QUERY assignee:$ASSIGNEE"
fi

# Fetch issues
info "Fetching issues (state: $STATE, limit: $LIMIT)..."

# Build the command directly
if [ -n "$SEARCH_QUERY" ]; then
    ISSUES_DATA=$(gh issue list --state "$STATE" --limit "$LIMIT" --json number,title,state,url,createdAt,updatedAt,assignees,labels,milestone --search "$SEARCH_QUERY" 2>&1)
else
    ISSUES_DATA=$(gh issue list --state "$STATE" --limit "$LIMIT" --json number,title,state,url,createdAt,updatedAt,assignees,labels,milestone 2>&1)
fi

# Check if we got an error
if echo "$ISSUES_DATA" | grep -q "unknown flag\|error"; then
    error "Failed to fetch issues: $ISSUES_DATA"
fi

# Output based on format
case $FORMAT in
    json)
        echo "$ISSUES_DATA" | jq '.'
        ;;
    csv)
        echo "Number,Title,State,Created,Updated,Assignees,Labels"
        echo "$ISSUES_DATA" | jq -r '.[] | 
            "\(.number),\"\(.title)\",\(.state),\(.createdAt),\(.updatedAt),\(if .assignees | length > 0 then .assignees | map(.login) | join("; ") else "None" end),\(if .labels | length > 0 then .labels | map(.name) | join("; ") else "None" end)"'
        ;;
    table)
        echo "════════════════════════════════════════════════════════════════════════════════"
        echo "$ISSUES_DATA" | jq -r '.[] | 
            "  #\(.number) [\(.state | ascii_upcase)]"' | while read line; do
            echo "$line"
        done
        
        echo "$ISSUES_DATA" | jq -r '.[] | 
            "  \(.title)"' | while read line; do
            echo "$line"
        done
        
        echo "$ISSUES_DATA" | jq -r '.[] | 
            "  Updated: \(.updatedAt) | Assignees: \(if .assignees | length > 0 then .assignees | map(.login) | join(", ") else "None" end)"' | while read line; do
            echo "$line"
        done
        
        echo "════════════════════════════════════════════════════════════════════════════════"
        ;;
esac

# Count results
COUNT=$(echo "$ISSUES_DATA" | jq 'length')
success "Found $COUNT issues"
