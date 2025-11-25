# Typee Project Tools

Collection of shell scripts to manage GitHub issues for the Typee project using the GitHub CLI (gh).

## Overview

These tools provide command-line access to GitHub Issues management functionality:

- **Create Issue** - Create new GitHub issues with priority prefixes and labels
- **Get Issue by ID** - Retrieve specific issue information
- **Get All Issues** - List all GitHub issues with filtering and formatting
- **Update Issue by ID** - Modify issue properties (title, body, labels, state, assignees)
- **Close Issue by ID** - Close issues
- **Create PR from Issue** - Create pull requests automatically from GitHub issues

## Prerequisites

### Required
- **GitHub CLI (gh)** - https://cli.github.com
  - Install: `brew install gh` (macOS) or `choco install gh` (Windows)
  - Authenticate: `gh auth login`

### Optional (Recommended)
- **jq** - Command-line JSON processor
  - Install: `brew install jq` (macOS) or `choco install jq` (Windows)
  - Used for enhanced JSON output and filtering

## Scripts

### 1. create-issue.sh

Create new GitHub issues with priority prefixes and labels following the Typee project conventions.

**Priority Levels:**
- `🔴 CRITICAL` - Critical bugs or blocking issues
- `🟡 HIGH` - High priority features or important bug fixes
- `🟠 MEDIUM` - Standard features and improvements (default)
- `🟢 LOW` - Low priority enhancements or nice-to-haves
- `🟣 REFACTOR` - Refactoring and code improvements
- `🔵 EPIC` - Large features or epics spanning multiple issues

**Templates:**
- `scrum` - Scrum user story format with acceptance criteria
- `feature` - Feature request template
- `bug` - Bug report template
- `refactor` - Code refactoring template

**Usage:**
```bash
./create-issue.sh [options]
```

**Options:**
- `-h, --help`: Show help message
- `-t, --title <TITLE>`: Issue title (required)
- `-b, --body <BODY>`: Issue description/body (optional, overrides template)
- `-p, --priority <LEVEL>`: Priority level - CRITICAL, HIGH, MEDIUM, LOW, REFACTOR, EPIC (default: MEDIUM)
- `-l, --labels <LABELS>`: Comma-separated labels (e.g., "bug,typescript,enhancement")
- `-a, --assignee <USER>`: Assign to GitHub username
- `--template <TYPE>`: Template to use - scrum, feature, bug, refactor (optional)
- `--story-points <POINTS>`: Scrum story points (only with scrum template)
- `--no-prefix`: Create without priority prefix

**Examples:**
```bash
# Create a CRITICAL bug issue with TypeScript label
./create-issue.sh --title "App crashes on startup" --priority CRITICAL --labels "bug,typescript"

# Create a HIGH priority feature
./create-issue.sh -t "Add dark mode support" -p HIGH -l "feature,enhancement"

# Create a SCRUM user story with 8 story points
./create-issue.sh --title "Implement user authentication" --priority HIGH --template scrum --story-points 8 --labels "feature,security"

# Create a feature with feature template
./create-issue.sh --title "Add export to PDF" --priority MEDIUM --template feature --labels "feature,enhancement"

# Create a bug report using bug template
./create-issue.sh --title "Login button unresponsive" --priority HIGH --template bug --labels "bug,critical"

# Create a refactoring issue with refactor template
./create-issue.sh --title "Optimize database queries" --priority MEDIUM --template refactor --labels "performance,refactoring"

# Create a MEDIUM priority issue with description and assignee
./create-issue.sh --title "Refactor API client" --priority MEDIUM --body "Description here" --labels "refactoring" --assignee isaaceliape

# Create without priority prefix
./create-issue.sh --title "Minor typo fix" --labels "documentation" --no-prefix

# Create an EPIC
./create-issue.sh -t "Phase 2: Performance Optimization" -p EPIC -l "epic,tracking"
```

**Template Details:**

**Scrum Template:**
```
## Story Points
[Points]

## User Story
As a **role/persona**,
I want to **action/feature**,
So that I can **benefit/value**.

## Description
[Brief description]

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
```

