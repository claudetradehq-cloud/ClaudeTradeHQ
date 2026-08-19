/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // /funded-accounts was rebuilt as the FX Blue statistics page.
      { source: "/funded-accounts", destination: "/fx-blue-links", permanent: true },
    ];
  },
};

export default nextConfig;
