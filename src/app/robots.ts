import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/portal/', '/paymentSuccess/'],
    },
    sitemap: 'https://www.royaltyfuneral.com/sitemap.xml',
  }
}
