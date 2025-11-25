#!/bin/bash

##############################################################################
# Get Issue by ID
#
# Retrieves detailed information about a specific GitHub issue by its number.
#
# Usage:
#   ./get-issue-by-id.sh <issue_number> [format]
#
# Arguments:
#   issue_number (required): GitHub issue number
#   format (optional): Output format - json, text, or table (default: text)
#
# Examples:
#   ./get-issue-by-id.sh 25
#   ./get-issue-by-id.sh 26 json
#   ./get-issue-by-id.sh 27 table
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
    error "Issue number is required\nUsage: ./get-issue-by-id.sh <issue_number> [format]"
fi

ISSUE_NUMBER=$1
FORMAT=${2:-text}

# Validate format
case $FORMAT in
    json|text|table)
        ;;
    *)
        error "Invalid format: $FORMAT. Use: json, text, or table"
        ;;
esac

# Get issue details
info "Fetching issue #$ISSUE_NUMBER..."

case $FORMAT in
    json)
        gh issue view "$ISSUE_NUMBER" --json title,number,state,url,createdAt,updatedAt,assignees,labels,milestone,body --repo isaaceliape/typee
        ;;
    table)
        ISSUE_DATA=$(gh issue view "$ISSUE_NUMBER" --json title,number,state,url,createdAt,updatedAt,assignees,labels --repo isaaceliape/typee)
        echo "════════════════════════════════════════════════════════════"
        echo "$ISSUE_DATA" | jq -r '"Issue #\(.number)\n\n" +
                                   "Title:\n  \(.title)\n\n" +
                                   "Status:\n  \(.state)\n\n" +
                                   "URL:\n  \(.url)\n\n" +
                                   "Created: \(.createdAt)\n" +
                                   "Updated: \(.updatedAt)\n" +
                                   "Assignees: \(if .assignees | length > 0 then .assignees | map(.login) | join(", ") else "None" end)\n" +
                                   "Labels: \(if .labels | length > 0 then .labels | map(.name) | join(", ") else "None" end)"'
        echo "════════════════════════════════════════════════════════════"
        ;;
    text)
        ISSUE_DATA=$(gh issue view "$ISSUE_NUMBER" --json title,number,state,url,createdAt,updatedAt,assignees,labels,body --repo isaaceliape/typee)
        echo "════════════════════════════════════════════════════════════"
        echo "$ISSUE_DATA" | jq -r '"Issue #\(.number)\n\n" +
                                   "Title:\n  \(.title)\n\n" +
                                   "Status:\n  \(.state)\n\n" +
                                   "Details:\n" +
                                   "  URL: \(.url)\n" +
                                   "  Created: \(.createdAt)\n" +
                                   "  Updated: \(.updatedAt)\n" +
                                   "  Assignees: \(if .assignees | length > 0 then .assignees | map(.login) | join(", ") else "None" end)\n" +
                                   "  Labels: \(if .labels | length > 0 then .labels | map(.name) | join(", ") else "None" end)\n\n" +
                                   "Description:\n  \(.body // "No description")"'
        echo "════════════════════════════════════════════════════════════"
        ;;
esac

success "Issue #$ISSUE_NUMBER retrieved successfully"
