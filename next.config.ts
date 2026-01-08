import ESLintPlugin from 'eslint-webpack-plugin';
import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import type { Configuration } from 'webpack';

const isDev = process.env.NODE_ENV === 'development';

/**
 * ======================
 * SAFE ENV RESOLUTION
 * ======================
 */
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Validasi:
 * - harus ada
 * - harus http / https
 */
const API_URL =
  rawApiUrl && (rawApiUrl.startsWith('http://') || rawApiUrl.startsWith('https://'))
    ? rawApiUrl
    : 'http://localhost:3001';

const parsedUrl = new URL(API_URL);

function toImageProtocol(protocol: string): 'http' | 'https' {
  if (protocol === 'https:') return 'https';
  return 'http';
}

const apiImagePattern: RemotePattern = {
  protocol: toImageProtocol(parsedUrl.protocol),
  hostname: parsedUrl.hostname,
  pathname: '/uploads/**',
  ...(parsedUrl.port ? { port: parsedUrl.port } : {}),
};

const localImagePatterns: RemotePattern[] = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3001',
    pathname: '/uploads/**',
  },
  {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '3001',
    pathname: '/uploads/**',
  },
];

/**
 * ======================
 * NEXT CONFIG
 * ======================
 */
const nextConfig: NextConfig = {
  devIndicators: false,

  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  /**
   * ======================
   * REWRITES (SAFE)
   * ======================
   */
  async rewrites() {
    return [
      // NextAuth internal
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },

      // Bypass NextAuth middleware
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

      // API Proxy (🔥 TIDAK PERNAH UNDEFINED)
      {
        source: '/api/proxy/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },

  /**
   * ======================
   * IMAGES
   * ======================
   */
  images: {
    remotePatterns: [
      // 🔥 API URL (SELALU AKTIF)
      apiImagePattern,

      // 🔁 AKTIF HANYA JIKA BUKAN development
      ...(!isDev ? localImagePatterns : []),
    ],
  },

  /**
   * ======================
   * WEBPACK
   * ======================
   */
  webpack(
    config: Configuration,
    { dev, isServer }: { dev: boolean; isServer: boolean },
  ): Configuration {
    config.devtool = false;

    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    // SVG → React Component
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // ESLint hanya client-side dev
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

    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default nextConfig;
