// Modules
import path from 'node:path'
import fs from 'node:fs/promises'

// Imports
import { parseRouter } from '#utils'

// Methods

// Error logger utility: Logs formatted error messages to the console
function logError(message, error) {
  console.error(
    `> [App]  Error:${message}  |  [REASON]  ${error.message || error}`
  )
}

// Router method: Dynamically loads API routes from a given directory
async function router(client, baseDir) {
  // Initializes a stack to traverse directories iteratively
  const stack = [baseDir]

  while (stack.length) {
    // Retrieves the current directory from the stack
    const dir = stack.pop()

    try {
      // Reads all files in the current directory
      const files = await fs.readdir(dir)

      for (const file of files) {
        // Constructs the full file path and retrieves its status
        const filePath = path.join(dir, file)
        const fileStat = await fs.lstat(filePath)

        // Verifying the file is a directory
        if (fileStat.isDirectory()) {
          // If the file is a directory, add it to the stack for further processing
          stack.push(filePath)
        } else if (file.endsWith('.js')) {
          // Derives the API route and the relative path from the file path
          const routePath = await parseRouter(baseDir, filePath)
          const relativePath = path.relative(baseDir, filePath)
          try {
            const routeModule = await import(filePath)

            // Verifies the module has a default export to use as the router handler
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