**Feature Template:**
```
## Feature Request

### Description
Brief description of the feature.

### Motivation
Why is this feature needed?

### Expected Behavior
What should happen when this feature is implemented?

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Implementation Details
- Implementation approach
- Dependencies
- Affected components
```

**Bug Template:**
```
## Bug Report

### Description
Clear description of the bug.

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
What should happen?

### Actual Behavior
What actually happens?

### Environment
- OS: 
- Browser/Runtime: 
- Version: 

### Additional Context
Any additional information, screenshots, or logs.
```

**Refactor Template:**
```
## Refactoring

### Current State
Current implementation details.

### Proposed Changes
What needs to be refactored and why?

### Benefits
- Benefit 1
- Benefit 2
- Benefit 3

### Implementation Plan
1. Step 1
2. Step 2
3. Step 3

### Testing Strategy
How will we verify the refactor doesn't introduce regressions?
```

**Sample Output:**
```
════════════════════════════════════════════════════════════
Creating Issue
════════════════════════════════════════════════════════════
Title: 🟠 MEDIUM: Add new feature
Priority: MEDIUM
Template: scrum
Story Points: 5
Has Description: Yes
Labels: feature,enhancement
Assignee: isaaceliape
════════════════════════════════════════════════════════════

ℹ️  Creating issue...

✅ Issue created successfully!
ℹ️  URL: https://github.com/isaaceliape/typee/issues/29

════════════════════════════════════════════════════════════
Issue #29 created successfully!
════════════════════════════════════════════════════════════
```

**Naming Convention:**
- Issue titles follow the pattern: `[PRIORITY]: Description`
- Examples:
  - `🔴 CRITICAL: Fix event handler this binding`
  - `🟡 HIGH: Move global state to component instances`
  - `🟠 MEDIUM: Add JSDoc documentation`
  - `🟢 LOW: No support to numbers`
  - `🟣 REFACTOR: Migrate from Vuex to Pinia`
  - `🔵 EPIC: Typee Application Progress Monitoring`

---

### 2. get-issue-by-id.sh

Retrieve detailed information about a specific GitHub issue by its number.

**Usage:**
```bash
./get-issue-by-id.sh <issue_number> [format]
```

**Arguments:**
- `issue_number` (required): GitHub issue number
- `format` (optional): Output format - `json`, `text`, or `table` (default: `text`)

**Examples:**
```bash
# Get issue #26 in text format (default)
./get-issue-by-id.sh 26

# Get issue #25 as JSON
./get-issue-by-id.sh 25 json

# Get issue #27 as formatted table
./get-issue-by-id.sh 27 table
```

**Output Formats:**
- **text**: Plain text with formatted sections (default)
- **json**: JSON output for programmatic processing
- **table**: Formatted table with key information

**Sample Output (text format):**
```
════════════════════════════════════════════════════════
Issue #26

Title:
  Add unit tests for Vue components

Status:
  OPEN

Details:
  URL: https://github.com/isaaceliape/typee/issues/26
  Created: 2025-11-25T10:30:00Z
  Updated: 2025-11-25T14:45:00Z
  Assignees: None
  Labels: enhancement

Description:
  Write comprehensive unit tests for all Vue components...
════════════════════════════════════════════════════════
```

---

### 3. get-all-issues.sh

List all GitHub issues with filtering, sorting, and formatting options.

**Usage:**
```bash
./get-all-issues.sh [options]
```

**Options:**
- `-h, --help`: Show help message
- `-s, --state <STATE>`: Filter by state: `open`, `closed`, `all` (default: `open`)
- `-l, --labels <LABELS>`: Filter by labels (comma-separated)
- `-a, --assignee <USER>`: Filter by assignee username
- `-j, --json`: Output as JSON
- `-c, --csv`: Output as CSV
- `-t, --table`: Output as table (default)
- `-L, --limit <NUMBER>`: Limit results to N issues (default: 100)
- `--sort <FIELD>`: Sort by: `created`, `updated`, `comments` (default: `updated`)

