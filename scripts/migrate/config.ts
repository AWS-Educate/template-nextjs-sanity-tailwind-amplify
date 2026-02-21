import {createClient} from '@sanity/client'

const projectId = 'jovlwcbx'
const dataset = 'production'
const apiVersion = '2025-02-16'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN. Create scripts/.env with:\nSANITY_API_WRITE_TOKEN=sk...',
  )
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

import path from 'path'

export const CONTENT_DIR = path.resolve(process.cwd(), 'doc/content-extracted')
