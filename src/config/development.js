module.exports = {
    service: {
        port: 5000,
        host: "0.0.0.0",
        endpoint: "",
    },      
    postgres:{
        user: 'postgres',
        password: 'POSTGRES_PASS',
        host: process.env.POSTGRES_HOST ?? "postgres",
        port: 5432,
        database: process.env.POSTGRES_DATABASE ?? "user_service",
        maxPoolSize: 10,
    },

    proxy: {
    host: `http://${process.env.PROXY_HOST ?? "0.0.0.0"}:${process.env.PROXY_PORT ?? 5000}`,
    },
    endpoints:{
        userService: {
        endpoint: "/v1/user-service",
        port: 5000,
    },
    }
}