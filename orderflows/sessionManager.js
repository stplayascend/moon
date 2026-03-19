// ============================================================
//  Session Manager
//  Stores multi-step order state in memory, keyed by userId.
//  Each user can only have one active session at a time.
// ============================================================

const sessions = new Map();

/**
 * Retrieve a user's current session (or null).
 * @param {string} userId
 */
function getSession(userId) {
  return sessions.get(userId) ?? null;
}

/**
 * Create or overwrite a user's session.
 * @param {string} userId
 * @param {object} data  - { flow, step, ...orderData }
 */
function setSession(userId, data) {
  sessions.set(userId, data);
}

/**
 * Merge updates into an existing session.
 * @param {string} userId
 * @param {object} updates
 */
function updateSession(userId, updates) {
  const existing = sessions.get(userId) ?? {};
  sessions.set(userId, { ...existing, ...updates });
}

/**
 * Delete a user's session (called after ticket created or cancelled).
 * @param {string} userId
 */
function deleteSession(userId) {
  sessions.delete(userId);
}

module.exports = { getSession, setSession, updateSession, deleteSession };
