# NoLie Leadership Hub v3

This release adds a connected Agency Operating System structure:

- `/` Dashboard
- `/weekly/` Weekly Updates
- `/monthly/` Monthly Priorities
- `/team/` Team profiles
- `/resources/` Weekly Resource Planning + Responsibility Matrix
- `/initiatives/` Initiative ownership
- `/workshop/` Quarterly Priority Workshop

## Install

1. In Supabase SQL Editor, run `supabase-v3-migration.sql` once.
2. In GitHub, upload the contents of this folder to the repository root, preserving folders.
3. Replace the existing root `index.html` and `weekly/index.html` when prompted.
4. Add the new folders: `assets`, `monthly`, `team`, `resources`, and `initiatives`.
5. Keep your existing Supabase project and authentication users.

## Data model

The migration adds:

- `people`
- `monthly_plans`
- `resource_plans`
- `resource_allocations`
- `initiatives`

It keeps the existing `weekly_updates` and `hub_content` tables unchanged.
