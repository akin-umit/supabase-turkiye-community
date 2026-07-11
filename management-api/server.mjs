import { timingSafeEqual } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { connect } from 'node:net'
import { pathToFileURL } from 'node:url'

const VERSION = '0.2.0'
const DEFAULT_LIMIT = 60
const DEFAULT_WINDOW_MS = 60_000

export function isAuthorized(header, expectedToken) {
  if (!expectedToken || !header?.startsWith('Bearer ')) return false
  const supplied = Buffer.from(header.slice(7))
  const expected = Buffer.from(expectedToken)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

export function createRateLimiter({ limit = DEFAULT_LIMIT, windowMs = DEFAULT_WINDOW_MS } = {}) {
  const clients = new Map()
  return (client, now = Date.now()) => {
    const current = clients.get(client)
    if (!current || now - current.startedAt >= windowMs) {
      clients.set(client, { count: 1, startedAt: now })
      return true
    }
    current.count += 1
    return current.count <= limit
  }
}

export function checkTcp({ host, port, timeoutMs = 800 }) {
  return new Promise((resolve) => {
    const socket = connect({ host, port })
    const finish = (result) => {
      socket.destroy()
      resolve(result)
    }
    socket.setTimeout(timeoutMs)
    socket.once('connect', () => finish('healthy'))
    socket.once('timeout', () => finish('unavailable'))
    socket.once('error', () => finish('unavailable'))
  })
}

function unavailableStatus() {
  return { status: 'unavailable' }
}

export async function readBackupStatus(filePath) {
  if (!filePath) return unavailableStatus()

  try {
    const value = JSON.parse(await readFile(filePath, 'utf8'))
    if (value.status !== 'verified' || !Number.isFinite(Date.parse(value.lastVerifiedAt))) {
      return unavailableStatus()
    }
    return { status: 'verified', lastVerifiedAt: new Date(value.lastVerifiedAt).toISOString() }
  } catch {
    return unavailableStatus()
  }
}

export async function readMigrationStatus(filePath) {
  if (!filePath) return unavailableStatus()

  try {
    const value = JSON.parse(await readFile(filePath, 'utf8'))
    if (
      value.status !== 'applied' ||
      typeof value.lastApplied !== 'string' ||
      !/^[A-Za-z0-9_.-]{1,128}$/.test(value.lastApplied) ||
      !Number.isFinite(Date.parse(value.appliedAt))
    ) {
      return unavailableStatus()
    }
    return {
      status: 'applied',
      lastApplied: value.lastApplied,
      appliedAt: new Date(value.appliedAt).toISOString(),
    }
  } catch {
    return unavailableStatus()
  }
}

export async function buildOverview({ probes, commit = 'unknown', backupStatusFile, migrationStatusFile }) {
  const [entries, backup, migration] = await Promise.all([
    Promise.all(
      Object.entries(probes).map(async ([name, target]) => [name, await checkTcp(target)])
    ),
    readBackupStatus(backupStatusFile),
    readMigrationStatus(migrationStatusFile),
  ])
  const services = Object.fromEntries(entries)
  const status = Object.values(services).every((value) => value === 'healthy')
    ? 'healthy'
    : 'degraded'

  return {
    generatedAt: new Date().toISOString(),
    status,
    services,
    deployment: {
      commit: /^[0-9a-f]{7,40}$/i.test(commit) ? commit : 'unknown',
      version: VERSION,
    },
    backup,
    migration,
  }
}

export function buildDefaultProbes(environment = process.env) {
  const probes = {
    database: { host: 'db', port: 5432 },
    auth: { host: 'auth', port: 9999 },
    rest: { host: 'rest', port: 3000 },
    realtime: { host: 'realtime', port: 4000 },
    storage: { host: 'storage', port: 5000 },
    functions: { host: 'functions', port: 9000 },
  }

  if (environment.MANAGEMENT_ENABLE_ANALYTICS === 'true') {
    probes.analytics = { host: 'analytics', port: 4000 }
  }
  if (environment.MANAGEMENT_ENABLE_VECTOR === 'true') {
    probes.vector = { host: 'vector', port: 9001 }
  }

  return probes
}

export function createApp(options = {}) {
  const token = options.token ?? process.env.MANAGEMENT_API_TOKEN ?? ''
  const allowRequest = createRateLimiter(options.rateLimit)
  const probes = options.probes ?? buildDefaultProbes()

  return createServer(async (request, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')

    if (request.url === '/health') {
      response.end(JSON.stringify({ status: 'ok', version: VERSION }))
      return
    }

    const client = request.socket.remoteAddress ?? 'unknown'
    if (!allowRequest(client)) {
      response.writeHead(429)
      response.end(JSON.stringify({ error: 'rate_limited' }))
      return
    }

    if (!isAuthorized(request.headers.authorization, token)) {
      response.writeHead(401)
      response.end(JSON.stringify({ error: 'unauthorized' }))
      return
    }

    if (request.method === 'GET' && request.url === '/v1/overview') {
      const overview = await buildOverview({
        probes,
        commit: process.env.DEPLOYED_COMMIT ?? 'unknown',
        backupStatusFile: options.backupStatusFile ?? process.env.BACKUP_STATUS_FILE,
        migrationStatusFile: options.migrationStatusFile ?? process.env.MIGRATION_STATUS_FILE,
      })
      response.end(JSON.stringify(overview))
      return
    }

    response.writeHead(404)
    response.end(JSON.stringify({ error: 'not_found' }))
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 8080)
  const server = createApp()
  server.listen(port, '0.0.0.0')
}
