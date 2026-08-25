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
