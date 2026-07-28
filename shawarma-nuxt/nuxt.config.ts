import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // Modules
  modules: ["@pinia/nuxt", "@nuxt/image", "@nuxt/fonts"],

  // TypeScript - strict mode
  typescript: {
    strict: true,
    typeCheck: false, // Отключено для разработки
  },

  // Image optimization
  image: {
    provider: "ipx",
    domains: ["localhost", "supabase.co"],
    formats: ["image/webp", "image/avif"],
  },

  // Fonts configuration
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Playfair Display", provider: "google" },
    ],
  },

  // Route rules for hybrid rendering
  routeRules: {
    // SSG для статических страниц
    "/about": { prerender: true },
    "/contacts": { prerender: true },

    // SSR для динамических страниц
    "/menu/**": { ssr: true },
    "/cart": { ssr: false },

    // Кэширование API
    "/api/**": { cors: true, cache: { maxAge: 60 } },
  },

  // App configuration
  app: {
    head: {
      title: "ШАУРМА — сайт ресторана",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Лучшая шаурма в городе" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Runtime config for Supabase/Custom backend
  runtimeConfig: {
    public: {
      apiMode: process.env.NUXT_API_MODE || "mock",
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || "",
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || "",
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || "",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      currency: process.env.NUXT_PUBLIC_CURRENCY || "RUB",
    },
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || "",
    apiTimeout: parseInt(process.env.NUXT_API_TIMEOUT || "5000"),
  },

  // Server configuration
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/tailwind.css"],
});
