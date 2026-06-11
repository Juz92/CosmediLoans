import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // Canonical host: apex -> www (301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'cosmediloans.com.au' }],
        destination: 'https://www.cosmediloans.com.au/:path*',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
