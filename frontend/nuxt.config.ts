// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/apollo',
        '@pinia-plugin-persistedstate/nuxt',
        '@vueuse/nuxt',
    ],
    app: {
        head: {
            title: "Event Space"
        }
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'https://ruling-krill-83.hasura.app/v1/graphql',
                connectToDevTools: false,
            },
            anonymous: './apollo/anonymous.ts'
        },
    },
    buildModules: [
        'nuxt-vite'
    ],
    vite: {
        ssr: true,
        // build: true
    }
})
