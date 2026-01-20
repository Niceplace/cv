const fs = require('fs');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const resumeFile = process.argv[2] || 'resume-base.json';

async function validate() {
  try {
    // Read resume
    const resumeData = JSON.parse(fs.readFileSync(resumeFile, 'utf-8'));
    
    // Fetch schema
    const schemaResponse = await fetch('https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json');
    const schema = await schemaResponse.json();
    
    // Create AJV instance with better error messages
    const ajv = new Ajv({ 
      allErrors: true, 
      verbose: true,
      strict: false 
    });
    addFormats(ajv);
    
    const validate = ajv.compile(schema);
    const valid = validate(resumeData);
    
    if (valid) {
      console.log('✓ Resume is valid!');
      process.exit(0);
    } else {
      console.log('❌ Resume validation failed:\n');
      
      validate.errors.forEach((err, index) => {
        console.log(`Error ${index + 1}:`);
        
        if (err.keyword === 'additionalProperties') {
          console.log(`  ✗ Invalid property '${err.params.additionalProperty}' at path '${err.instancePath || 'root'}'`);
          console.log(`    This property is not allowed by the JSON Resume schema.`);
          console.log(`    Please remove it or check if you meant a different property name.\n`);
        } else if (err.keyword === 'required') {
          console.log(`  ✗ Missing required property '${err.params.missingProperty}' at path '${err.instancePath || 'root'}'`);
          console.log(`    This property is required by the JSON Resume schema.\n`);
        } else if (err.keyword === 'type') {
          console.log(`  ✗ Invalid type at path '${err.instancePath}'`);
          console.log(`    Expected: ${err.params.type}`);
          console.log(`    Actual: ${typeof err.data}\n`);
        } else {
          console.log(`  ✗ ${err.message} at path '${err.instancePath || 'root'}'`);
          if (err.params && Object.keys(err.params).length > 0) {
            console.log(`    Details: ${JSON.stringify(err.params)}\n`);
          }
        }
      });
      
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during validation:', error.message);
    process.exit(1);
  }
}

validate();
