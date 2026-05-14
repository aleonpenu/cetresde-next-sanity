import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN in development to reflect Studio changes immediately on localhost.
  useCdn: process.env.NODE_ENV === 'production',
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, any>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60,
      tags: tags || [],
    },
  })
}
