# Isolated Backup Restore Drill

[Turkce](./RESTORE-DRILL.md)

Run restore validation in a temporary PostgreSQL container without attaching it
to the production database or volumes.

## Verified rules

1. Verify checksums before restore.
2. Use the same pinned `supabase/postgres` image version as the backup source.
3. Do not rely only on `pg_isready`. Wait for `PostgreSQL init process complete;
   ready for start up.` in the image log.
4. Restore as the image's real superuser, `supabase_admin`.
5. Create a temporary maintenance database, drop the initialized target
   `postgres` database, and recreate it from `template0`.
6. Filter only `CREATE ROLE` statements for roles already supplied by the target
   image. Preserve missing roles and all later grants/attributes.
7. Use `ON_ERROR_STOP=1` and keep restore logs private.
8. Compare persistent schema/table, Auth user, and Storage bucket counts with
   read-only source queries.
9. Extract Storage/Functions/config archives into a temporary directory and
   verify their contents.
10. Remove temporary SQL, logs, container, directory, and volume.

## Common restore failures

- `role already exists`: the Supabase image pre-creates system roles.
- `only superusers can modify it`: use `supabase_admin`, not `postgres`.
- `schema auth already exists`: restore into a clean `template0` database after
  image initialization completes.

A backup is not considered verified until this isolated drill passes.
