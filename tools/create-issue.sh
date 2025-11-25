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
#   --template <TYPE>         Use template: scrum, feature, bug, refactor (optional)
#   --story-points <POINTS>   Scrum story points (for scrum template)
#   
# Template Field Options (fills template with provided data):
#   --description <TEXT>      Description/motivation (feature, bug templates)
#   --behavior <TEXT>         Expected behavior (feature, bug templates)
#   --criteria <TEXT>         Acceptance criteria (comma-separated)
#   --steps <TEXT>            Reproduction steps (comma-separated for bug)
#   --actual <TEXT>           Actual behavior (bug template)
#   --environment <TEXT>      Environment info (bug template)
#   --context <TEXT>          Additional context (bug template)
#   --person <ROLE>           User story persona (scrum template)
#   --action <ACTION>         Desired action (scrum template)
#   --benefit <BENEFIT>       Expected benefit (scrum template)
#   --current-state <TEXT>    Current implementation (refactor template)
#   --proposed <TEXT>         Proposed changes (refactor template)
#   --benefits <TEXT>         Benefits (comma-separated for refactor)
#   --plan <TEXT>             Implementation plan (comma-separated for refactor)
#   --strategy <TEXT>         Testing strategy (refactor template)
#   
#   --no-prefix               Create without priority prefix

# Examples:
#   ./create-issue.sh --title "Add feature X" --priority HIGH --labels "feature,enhancement"
#   ./create-issue.sh -t "Fix bug Y" -p CRITICAL -l "bug,typescript" -b "Description here"
#   ./create-issue.sh --title "User login feature" --priority HIGH --template scrum --story-points 5
#   ./create-issue.sh --title "Refactor module Z" --priority MEDIUM --labels "refactoring"
#
#   # Scrum template with filled data
#   ./create-issue.sh -t "Add typing timer" --template scrum --story-points 8 \
#     --person "user" --action "see typing speed and time" --benefit "track progress"
#
#   # Bug template with filled data
#   ./create-issue.sh -t "Login button broken" --template bug --priority CRITICAL \
#     --description "Button not responding to clicks" \
#     --steps "1. Go to login page,2. Click login button,3. Nothing happens" \
#     --actual "Page does not navigate anywhere" \
#     --behavior "Should navigate to dashboard" \
#     --environment "Chrome 120, Ubuntu 22.04"
#
#   # Feature template with filled data
#   ./create-issue.sh -t "Dark mode support" --template feature --priority HIGH \
#     --description "Add dark theme to application" \
#     --behavior "Theme should toggle and persist" \
#     --criteria "Toggle in settings,Theme persists on reload,All components support dark mode"
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
TEMPLATE=""
STORY_POINTS=""

# Template field variables
DESCRIPTION=""
BEHAVIOR=""
CRITERIA=""
STEPS=""
ACTUAL_BEHAVIOR=""
ENVIRONMENT=""
CONTEXT=""
PERSON=""
ACTION=""
BENEFIT=""
CURRENT_STATE=""
PROPOSED_CHANGES=""
BENEFITS=""
PLAN=""
STRATEGY=""

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

# Helper function to generate Scrum user story template
generate_scrum_template() {
    local title="$1"
    local story_points="$2"
    local person="${3:-role/persona}"
    local action="${4:-action/feature}"
    local benefit="${5:-benefit/value}"
    
    cat <<EOF
## Story Points

**${story_points:-N/A}**

## User Story

As a **$person**,  
I want to **$action**,  
So that I can **$benefit**.

## Description

Provide a brief description of the feature or capability being requested.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Implementation Notes

- Technical considerations
- Dependencies
- Potential risks

## Definition of Done

- [ ] Code implemented
- [ ] Unit tests written
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Merged to main branch
- [ ] Documentation updated
EOF
}

# Helper function to generate Feature template
generate_feature_template() {
    local description="${1:-Brief description of the feature.}"
    local behavior="${2:-What should happen when this feature is implemented?}"
    local criteria="${3:-}"
    
    cat <<EOF
## Feature Request

### Description
$description

### Motivation
Why is this feature needed?

### Expected Behavior
$behavior

### Acceptance Criteria
EOF

    if [ -n "$criteria" ]; then
        # Convert comma-separated criteria to checklist
        echo "$criteria" | tr ',' '\n' | while IFS= read -r line; do
            echo "- [ ] $(echo "$line" | sed 's/^[ \t]*-* *\[ *\] *//')"
        done
    else
        cat <<EOF
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
EOF
    fi

    cat <<EOF

### Implementation Details

- Implementation approach
- Dependencies
- Affected components
EOF
}

