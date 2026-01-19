# CV - JSON Resume Format

This repository contains my CV in [JSON Resume](https://jsonresume.org/) format.

## About

This CV follows the [JSON Resume schema](https://jsonresume.org/schema/) v1.0.0, which is an open-source standard for creating machine-readable resumes.

## Files

- `resume.json` - Main CV file in JSON Resume format

## LinkedIn Profile

This CV is based on data from my LinkedIn profile: [https://www.linkedin.com/in/sbeaulie2/](https://www.linkedin.com/in/sbeaulie2/)

## Usage

### Viewing the CV

You can use any JSON Resume compatible tool to view or export this CV:

1. **Online Viewer**: Upload `resume.json` to [JSON Resume Registry](https://registry.jsonresume.org/)
2. **Command Line**: Install `resume-cli` and run:
   ```bash
   npm install -g resume-cli
   resume export resume.json --theme elegant
   ```
3. **Validation**: Validate the schema:
   ```bash
   resume validate resume.json
   ```

### Updating the CV

The CV structure follows the JSON Resume schema with the following sections:

- **basics**: Personal information and contact details
- **work**: Work experience
- **education**: Educational background
- **skills**: Technical and professional skills
- **projects**: Notable projects
- **languages**: Language proficiencies
- **certificates**: Professional certifications
- **awards**: Awards and achievements
- **publications**: Published works
- **volunteer**: Volunteer experience
- **interests**: Personal interests
- **references**: Professional references

## Schema

This CV uses the official JSON Resume schema v1.0.0:
- Schema URL: https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json
- Documentation: https://jsonresume.org/schema/

## License

This CV is for personal use only.
