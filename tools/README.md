# Typee Project Tools

Collection of shell scripts to manage and monitor the Typee project using the GitHub CLI (gh).

## Overview

These tools provide command-line access to project management functionality:

- **Get Kanban User Story Details** - Retrieve specific issue information
- **List Kanban Board Items** - View all project board items
- **Project Status Dashboard** - Comprehensive project health overview

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

### 1. get-kanban-user-story.sh

Retrieve detailed information about a specific GitHub issue/user story.

**Usage:**
```bash
./get-kanban-user-story.sh <issue_number> [format]
```

**Arguments:**
- `issue_number` (required): GitHub issue number
- `format` (optional): Output format - `json`, `table`, or `text` (default: `text`)

**Examples:**
```bash
# Get EPIC #27 in text format (default)
./get-kanban-user-story.sh 27

# Get issue #25 as JSON
./get-kanban-user-story.sh 25 json

# Get issue #26 as formatted table
./get-kanban-user-story.sh 26 table
```

**Output Formats:**
- **text**: Plain text with formatted sections (default)
- **json**: JSON output for programmatic processing
- **table**: Formatted table with key information

**Sample Output (text format):**
```
══════════════════════════════════════════════════════════
Issue #27
══════════════════════════════════════════════════════════

Title:
  EPIC: Typee Application Progress Monitoring & Continuous Improvement

Status:
  🟢 OPEN

Details:
  URL: https://github.com/isaaceliape/typee/issues/27
  Created: 2025-11-25
  Updated: 2025-11-25
  Assignees: None
  Labels: None
  Milestone: None

Description:
  Track and monitor the progress of the Typee application...
```

---

### 2. list-kanban-board.sh

List all items on the Typee Kanban board with filtering options.

**Usage:**
```bash
./list-kanban-board.sh [options]
```

**Options:**
- `-h, --help`: Show help message
- `-j, --json`: Output as JSON
- `-c, --csv`: Output as CSV
- `-s, --status <STATUS>`: Filter by status (OPEN, CLOSED, DRAFT)
- `-t, --type <TYPE>`: Filter by type (issue, pullrequest, draft)

**Examples:**
```bash
# List all items (default table format)
./list-kanban-board.sh

# Output as JSON
./list-kanban-board.sh --json

# Only show open issues
./list-kanban-board.sh --status OPEN

# Output as CSV
./list-kanban-board.sh --csv

# Combine filters: open items as JSON
./list-kanban-board.sh -s OPEN -j
```

**Sample Output (table format):**
```
Type   | Title                                            | #
-------|----------------------------------------------|-----
Issue  | EPIC: Typee Application Progress Monitoring...  | 27
Issue  | Migrate from Vuex to Pinia                     | 25
Issue  | Add unit tests for Vue components              | 26
Issue  | Showing errors after blurring field            | 8

✅ Found 4 items on the Kanban board
```

**CSV Format Example:**
```csv
Type,Title,Number,Repository
"Issue","EPIC: Typee Application Progress Monitoring...","27","isaaceliape/typee"
"Issue","Migrate from Vuex to Pinia","25","isaaceliape/typee"
"Issue","Add unit tests for Vue components","26","isaaceliape/typee"
"Issue","Showing errors after blurring field","8","isaaceliape/typee"
```

---

### 3. project-status-dashboard.sh

Display a comprehensive dashboard of project status including build, tests, issues, and metrics.

**Usage:**
```bash
./project-status-dashboard.sh [options]
```

**Options:**
- `-h, --help`: Show help message
- `-f, --full`: Show full detailed report
- `-q, --quick`: Show quick summary only
- `-w, --watch`: Watch mode (auto-update every 10 seconds)
- `-o, --output <FILE>`: Save output to file

**Examples:**
```bash
# Show default dashboard
./project-status-dashboard.sh

# Show full detailed report
./project-status-dashboard.sh --full

# Auto-update mode (refreshes every 10 seconds)
./project-status-dashboard.sh --watch

# Save dashboard to file
./project-status-dashboard.sh -o status.txt

# Quick summary only
./project-status-dashboard.sh --quick
```

