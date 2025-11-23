import ESLintPlugin from 'eslint-webpack-plugin';
import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import type { Configuration } from 'webpack';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const parsedUrl = new URL(apiUrl);

const nextConfig: NextConfig = {
  devIndicators: false,

  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  // ESLint tetap berjalan, tapi tidak memblokir build production
  eslint: {
    ignoreDuringBuilds: false,
  },

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        has: [
          {
            type: 'header',
            key: 'x-nextauth-bypass',
            value: 'true',
          },
        ],
        destination: '/api/:path*',
      },
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: parsedUrl.protocol.replace(':', ''),
        hostname: parsedUrl.hostname,
        pathname: '/uploads/**',
        ...(parsedUrl.port ? { port: parsedUrl.port } : {}),
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ] as RemotePattern[],
  },

  webpack(
    config: Configuration,
    { dev, isServer }: { dev: boolean; isServer: boolean },
  ): Configuration {
    config.devtool = false;

    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // FIX AGAR ESLINT TIDAK MELEDAK SAAT SSR
    if (dev && !isServer) {
      config.plugins = config.plugins ?? [];
      config.plugins.push(
        new ESLintPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
          emitError: true,
          failOnError: false,
        }),
      );
    }

    // FIX tambahan untuk mencegah error HookWebpackError
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default nextConfig;
