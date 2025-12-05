import { auth } from "@/app/api/auth/[...nextauth]/route";

/**
 * Get current user session
 * @returns {Promise<Object|null>} Session object or null
 */
export async function getSession() {
  return await auth();
}

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>}
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

/**
 * Check if user has specific role
 * @param {string} role - Role to check ('admin', 'blog_writer', 'customer')
 * @returns {Promise<boolean>}
 */
export async function hasRole(role) {
  const session = await getSession();
  return session?.user?.role === role;
}

/**
 * Check if user is admin
 * @returns {Promise<boolean>}
 */
export async function isAdmin() {
  return await hasRole("admin");
}

/**
 * Check if user is blog writer or admin
 * @returns {Promise<boolean>}
 */
export async function isBlogWriter() {
  const session = await getSession();
  return session?.user?.role === "blog_writer" || session?.user?.role === "admin";
}

