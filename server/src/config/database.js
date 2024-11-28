// Modules
import mongoose from 'mongoose'

// Imports

// Variables
const { DB_USER, DB_URL, DB_PASS, DB_NAME } = process.env

// DB connection
const db = async () => {
  await mongoose.connect(DB_URL, {
    dbName: DB_NAME,
    user: DB_USER,
    pass: DB_PASS,
  })
}

const dbKill = async () => {
  await mongoose.connection.close()
  return console.log('Database closed')
}

export { db as default, db, dbKill }
