#!/usr/bin/env bun

/**
 * Validate JSON Resume using the resumed CLI
 * Uses Bun runtime with TypeScript support
 */

const resumeFiles = ['resume-json/resume-en.json', 'resume-json/resume-fr.json']

interface ValidationError {
  path: string
  message: string
}

interface FileValidationResult {
  file: string;
  errors: ValidationError[];
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
async function validateFiles(
  resumed: any,
  files: string[]
): Promise<FileValidationResult[]> {
  const validationResults: FileValidationResult[] = [];
  
  for (const file of files) {
    try {
      await resumed.validate(file);
      console.log(
        `✓ ${file}'s schema is valid according to JsonResume's schema.`,
      );
    } catch (err: unknown) {
      // Collect validation errors for this file
      if (Array.isArray(err)) {
        validationResults.push({ file, errors: err });
      } else {
        // For non-validation errors (e.g., file not found), treat as a single error
        validationResults.push({
          file,
          errors: [{
            path: file,
            message: err instanceof Error ? err.message : String(err)
          }]
        });
      }
    }
  }
  
  return validationResults;
}

/**
 * Report validation errors for all files
 */
function reportValidationErrors(results: FileValidationResult[]): void {
  const totalErrors = results.reduce(
    (sum, result) => sum + result.errors.length,
    0
  );
  
  console.error(
    `\n❌ Resume validation failed for ${results.length} file(s) with ${totalErrors} total error(s):\n`,
  );
  
  results.forEach((result) => {
    console.error(`\n📄 File: ${result.file}`);
    console.error(`   Errors: ${result.errors.length}\n`);
    
    result.errors.forEach((error: ValidationError, index: number) => {
      console.error(`   Error ${index + 1}:
     Location: ${error.path || "unknown"}
     Issue: ${error.message}`);

      // Provide helpful context for common error patterns
      if (error.message && error.message.includes("does not match pattern")) {
        if (error.path && error.path.includes("Date")) {
          console.error(
            `     → Dates must be in ISO 8601 format: YYYY-MM-DD, YYYY-MM, or YYYY
        Examples: "2023-06", "2023", "2023-06-15"`,
          );
        }
      } else if (
        error.message &&
        error.message.includes('does not conform to the "uri" format')
      ) {
        console.error(
          `     → URLs must be valid URIs (e.g., "https://example.com")
        Empty strings are not valid. Use a proper URL or remove the field.`,
        );
      }
    });
  });
  
  console.error(
    `\nFor the complete JSON Resume schema specification, visit: https://github.com/jsonresume/resume-schema/blob/master/schema.json\n`,
  );
}

async function main() {
  try {
    // Import the resumed module (ES6 module)
    // Note: This is possible because the workflow installs https://www.npmjs.com/package/resumed via `bun add resumed`
    const resumed = await loadModule('resumed')

    if (typeof resumed.validate !== 'function') {
      throw new Error('validate function not found in resumed module')
    }

    // Validate all resume files in scope and collect errors
    const validationResults = await validateFiles(resumed, resumeFiles);
    
    // If any files had validation errors, report them all and exit
    if (validationResults.length > 0) {
      reportValidationErrors(validationResults);
      process.exit(1);
    }
    
    process.exit(0);
  } catch (err: unknown) {
    if (err instanceof ImportError) {
      console.error(
        `Failed to import resumed module: Ensure package "resumed" is installed`,
      );
      console.error(err);
      process.exit(1);
    }
    // Any other unexpected errors during module loading or setup
    console.error("\n❌ Validation encountered an unexpected error:\n");
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main()
