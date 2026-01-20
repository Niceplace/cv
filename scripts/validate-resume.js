#!/usr/bin/env node

import { validate } from 'resumed';

const resumeFile = process.argv[2] || 'resume-base.json';

try {
  console.log(`Validating ${resumeFile} with resumed CLI...\n`);
  await validate(resumeFile);
  console.log(`✓ Your ${resumeFile} looks amazing! ✨`);
  process.exit(0);
} catch (err) {
  // Check if it's the expected validation error array from @jsonresume/schema
  if (Array.isArray(err)) {
    console.error(`❌ Resume validation failed with ${err.length} error(s):\n`);
    
    err.forEach((error, index) => {
      console.error(`Error ${index + 1}:`);
      console.error(`  Location: ${error.path || 'unknown'}`);
      console.error(`  Issue: ${error.message}`);
      
      // Provide helpful context for common error patterns
      if (error.message && error.message.includes('does not match pattern')) {
        if (error.path && error.path.includes('Date')) {
          console.error(`  → Dates must be in ISO 8601 format: YYYY-MM-DD, YYYY-MM, or YYYY`);
          console.error(`     Examples: "2023-06", "2023", "2023-06-15"`);
        }
      } else if (error.message && error.message.includes('does not conform to the "uri" format')) {
        console.error(`  → URLs must be valid URIs (e.g., "https://example.com")`);
        console.error(`     Empty strings are not valid. Use a proper URL or remove the field.`);
      }
      
      console.error('');
    });
    
    console.error('For the complete JSON Resume schema specification, visit:');
    console.error('https://github.com/jsonresume/resume-schema/blob/master/schema.json\n');
    
    process.exit(1);
  } else {
    // Some other error (file not found, JSON parse error, etc.)
    console.error('\n❌ Validation encountered an error:\n');
    console.error(err.message || err);
    
    if (err.code === 'ENOENT') {
      console.error(`\nThe file '${resumeFile}' was not found.`);
    } else if (err instanceof SyntaxError) {
      console.error('\nThe file contains invalid JSON. Please check the syntax.');
    }
    
    console.error('');
    process.exit(1);
  }
}
