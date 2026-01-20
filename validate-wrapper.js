#!/usr/bin/env node

import { validate } from "resumed";
import { readFile } from "fs/promises";

const resumeFile = process.argv[2] || "resume-base.json";

// Known valid properties for each section according to JSON Resume schema
const validProperties = {
  root: ["basics", "work", "volunteer", "education", "awards", "certificates", 
         "publications", "skills", "languages", "interests", "references", "projects", 
         "meta", "$schema"],
  basics: ["name", "label", "image", "email", "phone", "url", "summary", "location", "profiles"],
  location: ["address", "postalCode", "city", "countryCode", "region"],
  profile: ["network", "username", "url"],
  work: ["name", "position", "url", "startDate", "endDate", "summary", "highlights", "location"],
  volunteer: ["organization", "position", "url", "startDate", "endDate", "summary", "highlights"],
  education: ["institution", "url", "area", "studyType", "startDate", "endDate", "score", "courses"],
  award: ["title", "date", "awarder", "summary"],
  certificate: ["name", "date", "issuer", "url"],
  publication: ["name", "publisher", "releaseDate", "url", "summary"],
  skill: ["name", "level", "keywords"],
  language: ["language", "fluency"],
  interest: ["name", "keywords"],
  reference: ["name", "reference"],
  project: ["name", "description", "highlights", "keywords", "startDate", "endDate", "url", "roles", "entity", "type"]
};

function checkAdditionalProperties(obj, path = "root", section = "root") {
  const errors = [];
  
  if (typeof obj !== "object" || obj === null) return errors;
  
  const allowedProps = validProperties[section] || [];
  
  for (const key of Object.keys(obj)) {
    if (!allowedProps.includes(key) && key !== "$schema") {
      errors.push({
        path: path,
        property: key,
        message: `Invalid property "${key}" found at ${path}. This property is not part of the JSON Resume schema.`
      });
    }
  }
  
  // Recursively check nested objects based on section
  if (section === "root") {
    // Check basics object
    if (obj.basics && typeof obj.basics === "object") {
      const basicsErrors = checkAdditionalProperties(obj.basics, "basics", "basics");
      errors.push(...basicsErrors);
    }
    
    // Check array sections
    const arraySections = ["work", "volunteer", "education", "awards", "certificates", 
                          "publications", "skills", "languages", "interests", "references", "projects"];
    
    for (const sectionName of arraySections) {
      if (Array.isArray(obj[sectionName])) {
        obj[sectionName].forEach((item, index) => {
          // Convert plurals to singular for section lookup
          const itemSection = sectionName === "work" || sectionName === "volunteer" ? 
                             sectionName : sectionName.replace(/s$/, "");
          const itemErrors = checkAdditionalProperties(item, `${sectionName}[${index}]`, itemSection);
          errors.push(...itemErrors);
        });
      }
    }
  } else if (section === "basics") {
    // Check location object within basics
    if (obj.location && typeof obj.location === "object") {
      const locationErrors = checkAdditionalProperties(obj.location, "basics.location", "location");
      errors.push(...locationErrors);
    }
    
    // Check profiles array within basics
    if (Array.isArray(obj.profiles)) {
      obj.profiles.forEach((item, index) => {
        const profileErrors = checkAdditionalProperties(item, `basics.profiles[${index}]`, "profile");
        errors.push(...profileErrors);
      });
    }
  }
  
  return errors;
}

async function runValidation() {
  try {
    console.log(`Validating ${resumeFile}...`);
    
    // First, check for additional properties ourselves
    const resumeContent = await readFile(resumeFile, "utf-8");
    const resumeData = JSON.parse(resumeContent);
    const additionalPropErrors = checkAdditionalProperties(resumeData);
    
    // Then run the resumed validation
    try {
      await validate(resumeFile);
    } catch (validationErrors) {
      // Combine our additional property errors with the resumed validation errors
      const allErrors = [...additionalPropErrors];
      
      if (Array.isArray(validationErrors)) {
        validationErrors.forEach(err => {
          allErrors.push({
            path: err.path || "root",
            property: null,
            message: err.message
          });
        });
      }
      
      if (allErrors.length > 0) {
        console.error(`\n❌ Resume validation failed with ${allErrors.length} error(s):\n`);
        
        // Show additional property errors first (they are usually more critical)
        const propErrors = allErrors.filter(e => e.property);
        const otherErrors = allErrors.filter(e => !e.property);
        
        [...propErrors, ...otherErrors].forEach((error, index) => {
          console.error(`Error ${index + 1}:`);
          console.error(`  Location: ${error.path}`);
          if (error.property) {
            console.error(`  Invalid property: "${error.property}"`);
            console.error(`  → This property is not part of the JSON Resume schema.`);
            console.error(`     Please remove it or check if you misspelled a valid property name.`);
          } else {
            console.error(`  Issue: ${error.message}`);
          }
          console.error("");
        });
        
        console.error("For the complete JSON Resume schema, visit:");
        console.error("https://github.com/jsonresume/resume-schema/blob/master/schema.json\n");
        
        process.exit(1);
      }
      
      throw validationErrors; // Re-throw if we did not handle it
    }
    
    // If we found additional properties but resumed did not fail, still report them
    if (additionalPropErrors.length > 0) {
      console.error(`\n❌ Resume validation failed with ${additionalPropErrors.length} error(s):\n`);
      
      additionalPropErrors.forEach((error, index) => {
        console.error(`Error ${index + 1}:`);
        console.error(`  Location: ${error.path}`);
        console.error(`  Invalid property: "${error.property}"`);
        console.error(`  → This property is not part of the JSON Resume schema.`);
        console.error(`     Please remove it or check if you misspelled a valid property name.`);
        console.error("");
      });
      
      console.error("For the complete JSON Resume schema, visit:");
      console.error("https://github.com/jsonresume/resume-schema/blob/master/schema.json\n");
      
      process.exit(1);
    }
    
    console.log(`\n✓ Your ${resumeFile} looks amazing! ✨`);
    process.exit(0);
    
  } catch (err) {
    // Handle other errors (file not found, JSON parse error, etc.)
    if (!Array.isArray(err)) {
      console.error(`\n❌ Validation failed with an error:\n`);
      console.error(err.message || err);
      
      if (err.code === "ENOENT") {
        console.error(`\nThe file "${resumeFile}" was not found.`);
      } else if (err instanceof SyntaxError) {
        console.error(`\nThe file contains invalid JSON. Please check the syntax.`);
      }
      
      console.error("");
      process.exit(1);
    }
  }
}

runValidation();
