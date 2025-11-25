#!/bin/bash

##############################################################################
# list-kanban-board.sh
#
# Description: List all items on the Typee Kanban board with status and details
#
# Usage: ./list-kanban-board.sh [options]
#
# Options:
#   -h, --help        Show help message
#   -j, --json        Output as JSON
#   -c, --csv         Output as CSV
#   -s, --status      Filter by status (OPEN, CLOSED, DRAFT)
#   -t, --type        Filter by type (issue, pullrequest, draft)
#
# Examples:
#   ./list-kanban-board.sh                    # List all items (default table)
#   ./list-kanban-board.sh --json             # Output as JSON
#   ./list-kanban-board.sh --status OPEN      # Only show open items
#   ./list-kanban-board.sh --csv              # Output as CSV
#
# Requirements:
#   - GitHub CLI (gh) installed and authenticated
#   - jq for JSON processing
#
##############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
OWNER="isaaceliape"
PROJECT_ID="3"

# Default options
OUTPUT_FORMAT="table"
STATUS_FILTER=""
TYPE_FILTER=""

# Functions
show_help() {
    cat << 'EOF'
Usage: list-kanban-board.sh [options]

List all items on the Typee Kanban board with filtering options.

Options:
  -h, --help         Show this help message
  -j, --json         Output as JSON
  -c, --csv          Output as CSV
  -s, --status STR   Filter by status (OPEN, CLOSED, DRAFT)
  -t, --type STR     Filter by type (issue, pullrequest, draft)

Examples:
  ./list-kanban-board.sh                    # List all items (table format)
  ./list-kanban-board.sh --json             # Output as JSON
  ./list-kanban-board.sh --status OPEN      # Only show open issues
  ./list-kanban-board.sh --csv              # Output as CSV
  ./list-kanban-board.sh -s OPEN -j         # Open items as JSON

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

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -j|--json)
            OUTPUT_FORMAT="json"
            shift
            ;;
        -c|--csv)
            OUTPUT_FORMAT="csv"
            shift
            ;;
        -s|--status)
            STATUS_FILTER="$2"
            shift 2
            ;;
        -t|--type)
            TYPE_FILTER="$2"
            shift 2
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed"
    echo "Please install it from: https://cli.github.com"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    print_error "jq is not installed"
    echo "Please install it from: https://stedolan.github.io/jq"
    exit 1
fi

# Verify authentication
if ! gh auth status > /dev/null 2>&1; then
    print_error "Not authenticated with GitHub"
    echo "Please run: gh auth login"
    exit 1
fi

print_info "Fetching Kanban board items..."

# Get project items
if ! ITEMS=$(gh project item-list "$PROJECT_ID" --owner "$OWNER" 2>&1); then
    print_error "Failed to fetch project items"
    exit 1
fi

# Count items
ITEM_COUNT=$(echo "$ITEMS" | wc -l)

case "$OUTPUT_FORMAT" in
    json)
        # Convert to JSON format
        echo "$ITEMS" | awk '
        NR==1 { next }  # Skip header
        {
            print "{"
            print "  \"type\": \"" $1 "\","
            print "  \"title\": \"" substr($0, index($0,$2)) "\","
            print "  \"number\": \"" $NF "\""
            if (NR < NF) print ","
            print "}"
        }
        ' | jq -s '.'
        ;;
    
    csv)
        # Output as CSV
        echo "Type,Title,Number,Repository"
        echo "$ITEMS" | awk '
        NR==1 { next }
        {
            type=$1
            number=$NF
            title=substr($0, index($0,$2), length($0)-length(number)-length(type)-10)
            gsub(/"/, "\"\"", title)
            printf "\"%s\",\"%s\",\"%s\",\"isaaceliape/typee\"\n", type, title, number
        }
        '
        ;;
    
    table|*)
        # Default table format with colors
        print_header "Typee Kanban Board - All Items ($ITEM_COUNT items)"
        
        echo -e "${CYAN}Type${NC} | ${CYAN}Title${NC} | ${CYAN}#${NC}"
        echo "------|------------|-----"
        
        echo "$ITEMS" | awk '
        NR==1 { next }
        {
            type=$1
            number=$NF
            title=substr($0, index($0,$2), length($0)-length(number)-length(type)-10)
            
            # Truncate long titles
            if (length(title) > 40) title=substr(title, 1, 37) "..."
            
            printf "%-6s| %-40s| #%s\n", type, title, number
        }
        '
        
        echo ""
        print_success "Found $((ITEM_COUNT - 1)) items on the Kanban board"
        ;;
esac

exit 0
