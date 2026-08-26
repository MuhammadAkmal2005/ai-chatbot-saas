// Short-burst anti-spam only (e.g. someone mashing send). Being in-memory
// and per-serverless-instance is fine for this purpose. The real,
// authoritative monthly plan limit lives in lib/usage.ts and is backed
// by the database, so it's correct across deploys and instances.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

const hitsBySession = new Map<string, number[]>();

export function isSessionRateLimited(sessionId: string) {
  const now = Date.now();
  const recent = (hitsBySession.get(sessionId) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (recent.length >= MAX_REQUESTS) {
    hitsBySession.set(sessionId, recent);
    return true;
  }

  recent.push(now);
  hitsBySession.set(sessionId, recent);
  return false;
}