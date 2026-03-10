# Memory Sync Extractor – Shared Local Memory Maintenance

## Scope
- Preserve the current shared-memory graph schema in `C:\Users\nicol\.agents\memory\server-memory.json`
- Add a rerunnable extractor under `C:\Users\nicol\.agents\memory-sync`
- Back up the current shared memory file before each refresh
- Track which Windsurf memory sources have been processed vs are still pending deeper extraction

## Findings
- The shared local memory file now uses the graph-shaped `entities` and `relations` structure rather than the earlier grouped JSON export
- Windsurf global rules are directly readable, but most repo memories are stored as protobuf `.pb` files
- Best-effort printable-string extraction from the `.pb` files is useful, but many sources still require deeper decoding to move from pending to processed

## Changes applied
- Added `C:\Users\nicol\.agents\memory-sync\refresh_server_memory.py` as the rerunnable extractor
- Added `C:\Users\nicol\.agents\memory-sync\refresh_server_memory.sh` as a Git Bash wrapper for regular refreshes
- Added automatic backup creation under `C:\Users\nicol\.agents\memory-sync\backups`
- Added sidecar tracking file `C:\Users\nicol\.agents\memory-sync\source-status.json`
- Kept `server-memory.json` on the current graph schema while merging curated seed memories, global rules, and any future extracted findings
- Added per-source status tracking with `processed` and `pending`, plus SHA-256 hashes, extracted-count values, and repo matches

## Current status
- The extractor can now be rerun regularly without changing the top-level memory graph format
- `global_rules.md` is marked as processed
- Windsurf protobuf memories currently show as pending until richer extraction logic can recover repo-aligned content from them

## Remaining follow-up ideas
- Add true protobuf decoding if the Windsurf memory schema becomes available
- Promote `.pb` sources from pending to processed when richer structured extraction is implemented
- Consider scheduling the wrapper via Task Scheduler or a lightweight cron-style runner if regular refreshes become routine
