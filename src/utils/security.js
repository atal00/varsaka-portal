/**
 * 🛡️ Varsaka Security Utils
 * Provides basic sanitization to prevent common injection attacks.
 */

export const sanitize = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") // Remove script tags
    .replace(/on\w+="[^"]*"/gim, "") // Remove inline event handlers
    .replace(/javascript:[^"]*/gim, "") // Remove javascript: pseudo-protocol
    .trim();
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[+]?[0-9\s-]{7,15}$/.test(phone);
};
