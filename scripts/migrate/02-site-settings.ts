import {writeClient} from './config.js'
import {uploadImageFromUrl, makeImageField, generateKey, singletonExists, log} from './utils.js'
import fs from 'fs'
import {CONTENT_DIR} from './config.js'

export async function migrateSiteSettings() {
  log('02-site-settings', 'Migrating site settings...')

  const SETTINGS_ID = 'siteSettings'

  if (await singletonExists(SETTINGS_ID)) {
    log('02-site-settings', 'Skip (exists): siteSettings singleton')
    return
  }

  const homeData = JSON.parse(fs.readFileSync(`${CONTENT_DIR}/home.json`, 'utf-8'))

  // Upload logo
  const logoUrl = homeData.images?.find((i: any) => i.usage === 'header-logo')?.url
  let logo
  if (logoUrl) {
    const assetRef = await uploadImageFromUrl(logoUrl)
    logo = makeImageField(assetRef, 'Logo SRF Bogotá')
  }

  // Navigation
  const navigation = (homeData.navigation || []).map((nav: any) => ({
    _type: 'navItem',
    _key: generateKey(),
    label: nav.label,
    href: nav.href,
    ...(nav.hasDropdown
      ? {
          submenu: [
            {
              _key: generateKey(),
              label: nav.label,
              href: nav.href === '#' ? `/${nav.label.toLowerCase().replace(/\s+/g, '-')}` : nav.href,
            },
          ],
        }
      : {}),
  }))

  // Social media
  const social = homeData.footer?.social || {}
  const socialMedia = [
    social.facebook && {
      _key: generateKey(),
      platform: 'Facebook',
      url: social.facebook,
    },
    social.instagram && {
      _key: generateKey(),
      platform: 'Instagram',
      url: social.instagram,
    },
    social.youtube && {
      _key: generateKey(),
      platform: 'YouTube',
      url: social.youtube,
    },
  ].filter(Boolean)

  await writeClient.createOrReplace({
    _id: SETTINGS_ID,
    _type: 'siteSettings',
    title: 'Centro de Meditación SRF Bogotá',
    description: homeData.footer?.aboutText || '',
    ...(logo ? {logo} : {}),
    contactEmail: homeData.footer?.email || 'centro@yogananda-bogota.org',
    contactPhone: homeData.footer?.phone || '+57 312 4202518',
    address: homeData.footer?.address || 'Kra 3A No 46 - 48 Chapinero\nBogotá, Colombia.',
    socialMedia,
    navigation,
    footerText: homeData.footer?.copyright || '',
  })

  log('02-site-settings', 'Created siteSettings singleton')
}
