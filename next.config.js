/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['placekitten.com','tutorme.s3.ap-southeast-1.amazonaws.com','tutorme.s3.amazonaws.com']
  }
}

module.exports = nextConfig
