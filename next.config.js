/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboards',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
