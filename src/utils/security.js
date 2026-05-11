/**
 * 🛡️ Varsaka Security Utils
 * Provides basic sanitization to prevent common injection attacks.
 */

export const sanitize = (str) => {
  if (typeof str !== 'string') return str;
  
  // 🛡️ Step 1: Remove potentially dangerous tags and attributes
  const clean = str
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
    .replace(/on\w+="[^"]*"/gim, "")
    .replace(/javascript:[^"]*/gim, "")
    .trim();

  // 🛡️ Step 2: Escape HTML special characters to prevent XSS
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return clean.replace(/[&<>"']/g, (m) => map[m]);
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[+]?[0-9\s-]{7,15}$/.test(phone);
};
