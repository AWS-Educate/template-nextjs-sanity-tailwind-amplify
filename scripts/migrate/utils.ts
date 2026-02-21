import {writeClient} from './config.js'
import {getOrUploadImage} from './image-cache.js'
import crypto from 'crypto'

export function generateKey(): string {
  return crypto.randomBytes(6).toString('hex')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96)
}

export function textToPortableText(
  text: string,
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote' = 'normal',
) {
  return text
    .split('\n\n')
    .filter((p) => p.trim())
    .map((paragraph) => ({
      _type: 'block' as const,
      _key: generateKey(),
      style,
      children: [{_type: 'span' as const, _key: generateKey(), text: paragraph.trim(), marks: []}],
      markDefs: [],
    }))
}

export async function uploadImageFromUrl(url: string): Promise<{_ref: string; _type: 'reference'}> {
  const assetRef = await getOrUploadImage(url, async (cleanUrl) => {
    const res = await fetch(cleanUrl)
    if (!res.ok) throw new Error(`Failed to fetch image: ${cleanUrl} (${res.status})`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = cleanUrl.split('/').pop()?.split('~')[0] || 'image'
    const asset = await writeClient.assets.upload('image', buffer, {filename})
    return asset._id
  })
  return {_ref: assetRef, _type: 'reference'}
}

export function makeImageField(assetRef: {_ref: string; _type: 'reference'}, alt?: string) {
  return {
    _type: 'image' as const,
    asset: assetRef,
    ...(alt ? {alt} : {}),
  }
}

export function stripWixParams(url: string): string {
  // Extract just the base Wix media URL up to ~mv2.ext (strips all transform paths)
  const match = url.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+~mv2\.[a-z]+)/i)
  if (match) return match[1]
  // For non-mv2 Wix URLs, strip /v1/fill/... segments
  return url.replace(/\/v1\/(fill|crop)\/[^/]+\/[^?]*/, '')
}

export async function docExists(type: string, slug: string): Promise<boolean> {
  const count = await writeClient.fetch<number>(
    `count(*[_type == $type && slug.current == $slug])`,
    {type, slug},
  )
  return count > 0
}

export async function singletonExists(id: string): Promise<boolean> {
  const count = await writeClient.fetch<number>(`count(*[_id == $id])`, {id})
  return count > 0
}

export function log(step: string, msg: string) {
  console.log(`[${step}] ${msg}`)
}
