// Modules
import path from 'node:path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

// Imports

// Variables
let envFile = ''
const rootDir = process.cwd()
if (process.env.NODE_ENV === 'dev') envFile = '.env.local'
else if (process.env.NODE_ENV === 'test') envFile = '.env.test.local'
console.log(`> [NODE]  env loaded  |  [MODE]  ${process.env.NODE_ENV}  |  [SOURCE]  ${envFile}`)

// Loading envs
if (process.env.NODE_ENV === 'prod') {
  console.log(`> [NODE]  .env loading skipped  |  [MODE]  ${process.env.NODE_ENV}  |  [SOURCE]  Current using OS envs.`)
} else {
  try {
    const result = dotenv.config({ path: path.resolve(rootDir, envFile) })
    if (result.error) throw result.error
    else dotenvExpand.expand(result)
  } catch (err) {
    console.error(
      `> [NODE]  Failed to load env file  |  [SOURCE]  ${envFile}  |  [REASON]  ${err.message}`
    )
  }
}
