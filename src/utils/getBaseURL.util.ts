/**
 * Retrieves the base URL from environment variables.
 *
 * @param env - The environment variable name without the platform prefix.
 * @returns The base URL for the specified environment.
 * @example 'APP_EXAMPLE_API'
 */
export const getBaseURL = (env: string): string | undefined => {
  if (window.Cypress) {
    return Cypress.env('CY_' + env); // When running Cypress Intercept
  } else if (import.meta.env) {
    return import.meta.env['VITE_' + env]; // When running in development mode with Vite
  }

  return process.env['VUE_' + env]; // When building for production with Vue CLI
};

/**
 * Extracts the hostname from a given URL.
 *
 * @param url - The base URL.
 * @returns The hostname/domain (e.g., example.com).
 */
export const getHostName = (url: string | undefined): string => {
  if (!url) return '';

  const urlObject = new URL(url);
  return urlObject.hostname;
};
