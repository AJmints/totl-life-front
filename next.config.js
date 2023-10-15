/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/register/confirm',
                destination: '/register/confirm/invalid',
                permanent: true,
            }, 
        ]
    }
}

module.exports = nextConfig
