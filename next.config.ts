import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const isPagesBuild = process.env.GITHUB_ACTIONS === 'true' || process.env.npm_lifecycle_event === 'build:pages' || basePath !== '';

const nextConfig: NextConfig = {
  output: isPagesBuild ? 'export' : undefined,
  trailingSlash: isPagesBuild,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
