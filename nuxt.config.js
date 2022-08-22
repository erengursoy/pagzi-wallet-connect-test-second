export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pagzi-wallet-connect-test-second',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    ENV: process.env.ENV,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    CONTRACT_JSONURL: process.env.CONTRACT_JSONURL,
    INFURA_ID: process.env.INFURA_ID,
    INFURA_BRIDGE: process.env.INFURA_BRIDGE,
    NETWORK_CHAINID: process.env.NETWORK_CHAINID,
    NETWORK_NAME: process.env.NETWORK_NAME,
    NETWORK_SLUG: process.env.NETWORK_SLUG,
    ETHERSCAN: process.env.ETHERSCAN,
    IMG_BASE_PATH: process.env.IMG_BASE_PATH,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
