// api/_middleware.ts

import { rewrite, VercelRequest, VercelResponse } from '@vercel/edge'

export default async function middleware(req: VercelRequest, res: VercelResponse) {
  const urls = [
    '/a.html',
    '/b.html',
    '/c.html'
  ]
  rewrite(urls[Math.floor(Math.random() * urls.length)]);
  res.next();
}
