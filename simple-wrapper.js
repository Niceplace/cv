#!/usr/bin/env node

import { validate } from 'resumed';

const resumeFile = process.argv[2] || 'resume-base.json';

try {
  console.log(`Validating ${resumeFile} with resumed CLI...`);
  await validate(resumeFile);
  console.log(`\n✓ Your ${resumeFile} looks amazing! ✨`);
  process.exit(0);
} catch (err) {
  // Check if it's the expected validation error array
  if (Array.isArray(err)) {
    console.error(`\n❌ Resume validation failed with ${err.length} error(s):\n`);
    
    err.forEach((error, index) => {
      console.error(`Error ${index + 1}:`);
      console.error(`  Location: ${error.path || 'unknown'}`);
      console.error(`  Issue: ${error.message}`);
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
