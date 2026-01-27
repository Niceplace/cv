#!/usr/bin/env bun

/**
 * Validate JSON Resume using the resumed CLI
 * Uses Bun runtime with TypeScript support
 */

const resumeFiles = ['resume-base/resume-en.json', 'resume-json/resume-fr.json']

interface ValidationError {
  path: string
  message: string
}

class ImportError extends Error {}

const loadModule = async (modulePath: string) => {
  try {
    return await import(modulePath)
  } catch {
    throw new ImportError(`Unable to import module ${modulePath}`)
  }
}

async function main() {
  try {
    // Import the resumed module (ES6 module)
    // Note: This is possible because the workflow installs https://www.npmjs.com/package/resumed via `bun add resumed`
    const resumed = await loadModule('resumed')

    if (typeof resumed.validate !== 'function') {
      throw new Error('validate function not found in resumed module')
    }

    // Validate all resume files in scope
    for (const file of resumeFiles) {
      await resumed.validate(file)
      console.log(`${file}'s schema is valid according to JsonResume's schema.`)
    }
    process.exit(0)
  } catch (err: unknown) {
    if (err instanceof ImportError) {
      console.error(`Failed to import resumed module: Ensure package "resumed" is installed`)
      console.error(err)
    }
    // Check if it's the expected validation error array from @jsonresume/schema
    else if (Array.isArray(err)) {
      console.error(`❌ Resume validation failed with ${err.length} error(s):\n`)

      err.forEach((error: ValidationError, index: number) => {
        console.error(`Error ${index + 1}:
          Location: ${error.path || 'unknown'}
          Issue: ${error.message}`)

        // Provide helpful context for common error patterns
        if (error.message && error.message.includes('does not match pattern')) {
          if (error.path && error.path.includes('Date')) {
            console.error(
              `  → Dates must be in ISO 8601 format: YYYY-MM-DD, YYYY-MM, or YYYY
              \n     Examples: "2023-06", "2023", "2023-06-15"`
            )
          }
        } else if (
          error.message &&
          error.message.includes('does not conform to the "uri" format')
        ) {
          console.error(
            `  → URLs must be valid URIs (e.g., "https://example.com")
            Empty strings are not valid. Use a proper URL or remove the field.`
          )
        }
      })

      console.error(
        `For the complete JSON Resume schema specification, visit: https://github.com/jsonresume/resume-schema/blob/master/schema.json\n`
      )
    } else {
      // Some other error (file not found, JSON parse error, etc.)
      console.error('\n❌ Validation encountered an error:\n')
      console.error((err as Error).message || err)
    }
    process.exit(1)
  }
}

main()
