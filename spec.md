# Smart Civic Reporter

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Home page with hero, feature cards, and CTAs
- Report Issue page with form (name, location, issue type, description, photo upload) and success state
- View Issues page with card grid showing issue icon, title, location, description, status badge
- Admin Dashboard with login gate and issue management (status updates, stats)
- Navigation between all pages

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend
- Issue data model: id, name, location, issueType, description, photoUrl, status, createdAt
- submitIssue(name, location, issueType, description, photoUrl) -> IssueId
- getIssues() -> [Issue]
- updateIssueStatus(id, status) -> Bool
- adminLogin(password) -> Bool (simple hardcoded password for prototype)

### Frontend
- 4 pages: Home, ReportIssue, ViewIssues, AdminDashboard
- React Router for navigation
- Issue status: Pending (red), In Progress (yellow), Resolved (green)
- Admin login gate with hardcoded password
- Blob storage for photo uploads
