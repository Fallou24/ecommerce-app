/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL:"https://ecommerce-app-beta-five.vercel.app/"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },

};

export default nextConfig;