**Examples:**
```bash
# List all open issues (default)
./get-all-issues.sh

# List all closed issues
./get-all-issues.sh --state closed

# Filter by labels
./get-all-issues.sh --labels "bug,enhancement" --json

# Filter by assignee
./get-all-issues.sh --assignee isaaceliape --csv

# Combine filters
./get-all-issues.sh --limit 50 --sort created --state open

# Export as CSV with specific labels
./get-all-issues.sh --labels "priority-high" --csv > high_priority.csv
```

**Sample Output (table format):**
```
════════════════════════════════════════════════════════════════════════════════
  #27 [OPEN]
  EPIC: Typee Application Progress Monitoring & Continuous Improvement
  Updated: 2025-11-25T09:30:00Z | Assignees: None

  #26 [OPEN]
  Add unit tests for Vue components
  Updated: 2025-11-25T14:45:00Z | Assignees: None

  #25 [OPEN]
  Migrate from Vuex to Pinia
  Updated: 2025-11-25T12:15:00Z | Assignees: None

════════════════════════════════════════════════════════════════════════════════
✅ Found 3 issues
```

---

### 4. update-issue-by-id.sh

Update GitHub issue properties (title, body, labels, state, assignees).

**Usage:**
```bash
./update-issue-by-id.sh <issue_number> [options]
```

**Arguments:**
- `issue_number` (required): GitHub issue number

**Options:**
- `-h, --help`: Show help message
- `-t, --title <TITLE>`: Update issue title
- `-b, --body <BODY>`: Update issue description
- `-s, --state <STATE>`: Update state: `open` or `closed`
- `-l, --labels <LABELS>`: Update labels (comma-separated, replaces existing)
- `-a, --assignee <USER>`: Add assignee username
- `-u, --unassign`: Remove all assignees
- `--add-label <LABEL>`: Add a single label (without replacing others)
- `--remove-label <LABEL>`: Remove a single label
- `-d, --dry-run`: Show what would be changed without applying

**Examples:**
```bash
# Close an issue
./update-issue-by-id.sh 26 --state closed

# Update title and body
./update-issue-by-id.sh 25 --title "New title" --body "New description"

# Update labels (replaces all existing labels)
./update-issue-by-id.sh 27 --labels "epic,priority-high"

# Assign to user
./update-issue-by-id.sh 8 --assignee isaaceliape

# Add a single label
./update-issue-by-id.sh 26 --add-label "in-progress"

# Preview changes without applying
./update-issue-by-id.sh 26 --dry-run --state closed --labels "bug,verified"

# Remove a label
./update-issue-by-id.sh 25 --remove-label "needs-review"
```

**Sample Output:**
```
ℹ️  Fetching current issue #26...
ℹ️  Updating title...
✅ Title updated
ℹ️  Updating state to closed...
✅ State updated to closed

✅ Issue #26 updated successfully
```

### 5. close-issue-by-id.sh

Close a GitHub issue (marks as closed; can be reopened if needed).

**Usage:**
```bash
./close-issue-by-id.sh <issue_number> [options]
```

**Arguments:**
- `issue_number` (required): GitHub issue number

**Options:**
- `-h, --help`: Show help message
- `-r, --reason <REASON>`: Closing reason/comment (optional)
- `-d, --dry-run`: Show what would be done without applying
- `-f, --force`: Skip confirmation prompt

**Examples:**
```bash
# Close an issue (with confirmation)
./close-issue-by-id.sh 26

# Close with a reason
./close-issue-by-id.sh 26 --reason "Completed"

# Preview what would happen
./close-issue-by-id.sh 26 --dry-run

# Close without confirmation
./close-issue-by-id.sh 26 --force --reason "Duplicate"
```

**Sample Output:**
```
ℹ️  Fetching issue #26...
════════════════════════════════════════════════════════════
Issue #26
Title: Add unit tests for Vue components
State: OPEN
URL: https://github.com/isaaceliape/typee/issues/26
════════════════════════════════════════════════════════════

Close issue #26? (y/N): y
ℹ️  Closing issue #26...
ℹ️  Adding closing comment...

✅ Issue #26 closed successfully
ℹ️  To reopen: gh issue reopen 26 --repo isaaceliape/typee
```

