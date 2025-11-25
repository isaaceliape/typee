#!/bin/bash

##############################################################################
# project-status-dashboard.sh
#
# Description: Display a comprehensive dashboard of the Typee project status
#              including build status, tests, issues, and metrics
#
# Usage: ./project-status-dashboard.sh [options]
#
# Options:
#   -h, --help        Show help message
#   -f, --full        Show full detailed report
#   -q, --quick       Show quick summary only
#   -w, --watch       Watch mode (updates every 10 seconds)
#   -o, --output FILE Save output to file
#
# Examples:
#   ./project-status-dashboard.sh              # Show default dashboard
#   ./project-status-dashboard.sh --full       # Detailed report
#   ./project-status-dashboard.sh --watch      # Auto-update mode
#
# Requirements:
#   - GitHub CLI (gh) installed and authenticated
#   - npm installed (for build/test status)
#   - jq for JSON processing
#
##############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Configuration
OWNER="isaaceliape"
REPO="typee"
PROJECT_ID="3"
REPORT_MODE="default"
WATCH_MODE=false
OUTPUT_FILE=""

# Functions
show_help() {
    cat << 'EOF'
Usage: project-status-dashboard.sh [options]

Display a comprehensive dashboard of project status and metrics.

Options:
  -h, --help         Show this help message
  -f, --full         Show full detailed report
  -q, --quick        Show quick summary only
  -w, --watch        Watch mode (auto-update every 10 seconds)
  -o, --output FILE  Save output to file

Examples:
  ./project-status-dashboard.sh              # Show default dashboard
  ./project-status-dashboard.sh --full       # Detailed report
  ./project-status-dashboard.sh --watch      # Auto-update mode
  ./project-status-dashboard.sh -o status.txt # Save to file

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

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_header() {
    echo -e "\n${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC} $1"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}\n"
}

print_section() {
    echo -e "\n${MAGENTA}━━━ $1 ━━━${NC}\n"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -f|--full)
            REPORT_MODE="full"
            shift
            ;;
        -q|--quick)
            REPORT_MODE="quick"
            shift
            ;;
        -w|--watch)
            WATCH_MODE=true
            shift
            ;;
        -o|--output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Check dependencies
check_dependencies() {
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI (gh) is not installed"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        print_warning "jq is not installed - some features will be limited"
    fi
    
    if ! gh auth status > /dev/null 2>&1; then
        print_error "Not authenticated with GitHub"
        exit 1
    fi
}

# Get project issues
get_issues() {
    gh issue list --repo "$OWNER/$REPO" --json number,title,state,labels --limit 100 2>/dev/null || echo "[]"
}

# Get latest commits
get_commits() {
    gh repo view "$OWNER/$REPO" --json nameWithOwner,description,updatedAt 2>/dev/null || echo "{}"
}

# Display dashboard
display_dashboard() {
    clear
    
    print_header "Typee Project Status Dashboard"
    
    print_section "📊 Project Overview"
    echo "Repository:  $OWNER/$REPO"
    echo "Project:     Typee Kanban board (Private)"
    echo "Updated:     $(date '+%Y-%m-%d %H:%M:%S')"
    
    print_section "🚦 Build & Quality Status"
    
    # Check if we're in the repo directory
    if [[ -f "package.json" ]]; then
        echo -e "${CYAN}Linting:${NC} $(npm run lint > /dev/null 2>&1 && echo "${GREEN}✅ PASSING${NC}" || echo "${RED}❌ FAILING${NC}")"
        echo -e "${CYAN}Tests:${NC}   $(npm test > /dev/null 2>&1 && echo "${GREEN}✅ PASSING${NC}" || echo "${RED}❌ FAILING${NC}")"
        echo -e "${CYAN}Build:${NC}   $(npm run build > /dev/null 2>&1 && echo "${GREEN}✅ PASSING${NC}" || echo "${RED}❌ FAILING${NC}")"
    else
        echo "Run from project root directory for build status"
    fi
    
    print_section "📋 GitHub Issues Status"
    
    # Get issue counts
    OPEN_ISSUES=$(gh issue list --repo "$OWNER/$REPO" --state open --json number | jq length)
    CLOSED_ISSUES=$(gh issue list --repo "$OWNER/$REPO" --state closed --json number | jq length)
    TOTAL_ISSUES=$((OPEN_ISSUES + CLOSED_ISSUES))
    
    echo -e "Total Issues:  ${CYAN}$TOTAL_ISSUES${NC}"
    echo -e "Open:          ${YELLOW}$OPEN_ISSUES${NC}"
    echo -e "Closed:        ${GREEN}$CLOSED_ISSUES${NC}"
    
    print_section "🎯 Kanban Board Items"
    
    # Get Kanban items
    KANBAN_ITEMS=$(gh project item-list "$PROJECT_ID" --owner "$OWNER" 2>/dev/null | wc -l)
    
    echo -e "Total Items:   ${CYAN}$((KANBAN_ITEMS - 1))${NC}"
    
    if [[ "$REPORT_MODE" == "full" ]] || [[ "$REPORT_MODE" == "default" ]]; then
        echo ""
        gh project item-list "$PROJECT_ID" --owner "$OWNER" 2>/dev/null | awk '
        NR==1 { 
            printf "%-10s %-50s %-10s\n", "Type", "Title", "Number"
            print "========== ==================================================== =========="
            next 
        }
        {
            type=$1
            number=$NF
            title=substr($0, index($0,$2), length($0)-length(number)-length(type)-10)
            if (length(title) > 48) title=substr(title, 1, 45) "..."
            printf "%-10s %-50s %-10s\n", type, title, number
        }
        '
    fi
    
    print_section "📈 Recent Activity"
    
    # Get last few commits
    if [[ "$REPORT_MODE" == "full" ]]; then
        echo "Recent commits:"
        gh repo view "$OWNER/$REPO" --json createdAt,updatedAt | jq -r '.createdAt, .updatedAt' 2>/dev/null || echo "Unable to fetch"
    fi
    
    print_section "📚 Documentation"
    echo "Specifications available in spec/ directory:"
    echo "  • EPIC-progress-monitoring.md"
    echo "  • project-completion-summary.md"
    echo "  • dependency-upgrade-plan.md"
    echo "  • code-review-typescript-best-practices.md"
    
    print_section "🔧 Tools Available"
    echo "Tools in tools/ directory:"
    echo "  • get-kanban-user-story.sh"
    echo "  • list-kanban-board.sh"
    echo "  • project-status-dashboard.sh"
    
    echo -e "\n${CYAN}════════════════════════════════════════════════════════${NC}\n"
}

# Main execution
check_dependencies

if [[ -z "$OUTPUT_FILE" ]]; then
    # Display to console
    if [[ "$WATCH_MODE" == true ]]; then
        while true; do
            display_dashboard
            sleep 10
        done
    else
        display_dashboard
    fi
else
    # Save to file
    {
        display_dashboard
    } > "$OUTPUT_FILE"
    print_success "Dashboard saved to $OUTPUT_FILE"
fi

exit 0
