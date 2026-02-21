import fs from 'fs'
import path from 'path'
import {stripWixParams} from './utils.js'

const CACHE_FILE = path.resolve(process.cwd(), 'scripts/.image-cache.json')

let cache: Record<string, string> = {}

export function loadImageCache() {
  if (fs.existsSync(CACHE_FILE)) {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
    console.log(`[image-cache] Loaded ${Object.keys(cache).length} cached image refs`)
  }
}

export function saveImageCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  console.log(`[image-cache] Saved ${Object.keys(cache).length} image refs`)
}

export async function getOrUploadImage(
  rawUrl: string,
  uploadFn: (cleanUrl: string) => Promise<string>,
): Promise<string> {
  const cleanUrl = stripWixParams(rawUrl)
  if (cache[cleanUrl]) {
    return cache[cleanUrl]
  }
  const assetId = await uploadFn(cleanUrl)
  cache[cleanUrl] = assetId
  saveImageCache()
  return assetId
}
