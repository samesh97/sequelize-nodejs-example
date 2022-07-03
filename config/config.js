module.exports = {
    port: process.env.PORT || 5000,
    token_secret: process.env.ACCESS_TOKEN_SECRET || '160b442bcf522d0aae1b472864dea566',
    dbConfig: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '12345',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DIALECT || 'mysql',
        database: process.env.DATABASE_NAME || 'secureddb'
    }
}