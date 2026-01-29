#!/usr/bin/env bun

/**
 * Validate JSON Resume using the resumed CLI
 * Uses Bun runtime with TypeScript support
 */

const resumeFiles = ['resume-json/resume-en.json', 'resume-json/resume-fr.json']

interface ValidationError {
  path: (string | number)[]
  property: string
  message: string
  schema: {
    type?: string
    format?: string
    pattern?: string
    description?: string
  }
  instance: any
  name: string
  argument?: any
  stack?: string
}

interface FileValidationResult {
  file: string
  errors: ValidationError[]
}

class ImportError extends Error {}

const loadModule = async (modulePath: string) => {
  try {
    return await import(modulePath)
  } catch {
    throw new ImportError(`Unable to import module ${modulePath}`)
  }
}

/**
 * Validate all resume files and collect any errors
 */
const validateFiles = async (resumed: any, files: string[]): Promise<FileValidationResult[]> => {
  const validationResults: FileValidationResult[] = []

  for (const file of files) {
    try {
      await resumed.validate(file)
      console.log(`✓ ${file}'s schema is valid according to JsonResume's schema.`)
    } catch (err: unknown) {
      // Collect validation errors for this file
      if (Array.isArray(err)) {
        validationResults.push({ file, errors: err })
      } else {
        // For non-validation errors (e.g., file not found), create a minimal error object
        const errorMsg = err instanceof Error ? err.message : String(err)
        validationResults.push({
          file,
          errors: [
            {
              path: [file],
              property: file,
              message: errorMsg,
              schema: {},
              instance: null,
              name: 'error',
              stack: err instanceof Error ? err.stack : undefined,
            } as ValidationError,
          ],
        })
      }
    }
  }

  return validationResults
}

/**
 * Format path array as user-friendly location string
 * Converts ["work", 1, "endDate"] to "work[1].endDate"
 */
const formatPath = (path: (string | number)[]): string => {
  return path.reduce((acc, part, index) => {
    if (typeof part === 'number') {
      return acc + `[${part}]`
    }
    return index === 0 ? part : acc + '.' + part
  }, '')
}

/**
 * Report validation errors for all files
 */
const reportValidationErrors = (results: FileValidationResult[]): void => {
  const totalErrors = results.reduce((sum, result) => sum + result.errors.length, 0)

  console.error(
    `\n❌ Resume validation failed for ${results.length} file(s) with ${totalErrors} total error(s):\n`
  )

  results.forEach((result) => {
    console.error(`\n ${result.errors.length} errors in File 📄: ${result.file}`)

    result.errors.forEach((error: ValidationError) => {
      const location = formatPath(error.path)
      console.error(`\n❌ ${location}`)
      console.error(`   Value: ${JSON.stringify(error.instance)}`)
      console.error(`   Issue: ${error.message}`)

      if (error.schema?.description) {
        console.error(`   Description: ${error.schema.description}`)
      }
      if (error.schema?.pattern) {
        console.error(`   Pattern: ${error.schema.pattern}`)
      }
      if (error.schema?.format) {
        console.error(`   Format: ${error.schema.format}`)
      }
    })
  })

  console.info(
    `\nFor the complete JSON Resume schema specification, visit: https://github.com/jsonresume/resume-schema/blob/master/schema.json\n`
  )
}

const main = async (): Promise<void> => {
  try {
    // Import the resumed module (ES6 module)
    // Note: This is possible because the workflow installs https://www.npmjs.com/package/resumed via `bun add resumed`
    const resumed = await loadModule('resumed')

    if (typeof resumed.validate !== 'function') {
      throw new Error('validate function not found in resumed module')
    }

    // Validate all resume files in scope and collect errors
    const validationResults = await validateFiles(resumed, resumeFiles)

    // If any files had validation errors, report them all and exit
    if (validationResults.length > 0) {
      reportValidationErrors(validationResults)
      process.exit(1)
    }

    process.exit(0)
  } catch (err: unknown) {
    if (err instanceof ImportError) {
      console.error(`Failed to import resumed module: Ensure package "resumed" is installed`)
      console.error(err)
      process.exit(1)
    }
    // Any other unexpected errors during module loading or setup
    console.error('\n❌ Validation encountered an unexpected error:\n')
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

main()
