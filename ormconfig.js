module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : './src'}/infra/repositories/postgres/entities/*.{ts,js}`
  ],
  migrations: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : './src'}/infra/repositories/postgres/migrations/*.{ts,js}`
  ]
}
