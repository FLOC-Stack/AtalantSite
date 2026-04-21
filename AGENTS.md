<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:home-design-rules -->
# Home — Design rules

- **All home sections are fullpage (`min-h-screen`) on every viewport.**
  No exceptions: Hero, HomeProductsIntro, HomeLogistics, and any new block
  must fill at least 100vh both on mobile and desktop. Floating cards,
  background videos and timelines fit inside that envelope.

- **All home sections use the full viewport width — never `max-width`.**
  The outer `<section>` and its content wrapper must stretch to 100% of the
  viewport. Side padding is the only thing that constrains the content
  (`px-10 sm:px-14 lg:px-20` for editorial sections, matching the effective
  air of the HomeProductsIntro card). Do NOT add `max-w-[…]` to the content
  wrapper. Individual child elements (body copy, timeline labels) can have
  their own `max-w` for readability, but the section container stays fluid.
<!-- END:home-design-rules -->


<claude-mem-context>
# Memory Context

# [atalant-site/florence] recent context, 2026-04-20 8:51pm GMT+2

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 11 obs (3,958t read) | 175,501t work | 98% savings

### Apr 20, 2026
264 8:19p 🟣 Atalant Florence — Catalog i18n via catalog-copy.ts
266 8:33p 🔵 Atalant Florence — Payload CMS Data Layer Architecture
267 8:36p 🟣 Atalant Florence — SEO Metadata Layer Added
268 " 🔵 Atalant Florence — Payload DB "undefined" Error During next build (Non-Fatal)
269 " 🔴 Atalant Florence — Payload DB Early-Exit Guard Added to Silence Build-Time Errors
270 8:38p 🔵 Atalant Florence — Hardcoded English Strings Found in UI Components
271 8:40p 🔴 Atalant Florence — hasPayloadDatabase() Guard Confirmed Clean Build
272 8:42p 🔵 Atalant Florence — Full Working Diff Scope: 13 Modified + 5 New Untracked Files
273 8:47p 🔵 Atalant Florence — Design Token System (globals.css)
274 " 🟣 Atalant Florence — SiteHeader Mobile Button i18n via uiCopy Record
275 8:49p 🔵 Atalant Florence — Destructive Regression by Secondary Agent

Access 176k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>