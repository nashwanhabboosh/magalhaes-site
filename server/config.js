// server/config.js
//
// Settings for the blog's server-side code (Cloudflare Pages Functions).
// Nothing in this file is a secret.

// Cloudflare Access (Zero Trust) team that issues the sign-in tokens for
// the blog admin.
export const ACCESS_TEAM_DOMAIN = 'https://shiny-dew-f70c.cloudflareaccess.com';

// Audience (AUD) tags of the Access applications allowed to reach
// /api/admin. Each Access application has its own tag, so add another
// here if a second application (e.g. one covering preview deployments)
// is ever put in front of the admin.
export const ACCESS_AUDS = [
  // "Blog admin" - www.lenscraftersdoctor.com/admin and /api/admin
  'cfcdb395a7b6b1a1409b74b2c3e636817642db492aa675637301a74bcd9c4995'
];