---

### 6. create-pr-from-issue.sh

Create a new pull request directly from a GitHub issue. Automatically generates branch name, PR title, and description from issue details.

**Usage:**
```bash
./create-pr-from-issue.sh [options]
```

**Arguments:**
- `issue_number` (required): GitHub issue number

**Options:**
- `-h, --help`: Show help message
- `-i, --issue <NUMBER>`: Issue number (required)
- `-b, --branch <NAME>`: Custom branch name (optional, auto-generated if not provided)
- `-t, --title <TITLE>`: Custom PR title (optional, uses issue title if not provided)
- `-d, --description <DESC>`: Custom PR description (optional, uses issue body if not provided)
- `--base <BRANCH>`: Base branch to merge into (default: `master`)
- `--draft`: Create as draft PR (not ready for merge)
- `--no-branch`: Use current branch instead of creating new one
- `--auto-format`: Auto-format branch name from issue title (kebab-case)
- `--link-issue`: Include "Closes #issue" in PR description to auto-link issue

**Examples:**
```bash
# Create PR from issue #31
./create-pr-from-issue.sh --issue 31

# Create PR with custom branch name
./create-pr-from-issue.sh -i 31 -b feature/my-feature

# Create as draft PR
./create-pr-from-issue.sh --issue 26 --draft

# Create PR with auto-formatted branch name and link to issue
./create-pr-from-issue.sh --issue 30 --auto-format --link-issue

# Create PR merging to develop branch
./create-pr-from-issue.sh -i 27 --base develop

# Use current branch instead of creating new one
./create-pr-from-issue.sh --issue 28 --no-branch

# Create PR with custom title and link issue
./create-pr-from-issue.sh --issue 29 -t "My custom title" --link-issue
```

**How It Works:**

1. Fetches issue details from GitHub
2. Generates branch name (format: `type/issue-NUMBER-description` or custom)
3. Creates new branch from base branch (or uses current branch with `--no-branch`)
4. Generates PR title and description (from issue title/body)
5. Pushes branch to remote
6. Creates pull request on GitHub

**Branch Naming:**

- Default: `feature/issue-31-issue-title-here`
- With `--auto-format`: `feature/issue-title-here`
- Custom with `-b`: Uses exact name provided
- Extracts priority type from issue (CRITICAL→critical, HIGH→high, etc.)

**PR Description Template:**

Automatically generated from issue details:
```
## Issue Description
[Issue body content]

---

## Implementation

Please describe your implementation approach.

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

Please provide testing steps to verify this implementation.

## Checklist

- [ ] Tests pass locally
- [ ] Code follows project guidelines
- [ ] Documentation updated if needed
- [ ] Related issue #31 addressed

---

Closes #31
```

**Sample Output:**
```
════════════════════════════════════════════════════════════
Create Pull Request from Issue
════════════════════════════════════════════════════════════

ℹ️  Fetching issue #31 details...

Issue Information:
  Title: 🟡 HIGH: Configure GitHub Actions to run linting before merge
  State: OPEN
  Labels: ci/cd,github-actions

ℹ️  Generated branch name: feature/issue-31-configure-github-actions

Pull Request Information:
  Title: 🟡 HIGH: Configure GitHub Actions to run linting before merge
  Branch: feature/issue-31-configure-github-actions
  Base Branch: master
  Draft: No
  Link Issue: false

ℹ️  Creating new branch: feature/issue-31-configure-github-actions
✅ Switched to branch: feature/issue-31-configure-github-actions

ℹ️  Pushing branch to remote...
✅ Branch pushed to remote

ℹ️  Creating pull request...
✅ Pull request created!

════════════════════════════════════════════════════════════
Pull Request Created Successfully!
════════════════════════════════════════════════════════════
URL: https://github.com/isaaceliape/typee/pull/32
Next Steps:
  1. Review the PR on GitHub
  2. Request code review
  3. Address any feedback
  4. Merge when approved and checks pass
PR Information:
  Branch: feature/issue-31-configure-github-actions → master
  Draft: false
  Related Issue: #31
════════════════════════════════════════════════════════════
```

