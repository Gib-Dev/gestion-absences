// Edge-compatible authentication utilities for middleware
// Uses Web Crypto API instead of Node.js libraries

// Simple JWT verification for Edge Runtime
export const verifyTokenEdge = (token) => {
  try {
    // Basic JWT structure validation
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    
    try {
      const parsedPayload = JSON.parse(decodedPayload);
      
      // Check if token is expired
      if (parsedPayload.exp && Date.now() >= parsedPayload.exp * 1000) {
        return null;
      }
      
      return parsedPayload;
    } catch (parseError) {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Simple token validation for middleware
export const isValidToken = (token) => {
  if (!token) return false;
  
  const decoded = verifyTokenEdge(token);
  return decoded !== null;
};
