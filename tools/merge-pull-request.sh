#!/bin/bash

##############################################################################
# Merge Pull Request with Branch Cleanup
#
# Merges a GitHub pull request and automatically deletes the source branch.
# Uses squash merge strategy by default for clean commit history.
#
# Usage:
#   ./merge-pull-request.sh [options]
#
# Options:
#   -h, --help              Show help message
#   -p, --pr <NUMBER>       Pull request number (required)
#   -s, --strategy <TYPE>   Merge strategy: squash, merge, rebase (default: squash)
#   -d, --delete-branch     Delete source branch after merge (default: true)
#   --keep-branch           Keep source branch after merge
#   -f, --force             Skip confirmation prompt
#   --dry-run               Show what would be done without applying
#   -m, --message <MSG>     Custom commit message (for squash merge)
#
# Examples:
#   ./merge-pull-request.sh --pr 35
#   ./merge-pull-request.sh -p 35 --strategy squash --force
#   ./merge-pull-request.sh --pr 33 --keep-branch
#   ./merge-pull-request.sh -p 34 --strategy rebase
#   ./merge-pull-request.sh --pr 36 --dry-run
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
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Default values
PR_NUMBER=""
MERGE_STRATEGY="squash"
DELETE_BRANCH=true
FORCE=false
DRY_RUN=false
CUSTOM_MESSAGE=""

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
        -p|--pr)
            PR_NUMBER="$2"
            shift 2
            ;;
        -s|--strategy)
            MERGE_STRATEGY="$2"
            shift 2
            ;;
        -d|--delete-branch)
            DELETE_BRANCH=true
            shift
            ;;
        --keep-branch)
            DELETE_BRANCH=false
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        -m|--message)
            CUSTOM_MESSAGE="$2"
            shift 2
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Validate arguments
if [ -z "$PR_NUMBER" ]; then
    error "Pull request number is required\nUsage: ./merge-pull-request.sh --pr <NUMBER> [options]"
fi

# Validate PR number is numeric
if ! [[ "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
    error "Invalid PR number: $PR_NUMBER (must be numeric)"
fi

# Validate merge strategy
if [[ ! "$MERGE_STRATEGY" =~ ^(squash|merge|rebase)$ ]]; then
    error "Invalid merge strategy: $MERGE_STRATEGY (must be: squash, merge, or rebase)"
fi

# Display header
echo "════════════════════════════════════════════════════════════"
echo "Merge Pull Request with Branch Cleanup"
echo "════════════════════════════════════════════════════════════"
echo ""

# Fetch PR details
info "Fetching PR #$PR_NUMBER details..."
PR_DATA=$(gh pr view "$PR_NUMBER" --json number,title,state,headRefName,baseRefName,statusCheckRollup --repo isaaceliape/typee 2>/dev/null || error "PR #$PR_NUMBER not found")

# Extract PR information
PR_TITLE=$(echo "$PR_DATA" | jq -r '.title')
PR_STATE=$(echo "$PR_DATA" | jq -r '.state')
SOURCE_BRANCH=$(echo "$PR_DATA" | jq -r '.headRefName')
TARGET_BRANCH=$(echo "$PR_DATA" | jq -r '.baseRefName')
STATUS_CHECKS=$(echo "$PR_DATA" | jq -r '.statusCheckRollup[] | select(.status == "COMPLETED") | .conclusion' | sort | uniq)

# Check if PR is already merged
if [ "$PR_STATE" = "MERGED" ]; then
    warning "PR #$PR_NUMBER is already merged"
    info "Source branch: $SOURCE_BRANCH"
    info "Target branch: $TARGET_BRANCH"
    
    # Still offer to delete branch if requested
    if [ "$DELETE_BRANCH" = true ]; then
        info "Attempting to delete source branch: $SOURCE_BRANCH"
        if [ "$DRY_RUN" = false ] && [ "$FORCE" = true ]; then
            if git -C "$(git rev-parse --show-toplevel)" push origin --delete "$SOURCE_BRANCH" 2>/dev/null; then
                success "Source branch deleted: $SOURCE_BRANCH"
            else
                warning "Could not delete source branch (may already be deleted)"
            fi
        fi
    fi
    exit 0
fi

# Check if PR is closed without merge
if [ "$PR_STATE" = "CLOSED" ]; then
    error "PR #$PR_NUMBER is closed without being merged"
fi

# Display PR information
echo "Pull Request Information:"
echo "  Number: #$PR_NUMBER"
echo "  Title: $PR_TITLE"
echo "  State: $PR_STATE"
echo "  Source Branch: $SOURCE_BRANCH"
echo "  Target Branch: $TARGET_BRANCH"
echo "  Merge Strategy: $MERGE_STRATEGY"
echo "  Delete Branch: $([ "$DELETE_BRANCH" = true ] && echo 'Yes' || echo 'No')"
echo ""

# Check if status checks are passing
if echo "$STATUS_CHECKS" | grep -q "FAILURE"; then
    warning "Some status checks are failing!"
    info "Failed checks detected"
    echo ""
fi

# Dry run mode
if [ "$DRY_RUN" = true ]; then
    warning "DRY RUN MODE - PR will not be merged"
    info "Would merge PR #$PR_NUMBER"
    info "Strategy: $MERGE_STRATEGY"
    info "Source: $SOURCE_BRANCH → Target: $TARGET_BRANCH"
    if [ "$DELETE_BRANCH" = true ]; then
        info "Would delete branch: $SOURCE_BRANCH"
    fi
    exit 0
fi

# Ask for confirmation if not forced
if [ "$FORCE" = false ]; then
    echo ""
    echo "This will:"
    echo "  1. Merge PR #$PR_NUMBER using $MERGE_STRATEGY strategy"
    if [ "$DELETE_BRANCH" = true ]; then
        echo "  2. Delete source branch: $SOURCE_BRANCH"
    fi
    echo ""
    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        warning "Cancelled"
        exit 0
    fi
fi

echo ""

# Merge the PR
info "Merging PR #$PR_NUMBER using $MERGE_STRATEGY strategy..."

# Build merge command based on strategy
case "$MERGE_STRATEGY" in
    squash)
        GH_MERGE_CMD="gh pr merge $PR_NUMBER --squash"
        ;;
    rebase)
        GH_MERGE_CMD="gh pr merge $PR_NUMBER --rebase"
        ;;
    merge)
        GH_MERGE_CMD="gh pr merge $PR_NUMBER --merge"
        ;;
