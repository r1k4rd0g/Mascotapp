// Modules
import path from 'node:path'

// Imports
import '#env'
import db from '#db'
import app from '#app'
import { initMailer } from '#mailer'
import { router } from '#utils'

// Variables
const { PORT } = process.env
const __dirname = import.meta.dirname
const baseDir = path.join(__dirname, 'routes')

// Main function
;(async () => {
  try {
    await db()
      .then(() => console.log(`> [NODE]  database connected  |  [SOURCE]  ${process.env.DB_URI}`))
      .catch(err => {
        throw err
      })

    await initMailer()

    await router(app, baseDir)

    const listener = app.listen(PORT || 3001, () => {
      console.log(`> [App]  listening now  |  [PORT]  ${listener.address().port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
})()
