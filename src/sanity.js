// sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: 'mxeqjvwt',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// For loading image urls from sanity
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getCars() {
  const posts = await client.fetch('*[_type == "cars"]')
  return posts
}
 