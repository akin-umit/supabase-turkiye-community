import assert from 'node:assert/strict'
import { once } from 'node:events'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import {
  createApp,
  createRateLimiter,
  buildDefaultProbes,
  isAuthorized,
  readBackupStatus,
  readMigrationStatus,
} from './server.mjs'

test('optional probes are enabled only by explicit flags', () => {
  const core = buildDefaultProbes({})
  assert.equal('analytics' in core, false)
  assert.equal('vector' in core, false)

  const logs = buildDefaultProbes({
    MANAGEMENT_ENABLE_ANALYTICS: 'true',
    MANAGEMENT_ENABLE_VECTOR: 'true',
  })
  assert.deepEqual(logs.analytics, { host: 'analytics', port: 4000 })
  assert.deepEqual(logs.vector, { host: 'vector', port: 9001 })
})

test('authorization requires an exact bearer token', () => {
  assert.equal(isAuthorized('Bearer expected', 'expected'), true)
  assert.equal(isAuthorized('Bearer wrong', 'expected'), false)
  assert.equal(isAuthorized(undefined, 'expected'), false)
  assert.equal(isAuthorized('Bearer expected', ''), false)
})

test('rate limiter resets after its window', () => {
  const allow = createRateLimiter({ limit: 2, windowMs: 100 })
  assert.equal(allow('client', 0), true)
  assert.equal(allow('client', 1), true)
  assert.equal(allow('client', 2), false)
  assert.equal(allow('client', 101), true)
})

test('status files accept only sanitized and valid schemas', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'management-api-'))
  const backupFile = join(directory, 'backup.json')
  const migrationFile = join(directory, 'migration.json')

  await writeFile(
    backupFile,
    JSON.stringify({ status: 'verified', lastVerifiedAt: '2026-07-11T09:00:00Z', secret: 'ignored' })
  )
  await writeFile(
    migrationFile,
    JSON.stringify({ status: 'applied', lastApplied: '20260711090000_schema', appliedAt: '2026-07-11T09:01:00Z' })
  )

  assert.deepEqual(await readBackupStatus(backupFile), {
    status: 'verified',
    lastVerifiedAt: '2026-07-11T09:00:00.000Z',
  })
  assert.deepEqual(await readMigrationStatus(migrationFile), {
    status: 'applied',
    lastApplied: '20260711090000_schema',
    appliedAt: '2026-07-11T09:01:00.000Z',
  })
})

test('missing and malformed status files are unavailable without raw errors', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'management-api-'))
  const malformedFile = join(directory, 'malformed.json')
  await writeFile(malformedFile, '{not-json')

  assert.deepEqual(await readBackupStatus(), { status: 'unavailable' })
  assert.deepEqual(await readBackupStatus(malformedFile), { status: 'unavailable' })
  assert.deepEqual(await readMigrationStatus(join(directory, 'missing.json')), {
    status: 'unavailable',
  })
})

test('health is public and overview is protected and sanitized', async (context) => {
  const server = createApp({
    token: 'test-token',
    probes: { database: { host: '127.0.0.1', port: 1, timeoutMs: 10 } },
    backupStatusFile: 'does-not-exist',
    migrationStatusFile: 'does-not-exist',
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  context.after(() => server.close())

  const { port } = server.address()
  const health = await fetch(`http://127.0.0.1:${port}/health`)
  assert.equal(health.status, 200)

  const denied = await fetch(`http://127.0.0.1:${port}/v1/overview`)
  assert.equal(denied.status, 401)

  const allowed = await fetch(`http://127.0.0.1:${port}/v1/overview`, {
    headers: { authorization: 'Bearer test-token' },
  })
  assert.equal(allowed.status, 200)
  const body = await allowed.json()
  assert.equal(body.status, 'degraded')
  assert.equal(body.services.database, 'unavailable')
  assert.deepEqual(body.backup, { status: 'unavailable' })
  assert.deepEqual(body.migration, { status: 'unavailable' })
  assert.equal(JSON.stringify(body).includes('test-token'), false)
})
