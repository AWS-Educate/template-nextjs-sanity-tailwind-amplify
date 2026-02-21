/**
 * Phase 6: Content Migration to Sanity CMS
 *
 * Migrates extracted JSON content from Wix into Sanity documents.
 * Idempotent: checks slug existence before creating. Safe to re-run.
 *
 * Usage:
 *   npx tsx --env-file=scripts/.env scripts/migrate.ts
 *
 * Prerequisites:
 *   scripts/.env with SANITY_API_WRITE_TOKEN=sk...
 */

import {loadImageCache} from './migrate/image-cache.js'
import {migrateCategories} from './migrate/01-categories.js'
import {migrateSiteSettings} from './migrate/02-site-settings.js'
import {migratePages} from './migrate/03-pages.js'
import {migratePosts} from './migrate/04-posts.js'
import {migrateBookstore} from './migrate/05-bookstore.js'
import {migrateSchedule} from './migrate/06-schedule.js'
import {migrateEvents} from './migrate/07-events.js'
import {migrateLegacyRedirects} from './migrate/08-legacy-redirects.js'

async function main() {
  console.log('=== Phase 6: Content Migration ===\n')
  const start = Date.now()

  // Load image cache for re-runnability
  loadImageCache()

  // Execute in dependency order
  await migrateCategories()
  await migrateSiteSettings()
  await migratePages()
  await migratePosts()
  await migrateBookstore()
  await migrateSchedule()
  await migrateEvents()
  await migrateLegacyRedirects()

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n=== Migration complete in ${elapsed}s ===`)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