---

## Common Workflows

### Workflow 1: Check Specific Issue Status
```bash
# Get details on an issue
./get-issue-by-id.sh 26

# Get issue details as JSON for processing
./get-issue-by-id.sh 26 json | jq '.body'

# Export issue as JSON
./get-issue-by-id.sh 26 json > issue_26.json
```

### Workflow 2: List and Filter Issues
```bash
# View all open issues
./get-all-issues.sh

# List all closed issues
./get-all-issues.sh --state closed

# Get issues with specific labels
./get-all-issues.sh --labels "bug,priority-high"

# Export board status to CSV for reporting
./get-all-issues.sh --csv > board_status.csv
```

### Workflow 3: Update Issue Properties
```bash
# Close an issue
./update-issue-by-id.sh 26 --state closed

# Update title and add labels
./update-issue-by-id.sh 25 --title "Updated title" --labels "enhancement,in-progress"

# Assign to user and add label
./update-issue-by-id.sh 8 --assignee isaaceliape --add-label "assigned"

# Preview changes before applying
./update-issue-by-id.sh 26 --dry-run --state closed --labels "bug,verified"
```

### Workflow 4: Manage Issues
```bash
# Close an issue with confirmation
./close-issue-by-id.sh 26

# Close multiple issues without confirmation
./close-issue-by-id.sh 1 --force --reason "Duplicate"
./close-issue-by-id.sh 2 --force --reason "Invalid"

# Close issue with reason comment
./close-issue-by-id.sh 26 --force --reason "Completed - merged in PR #123"
```

### Workflow 5: Bulk Operations with JSON Output
```bash
# Get all open issues, extract numbers, and update them
./get-all-issues.sh --json | jq -r '.[].number' | while read num; do
  ./update-issue-by-id.sh "$num" --add-label "reviewed"
done

# Export specific issues to CSV for reporting
./get-all-issues.sh --labels "priority-high" --state open --csv > high_priority_open.csv

# Get all issues assigned to a user as JSON
./get-all-issues.sh --assignee isaaceliape --json | jq '.'
```

### Workflow 6: Create Pull Request from Issue
```bash
# Create PR from issue #31
./create-pr-from-issue.sh --issue 31

# Create draft PR from issue with auto-formatted branch
./create-pr-from-issue.sh --issue 26 --draft --auto-format

# Create PR and auto-link the issue in description
./create-pr-from-issue.sh -i 30 --link-issue

# Create multiple PRs from issues
for issue in 25 26 27; do
  ./create-pr-from-issue.sh --issue "$issue" --link-issue
done

# Create PR with custom base branch
./create-pr-from-issue.sh --issue 28 --base develop --auto-format

# Create PR from current branch (don't create new branch)
git checkout -b my-branch
./create-pr-from-issue.sh --issue 29 --no-branch --title "Custom PR title"
```

---

## Tips & Best Practices

### 1. Make Scripts Executable
```bash
chmod +x *.sh
```

### 2. Add to PATH
```bash
# Add tools directory to PATH for global access
export PATH="$PATH:$(pwd)"

# Or create symlinks in /usr/local/bin
ln -s $(pwd)/get-issue-by-id.sh /usr/local/bin/get-issue
ln -s $(pwd)/get-all-issues.sh /usr/local/bin/get-issues
ln -s $(pwd)/update-issue-by-id.sh /usr/local/bin/update-issue
ln -s $(pwd)/close-issue-by-id.sh /usr/local/bin/close-issue
ln -s $(pwd)/create-pr-from-issue.sh /usr/local/bin/create-pr
```

