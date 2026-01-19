# CV - JSON Resume Format

This repository contains my CV in [JSON Resume](https://jsonresume.org/) format.

## About

This CV follows the [JSON Resume schema](https://jsonresume.org/schema/) v1.0.0, which is an open-source standard for creating machine-readable resumes.

## Files

- `resume.json` - Main CV file in JSON Resume format
- `check_resume.py` - Helper script to identify empty/incomplete fields
- `fill_resume.py` - Interactive script to help fill in missing data from LinkedIn
- `LINKEDIN_DATA_NEEDED.md` - Documentation of data needed from LinkedIn profile

## Quick Start

### View Current Status

Check which fields still need to be filled in:
```bash
python3 check_resume.py
```

### Fill in Missing Data

Use the interactive helper to add LinkedIn data:
```bash
python3 fill_resume.py
```

Or manually edit `resume.json` with your preferred editor.

## LinkedIn Profile

This CV is based on data from my LinkedIn profile: [https://www.linkedin.com/in/sbeaulie2/](https://www.linkedin.com/in/sbeaulie2/)

See `LINKEDIN_DATA_NEEDED.md` for details on what information still needs to be added.

## Current Status

✅ **Completed:**
- Name: Simon Beaulieu
- Professional summary/bio
- Skills (inferred from GitHub repositories)
- Projects (5 projects from GitHub)
- Interests (Technology, Fitness, Personal Development)
- Languages (English, French - bilingual)
- GitHub profile links

⚠️ **Needs LinkedIn Data:**
- Contact information (email, phone, location)
- Work experience
- Education
- Certifications (if any)
- Awards (if any)
- Volunteer experience (if any)

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
