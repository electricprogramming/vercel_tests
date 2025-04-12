export default async function middleware(req) {
  if (req.url.pathname === '/') {
    const urls = [
      '/a.html',
      '/b.html',
      '/c.html',
    ]

    // Randomly choose one of the URLs to rewrite to
    const randomUrl = urls[Math.floor(Math.random() * urls.length)]

    // Use Vercel's built-in rewrite functionality (not @vercel/edge)
    const url = new URL(req.url)
    url.pathname = randomUrl // Update the pathname to one of the options

    return Response.redirect(url, 307) // Issue a rewrite by redirecting internally
  }
}