### 3. Use jq for Complex Queries
```bash
# Get all open issues and extract titles
./get-all-issues.sh --state open --json | jq -r '.[].title'

# Filter issues by label and get count
./get-all-issues.sh --json | jq '[.[] | select(.labels[] | .name == "bug")] | length'

# Get issues updated in the last day
./get-all-issues.sh --json | jq '.[] | select(.updatedAt > now - 86400)'
```

### 4. Automate Issue Updates
```bash
# Add label to all open issues
./get-all-issues.sh --state open --json | jq -r '.[].number' | while read num; do
  ./update-issue-by-id.sh "$num" --add-label "needs-triage"
done

# Close all issues with "wontfix" label
./get-all-issues.sh --labels "wontfix" --json | jq -r '.[].number' | while read num; do
  ./close-issue-by-id.sh "$num" --force --reason "Marked as wontfix"
done
```

### 5. Color Output
Scripts use colors by default. To disable:
```bash
# Pipe through cat to strip colors
./get-all-issues.sh | cat

# Or disable in output file
./get-all-issues.sh -c > issues.csv
```

### 6. Dry-Run Mode
Always use `--dry-run` before making bulk changes:
```bash
# Preview what would happen
./update-issue-by-id.sh 26 --dry-run --state closed

# After confirming, apply changes
./update-issue-by-id.sh 26 --state closed
```

---

## Troubleshooting

### Issue: "GitHub CLI (gh) is not installed"
**Solution:** Install GitHub CLI
```bash
# macOS
brew install gh

# Windows
choco install gh

# Linux
sudo apt install gh
```

### Issue: "Not authenticated with GitHub"
**Solution:** Authenticate with GitHub
```bash
gh auth login

# Choose GitHub.com
# Authenticate via browser
# Authorize "gh" to access account
```

### Issue: "jq is not installed"
**Solution:** Install jq (optional but recommended)
```bash
# macOS
brew install jq

# Windows
choco install jq

# Linux
sudo apt install jq
```

### Issue: Permission denied
**Solution:** Make scripts executable
```bash
chmod +x *.sh
```

### Issue: Script not found
**Solution:** Run from tools directory or add to PATH
```bash
# From repo root
./tools/get-issue-by-id.sh 26

# Or from tools directory
cd tools && ./get-issue-by-id.sh 26

# Or add to PATH
export PATH="$PATH:$(pwd)/tools"
```

---

## Requirements & Dependencies

| Requirement | Status | Purpose | Install |
|------------|--------|---------|---------|
| GitHub CLI | Required | Access GitHub API | `brew install gh` |
| jq | Recommended | JSON processing | `brew install jq` |
| bash | Required | Shell scripting | Usually preinstalled |
| curl/wget | Optional | HTTP requests | Usually preinstalled |

---

## Contributing

To add new tools:

1. Create script in `tools/` directory
2. Follow naming convention: `action-target.sh`
3. Add comprehensive header comments
4. Make executable: `chmod +x script.sh`
5. Add usage documentation to this README
6. Test thoroughly with various inputs

---

## License

These tools are part of the Typee project and follow the same license.

---

## Support

For issues or suggestions:
1. Check script header for troubleshooting
2. Verify GitHub CLI is properly authenticated
3. Ensure all dependencies are installed
4. Check GitHub CLI documentation: https://cli.github.com/manual

---

## Quick Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `create-issue.sh` | Create new issue with priority | `./create-issue.sh -t <TITLE> -p <PRIORITY> [options]` |
| `get-issue-by-id.sh` | Get issue details | `./get-issue-by-id.sh <number> [format]` |
| `get-all-issues.sh` | List/filter issues | `./get-all-issues.sh [options]` |
| `update-issue-by-id.sh` | Modify issue | `./update-issue-by-id.sh <number> [options]` |
| `close-issue-by-id.sh` | Close issue | `./close-issue-by-id.sh <number> [options]` |
| `create-pr-from-issue.sh` | Create PR from issue | `./create-pr-from-issue.sh --issue <NUMBER> [options]` |

---

**Last Updated:** November 25, 2025  
**Repository:** isaaceliape/typee  
**Status:** GitHub Issues (migrated from Kanban board)
