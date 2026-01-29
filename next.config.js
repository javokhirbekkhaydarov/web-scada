/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboards',
        permanent: false,
        locale: false
      }
    ]
  }
}

export default nextConfig