esac

# Execute merge
if eval "$GH_MERGE_CMD" --repo isaaceliape/typee --auto 2>&1 | tee /tmp/merge_output.txt; then
    success "PR #$PR_NUMBER merged successfully"
    echo ""
else
    # Check if it was already merged
    if grep -q "already merged" /tmp/merge_output.txt; then
        warning "PR #$PR_NUMBER was already merged"
    else
        error "Failed to merge PR #$PR_NUMBER"
    fi
fi

# Delete source branch if requested
if [ "$DELETE_BRANCH" = true ]; then
    echo ""
    info "Deleting source branch: $SOURCE_BRANCH"
    
    # Attempt to delete via gh CLI first
    if gh api repos/isaaceliape/typee/git/refs/heads/"$SOURCE_BRANCH" -X DELETE 2>/dev/null; then
        success "Source branch deleted: $SOURCE_BRANCH"
    else
        warning "Could not delete source branch via API (may have been auto-deleted)"
        
        # Try via git push
        if git push origin --delete "$SOURCE_BRANCH" 2>/dev/null; then
            success "Source branch deleted via git: $SOURCE_BRANCH"
        else
            warning "Could not delete source branch (it may already be deleted or protected)"
        fi
    fi
else
    info "Keeping source branch: $SOURCE_BRANCH"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "Pull Request Merged Successfully!"
echo "════════════════════════════════════════════════════════════"
echo "PR #$PR_NUMBER has been merged into $TARGET_BRANCH"
if [ "$DELETE_BRANCH" = true ]; then
    echo "Source branch has been cleaned up"
fi
echo ""
echo "Next Steps:"
echo "  1. Pull latest changes: git pull origin $TARGET_BRANCH"
echo "  2. Delete local branch: git branch -d $SOURCE_BRANCH"
echo "  3. Continue with next task"
echo ""
echo "Merge Details:"
echo "  PR: #$PR_NUMBER - $PR_TITLE"
echo "  Strategy: $MERGE_STRATEGY"
echo "  Source → Target: $SOURCE_BRANCH → $TARGET_BRANCH"
echo "════════════════════════════════════════════════════════════"
