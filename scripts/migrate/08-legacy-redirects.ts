import {writeClient} from './config.js'
import {log} from './utils.js'

const REDIRECTS = [
  {
    oldPath: '/_api/',
    newPath: '/',
    statusCode: 301,
    description: 'Wix internal API paths',
  },
  {
    oldPath: '/_functions/',
    newPath: '/',
    statusCode: 301,
    description: 'Wix serverless functions paths',
  },
]

export async function migrateLegacyRedirects() {
  log('08-redirects', `Migrating ${REDIRECTS.length} legacy redirects...`)

  for (const r of REDIRECTS) {
    // Check by oldPath
    const exists = await writeClient.fetch<number>(
      `count(*[_type == "legacyRedirect" && oldPath == $oldPath])`,
      {oldPath: r.oldPath},
    )
    if (exists > 0) {
      log('08-redirects', `Skip (exists): ${r.oldPath}`)
      continue
    }

    await writeClient.create({
      _type: 'legacyRedirect',
      oldPath: r.oldPath,
      newPath: r.newPath,
      statusCode: r.statusCode,
      description: r.description,
      isActive: true,
    })

    log('08-redirects', `Created: ${r.oldPath} → ${r.newPath}`)
  }

  log('08-redirects', 'Done')
}