# Helper function to generate Bug template
generate_bug_template() {
    local description="${1:-Clear description of the bug.}"
    local steps="${2:-}"
    local expected="${3:-What should happen?}"
    local actual="${4:-What actually happens?}"
    local environment="${5:-}"
    local context="${6:-}"

    cat <<EOF
## Bug Report

### Description
$description

### Steps to Reproduce
EOF

    if [ -n "$steps" ]; then
        # Convert comma-separated steps to numbered list
        echo "$steps" | tr ',' '\n' | nl -v 1 -s '. '
    else
        cat <<EOF
1. Step 1
2. Step 2
3. Step 3
EOF
    fi

    cat <<EOF

### Expected Behavior
$expected

### Actual Behavior
$actual

### Environment
EOF

    if [ -n "$environment" ]; then
        echo "$environment"
    else
        cat <<EOF
- OS: 
- Browser/Runtime: 
- Version: 
EOF
    fi

    cat <<EOF

### Additional Context
$context
EOF
}

# Helper function to generate Refactor template
generate_refactor_template() {
    local current="${1:-Current implementation details.}"
    local proposed="${2:-What needs to be refactored and why?}"
    local benefits="${3:-}"
    local plan="${4:-}"
    local strategy="${5:-}"

    cat <<EOF
## Refactoring

### Current State
$current

### Proposed Changes
$proposed

### Benefits
EOF

    if [ -n "$benefits" ]; then
        echo "$benefits" | tr ',' '\n' | while IFS= read -r line; do
            echo "- $(echo "$line" | sed 's/^[ \t]*//')"
        done
    else
        cat <<EOF
- Benefit 1
- Benefit 2
- Benefit 3
EOF
    fi

    cat <<EOF

### Implementation Plan
EOF

    if [ -n "$plan" ]; then
        echo "$plan" | tr ',' '\n' | nl -v 1 -s '. '
    else
        cat <<EOF
1. Step 1
2. Step 2
3. Step 3
EOF
    fi

    cat <<EOF

### Testing Strategy
${strategy:-How will we verify the refactor doesn't introduce regressions?}
EOF
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
        --template)
            TEMPLATE="$2"
            shift 2
            ;;
        --story-points)
            STORY_POINTS="$2"
            shift 2
            ;;
        --no-prefix)
            NO_PREFIX=true
            shift
            ;;
        --description)
            DESCRIPTION="$2"
            shift 2
            ;;
        --behavior)
            BEHAVIOR="$2"
            shift 2
            ;;
        --criteria)
            CRITERIA="$2"
            shift 2
            ;;
        --steps)
            STEPS="$2"
            shift 2
            ;;
        --actual)
            ACTUAL_BEHAVIOR="$2"
            shift 2
            ;;
        --environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --context)
            CONTEXT="$2"
            shift 2
            ;;
        --person)
            PERSON="$2"
            shift 2
            ;;
        --action)
            ACTION="$2"
            shift 2
            ;;
        --benefit)
            BENEFIT="$2"
            shift 2
            ;;
        --current-state)
            CURRENT_STATE="$2"
            shift 2
            ;;
        --proposed)
            PROPOSED_CHANGES="$2"
            shift 2
            ;;
        --benefits)
            BENEFITS="$2"
            shift 2
            ;;
        --plan)
            PLAN="$2"
            shift 2
            ;;
        --strategy)
            STRATEGY="$2"
            shift 2
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
    CRITICAL|HIGH|MEDIUM|LOW|REFACTOR|EPIC)
        ;;
    *)
        error "Invalid priority: $PRIORITY. Use: CRITICAL, HIGH, MEDIUM, LOW, REFACTOR, or EPIC"
        ;;
esac

# Validate template if provided
if [ -n "$TEMPLATE" ]; then
    case $TEMPLATE in
        scrum|feature|bug|refactor)
            ;;
        *)
            error "Invalid template: $TEMPLATE. Use: scrum, feature, bug, or refactor"
            ;;
    esac
fi

# Generate body from template if specified
if [ -n "$TEMPLATE" ] && [ -z "$BODY" ]; then
    case $TEMPLATE in
        scrum)
            BODY=$(generate_scrum_template "$TITLE" "$STORY_POINTS" "$PERSON" "$ACTION" "$BENEFIT")
            ;;
        feature)
            BODY=$(generate_feature_template "$DESCRIPTION" "" "$BEHAVIOR" "$CRITERIA")
            ;;
        bug)
            BODY=$(generate_bug_template "$DESCRIPTION" "$STEPS" "$BEHAVIOR" "$ACTUAL_BEHAVIOR" "$ENVIRONMENT" "$CONTEXT")
            ;;
        refactor)
            BODY=$(generate_refactor_template "$CURRENT_STATE" "$PROPOSED_CHANGES" "$BENEFITS" "$PLAN" "$STRATEGY")
            ;;
    esac
fi

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
[ -n "$TEMPLATE" ] && echo "Template: $TEMPLATE" || true
[ -n "$STORY_POINTS" ] && echo "Story Points: $STORY_POINTS" || true
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
