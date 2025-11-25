#!/bin/bash

##############################################################################
# get-kanban-user-story.sh
# 
# Description: Retrieve detailed information about a specific user story from
#              the Typee Kanban board using the GitHub CLI
#
# Usage: ./get-kanban-user-story.sh <issue_number> [format]
#
# Arguments:
#   issue_number  - GitHub issue number (required)
#   format        - Output format: json, table, or text (default: text)
#
# Examples:
#   ./get-kanban-user-story.sh 27                    # Get EPIC #27 details
#   ./get-kanban-user-story.sh 25 json               # Get issue #25 as JSON
#   ./get-kanban-user-story.sh 26 table              # Get issue #26 as table
#
# Requirements:
#   - GitHub CLI (gh) installed and authenticated
#   - Repository: isaaceliape/typee
#
##############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
OWNER="isaaceliape"
REPO="typee"
PROJECT_ID="3"

# Functions
show_help() {
    cat << 'EOF'
Usage: get-kanban-user-story.sh <issue_number> [format]

Get detailed information about a specific GitHub issue from the Typee Kanban board.

Arguments:
  issue_number  GitHub issue number (required)
  format        Output format: json, table, or text (default: text)

Examples:
  ./get-kanban-user-story.sh 27              # Get EPIC #27 in text format
  ./get-kanban-user-story.sh 25 json         # Get issue #25 as JSON
  ./get-kanban-user-story.sh 26 table        # Get issue #26 as formatted table

Output Formats:
  text    Plain text with formatted sections
  json    JSON output for programmatic processing
  table   Formatted table with key information

EOF
}

print_error() {
    echo -e "${RED}❌ Error: $1${NC}" >&2
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}══════════════════════════════════════════════════════════${NC}\n"
}

# Check arguments
if [[ $# -lt 1 ]]; then
    print_error "Missing required argument: issue_number"
    echo ""
    show_help
    exit 1
fi

ISSUE_NUMBER="$1"
FORMAT="${2:-text}"

# Validate format
if [[ ! "$FORMAT" =~ ^(json|table|text)$ ]]; then
    print_error "Invalid format: $FORMAT"
    echo "Valid formats: json, table, text"
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed"
    echo "Please install it from: https://cli.github.com"
    exit 1
fi

# Verify authentication
if ! gh auth status > /dev/null 2>&1; then
    print_error "Not authenticated with GitHub"
    echo "Please run: gh auth login"
    exit 1
fi

print_info "Fetching issue #$ISSUE_NUMBER from $OWNER/$REPO..."

# Fetch issue details
if ! ISSUE_DATA=$(gh issue view "$ISSUE_NUMBER" --repo "$OWNER/$REPO" --json title,number,state,labels,assignees,body,url,createdAt,updatedAt,milestone,reactions 2>&1); then
    print_error "Failed to fetch issue #$ISSUE_NUMBER"
    exit 1
fi

# Display based on format
case "$FORMAT" in
    json)
        echo "$ISSUE_DATA" | jq .
        ;;
    
    table)
        echo "$ISSUE_DATA" | jq -r '
            "Issue #\(.number) - \(.title)\n" +
            "Status: \(.state)\n" +
            "URL: \(.url)\n" +
            "Created: \(.createdAt | sub("T.*"; ""))\n" +
            "Updated: \(.updatedAt | sub("T.*"; ""))\n" +
            (if .assignees | length > 0 then "Assignees: \(.assignees | map(.login) | join(", "))\n" else "" end) +
            (if .labels | length > 0 then "Labels: \(.labels | map(.name) | join(", "))\n" else "" end) +
            (if .milestone then "Milestone: \(.milestone.title)\n" else "" end) +
            (if .reactions | length > 0 then "Reactions: \(.reactions)\n" else "" end)
        '
        ;;
    
    text|*)
        # Default to text format
        ISSUE_NUMBER=$(echo "$ISSUE_DATA" | jq -r '.number')
        ISSUE_TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')
        ISSUE_STATE=$(echo "$ISSUE_DATA" | jq -r '.state')
        ISSUE_URL=$(echo "$ISSUE_DATA" | jq -r '.url')
        ISSUE_CREATED=$(echo "$ISSUE_DATA" | jq -r '.createdAt | sub("T.*"; "")')
        ISSUE_UPDATED=$(echo "$ISSUE_DATA" | jq -r '.updatedAt | sub("T.*"; "")')
        ISSUE_BODY=$(echo "$ISSUE_DATA" | jq -r '.body // "No description"')
        
        # Get assignees
        ASSIGNEES=$(echo "$ISSUE_DATA" | jq -r '.assignees | map(.login) | join(", ") // "None"')
        
        # Get labels
        LABELS=$(echo "$ISSUE_DATA" | jq -r '.labels | map(.name) | join(", ") // "None"')
        
        # Get milestone
        MILESTONE=$(echo "$ISSUE_DATA" | jq -r '.milestone.title // "None"')
        
        # Print formatted output
        print_header "Issue #$ISSUE_NUMBER"
        
        echo -e "${YELLOW}Title:${NC}"
        echo "  $ISSUE_TITLE"
        
        echo -e "\n${YELLOW}Status:${NC}"
        if [[ "$ISSUE_STATE" == "OPEN" ]]; then
            echo -e "  ${GREEN}🟢 OPEN${NC}"
        else
            echo -e "  ${RED}🔴 CLOSED${NC}"
        fi
        
        echo -e "\n${YELLOW}Details:${NC}"
        echo "  URL: $ISSUE_URL"
        echo "  Created: $ISSUE_CREATED"
        echo "  Updated: $ISSUE_UPDATED"
        echo "  Assignees: $ASSIGNEES"
        echo "  Labels: $LABELS"
        echo "  Milestone: $MILESTONE"
        
        echo -e "\n${YELLOW}Description:${NC}"
        echo "$ISSUE_BODY" | sed 's/^/  /'
        
        echo -e "\n${BLUE}══════════════════════════════════════════════════════════${NC}\n"
        
        print_success "Issue #$ISSUE_NUMBER retrieved successfully"
        ;;
esac

exit 0
