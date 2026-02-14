// In-memory rate limiter
// For multi-instance deployments, replace with Redis-backed store

const stores = new Map();

function getStore(name) {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }
  return stores.get(name);
}

function cleanup(store, windowMs) {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now - entry.resetTime > windowMs) {
      store.delete(key);
    }
  }
}

export function rateLimit({ name, windowMs = 60000, max = 5 }) {
  const store = getStore(name);

  // Cleanup stale entries every 60s
  setInterval(() => cleanup(store, windowMs), 60000);

  return function check(identifier) {
    const now = Date.now();
    const entry = store.get(identifier);

    if (!entry || now > entry.resetTime) {
      store.set(identifier, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: max - 1 };
    }

    entry.count++;

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      return { allowed: false, remaining: 0, retryAfter };
    }

    return { allowed: true, remaining: max - entry.count };
  };
}

// Pre-configured limiters
export const loginLimiter = rateLimit({
  name: "login",
  windowMs: 60000, // 1 minute
  max: 5,
});

export const registerLimiter = rateLimit({
  name: "register",
  windowMs: 60000,
  max: 3,
});
