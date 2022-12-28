declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            OPEN_AI_API_KEY: string;
        }
    }
}

export {};
