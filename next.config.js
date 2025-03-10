/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật Strict Mode của React cho môi trường phát triển
  reactStrictMode: true,

  // Tắt header X-Powered-By để tăng cường bảo mật
  poweredByHeader: false,

  // Chỉ định chế độ đầu ra cho bản build sản phẩm
  output: "standalone",

  // Cấu hình domain cho ảnh nếu bạn đang sử dụng component Image của Next.js
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
    // Ví dụ: thêm domain ảnh từ xa
    // domains: ['example.com', 'another-domain.com'],
  },

  // Cấu hình chuyển hướng
  async redirects() {
    return [
      // Ví dụ về chuyển hướng:
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // }
    ];
  },

  // Cấu hình viết lại đường dẫn
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Cấu hình headers
  async headers() {
    return [
      // Ví dụ về headers bảo mật:
      // {
      //   source: '/(.*)',
      //   headers: [
      //     {
      //       key: 'X-Content-Type-Options',
      //       value: 'nosniff',
      //     },
      //   ],
      // }
    ];
  },

  // Bật runtime edge (nếu cần)
  // experimental: {
  //   runtime: 'edge',
  // },

  // Cấu hình webpack nếu cần
  webpack: (config, { isServer }) => {
    // Cấu hình webpack tùy chỉnh
    return config;
  },
};

module.exports = nextConfig;
