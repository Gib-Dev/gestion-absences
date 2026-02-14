// Edge-compatible JWT verification using Web Crypto API (HMAC SHA-256)

function base64UrlDecode(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
}

function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
}

export const verifyTokenEdge = async (token) => {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const [header, payload, signature] = parts;

    // Verify the signature using HMAC SHA-256
    const key = await getKey();
    const data = new TextEncoder().encode(`${header}.${payload}`);
    const sig = base64UrlDecode(signature);

    const valid = await crypto.subtle.verify("HMAC", key, sig, data);

    if (!valid) {
      return null;
    }

    // Decode and parse the payload
    const decodedPayload = new TextDecoder().decode(base64UrlDecode(payload));
    const parsedPayload = JSON.parse(decodedPayload);

    // Check expiration
    if (parsedPayload.exp && Date.now() >= parsedPayload.exp * 1000) {
      return null;
    }

    return parsedPayload;
  } catch (error) {
    return null;
  }
};

export const isValidToken = async (token) => {
  if (!token) return false;
  const decoded = await verifyTokenEdge(token);
  return decoded !== null;
};