**Sample Output:**
```
╔════════════════════════════════════════════════════════╗
║ Typee Project Status Dashboard
╚════════════════════════════════════════════════════════╝

━━━ 📊 Project Overview ━━━

Repository:  isaaceliape/typee
Project:     Typee Kanban board (Private)
Updated:     2025-11-25 09:30:15

━━━ 🚦 Build & Quality Status ━━━

Linting: ✅ PASSING
Tests:   ✅ PASSING
Build:   ✅ PASSING

━━━ 📋 GitHub Issues Status ━━━

Total Issues:  27
Open:          11
Closed:        16

━━━ 🎯 Kanban Board Items ━━━

Total Items:   4

Type       Title                                          Number
========== ==================================================== ==========
Issue      EPIC: Typee Application Progress Monitor...  27
Issue      Migrate from Vuex to Pinia                  25
Issue      Add unit tests for Vue components            26
Issue      Showing errors after blurring field         8

━━━ 📈 Recent Activity ━━━

Recent commits are displayed here...

━━━ 📚 Documentation ━━━

Specifications available in spec/ directory:
  • EPIC-progress-monitoring.md
  • project-completion-summary.md
  • dependency-upgrade-plan.md
  • code-review-typescript-best-practices.md

━━━ 🔧 Tools Available ━━━

Tools in tools/ directory:
  • get-kanban-user-story.sh
  • list-kanban-board.sh
  • project-status-dashboard.sh

════════════════════════════════════════════════════════
```

---

## Common Workflows

### Workflow 1: Check Specific Issue Status
```bash
# Get details on the EPIC
./get-kanban-user-story.sh 27

# Check Pinia migration issue
./get-kanban-user-story.sh 25 json | jq '.body'

# Export issue as JSON for processing
./get-kanban-user-story.sh 26 json > issue_26.json
```

### Workflow 2: Monitor Project Health
```bash
# View all board items
./list-kanban-board.sh

# Get dashboard overview
./project-status-dashboard.sh

# Auto-update every 10 seconds
./project-status-dashboard.sh --watch

# Export board status to CSV for reporting
./list-kanban-board.sh --csv > board_status.csv
```

### Workflow 3: Filter and Report
```bash
# List only open issues
./list-kanban-board.sh --status OPEN

# Export open issues as JSON
./list-kanban-board.sh --status OPEN --json

# Save daily status report
./project-status-dashboard.sh -f -o daily_status_$(date +%Y-%m-%d).txt
```

### Workflow 4: CI/CD Integration
```bash
# Check project health before deployment
./project-status-dashboard.sh > /tmp/status.txt

# Get specific issue data for automation
./get-kanban-user-story.sh 27 json | jq -r '.title'

# Export board to CSV for tracking
./list-kanban-board.sh --csv > /tmp/board_snapshot.csv
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
ln -s $(pwd)/get-kanban-user-story.sh /usr/local/bin/get-kanban-story
```

### 3. Use jq for Complex Queries
```bash
# Get all open issues
./get-kanban-user-story.sh 27 json | jq '.labels'

# Extract specific fields
./list-kanban-board.sh --json | jq '.[].number'

# Filter by pattern
./list-kanban-board.sh --json | jq '.[] | select(.title | contains("EPIC"))'
```

### 4. Automate Status Reports
```bash
# Daily status report via cron
# Add to crontab: 0 9 * * * /path/to/project-status-dashboard.sh -o /reports/status_$(date +\%Y-\%m-\%d).txt

# Weekly board export
# 0 18 * * FRI /path/to/list-kanban-board.sh --csv > /reports/board_$(date +\%Y-\%m-\%d).csv
```

### 5. Color Output
Scripts use colors by default. To disable:
```bash
# Pipe through cat to strip colors
./project-status-dashboard.sh | cat

# Or disable in output file
./project-status-dashboard.sh -o status.txt
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
./tools/get-kanban-user-story.sh 27

# Or from tools directory
cd tools && ./get-kanban-user-story.sh 27

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

**Last Updated:** November 25, 2025  
**Repository:** isaaceliape/typee  
**Project:** Typee Kanban board
