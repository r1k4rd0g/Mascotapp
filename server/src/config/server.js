// Modules
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'

// Imports

// Variables
const app = express()

// Express setup
app.use(cors())
app.use(helmet())
app.use(express.json())
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))

export default app
