// Modules
import path from 'node:path'
import fs from 'node:fs/promises'

// Imports
import { parseRouter } from '#utils'

// Methods

// logger method
function logError(message, error) {
  console.error(`> [App]  Error:${message}  |  [REASON]  ${error.message || error}`)
}

// router method
async function router(client, baseDir) {
  const stack = [baseDir]

  while (stack.length) {
    const dir = stack.pop()

    try {
      const files = await fs.readdir(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const fileStat = await fs.lstat(filePath)

        if (fileStat.isDirectory()) {
          stack.push(filePath)
        } else if (file.endsWith('.js')) {
          const routePath = parseRouter(baseDir, filePath)
          try {
            const routeModule = await import(filePath)

            const relativePath = path.relative(baseDir, filePath)

            if (routeModule.default) {
              client.use(`/${routePath}`, routeModule.default)
              console.log(
                `> [App]  Loaded '/${routePath}'  |  [SOURCE]  /${relativePath}`
              )
            } else {
              logError(
                `Module lacks default export  |  [SOURCE]  routes/${relativePath}`,
                new Error('No default export')
              )
            }
          } catch (err) {
            logError(`Error importing module at routes/${relativePath}`, err)
          }
        }
      }
    } catch (err) {
      logError(`Error reading directory: ${dir}`, err)
    }
  }
}

export default router
