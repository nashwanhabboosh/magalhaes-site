// server/config.js
//
// Settings for the blog's server-side code (Cloudflare Pages Functions).
// Nothing in this file is a secret.

// Cloudflare Access (Zero Trust) team that issues the sign-in tokens for
// the blog admin.
export const ACCESS_TEAM_DOMAIN = 'https://shiny-dew-f70c.cloudflareaccess.com';

// Which Access application's sign-ins the admin API accepts is not set
// here but per environment, in the Pages variable ACCESS_AUD (Settings >
// Variables and Secrets), so that a sign-in for preview builds never works
// on the live site. Its two values are the applications' audience tags:
//
//   Production  cfcdb395a7b6b1a1409b74b2c3e636817642db492aa675637301a74bcd9c4995
//               "Blog admin": www.lenscraftersdoctor.com/admin and /api/admin
//   Preview     8dee618371339dfcfc943bcc695e52be2fc0fdcb0c52e1dd7abad03915b267b8
//               *.magalhaes-site.pages.dev, from the "Restrict previews"
//               setting
//
// If the variable is missing, the admin API refuses everyone.

// The addresses the admin API answers on. Access stands in front of each,
// so signing someone out or removing them from a policy takes effect
// there straight away. Every other address is refused, including
// magalhaes-site.pages.dev and the bare lenscraftersdoctor.com, which
// Access does not cover.
export const ADMIN_HOSTNAME = 'www.lenscraftersdoctor.com';

// Preview deployments, all behind the preview Access application.
// Production deployments get addresses here too, but ACCESS_AUD makes
// them refuse that application's sign-ins.
export const PREVIEW_HOSTNAME_SUFFIX = '.magalhaes-site.pages.dev';
