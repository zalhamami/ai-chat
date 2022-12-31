declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            OPEN_AI_API_KEY: string;
            MEDIUM_API_URL: string;
            MEDIUM_API_VERSION: string;
            MEDIUM_INTEGRATION_TOKEN: string;
            UNSPLASH_API_URL: string;
            UNSPLASH_API_ACCESS_KEY: string;
            UNSPLASH_API_SECRET_KEY: string
        }
    }
}

export {};
