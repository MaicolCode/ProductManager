import mysql from 'mysql2/promise'

// DB Config
const config = {
  host: 'localhost',
  user: 'root',
  password: 'MaicolCodea',
  database: 'tech_db',
  port: 3306
}

export const connection = await mysql.createConnection(config)
