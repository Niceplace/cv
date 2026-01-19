# LinkedIn Data Needed

This document outlines the information still needed from the LinkedIn profile to complete the CV.

## Source
LinkedIn Profile: https://www.linkedin.com/in/sbeaulie2/

## Status
❌ **Unable to access LinkedIn profile** - Network restrictions prevent automated data extraction.

## Required Information

### Contact Information
- [ ] Email address
- [ ] Phone number
- [ ] Location (City, Region, Country Code)
- [ ] Address (optional)
- [ ] Postal Code (optional)

### Work Experience
For each position listed on LinkedIn, please provide:
- [ ] Company name
- [ ] Position/Title
- [ ] Company website URL
- [ ] Start date (YYYY-MM-DD format)
- [ ] End date (YYYY-MM-DD format, or leave empty if current)
- [ ] Job summary/description
- [ ] Key highlights and achievements (bullet points)

### Education
For each degree or certification:
- [ ] Institution name
- [ ] Institution website URL
- [ ] Field of study/Area
- [ ] Degree type (Bachelor's, Master's, etc.)
- [ ] Start date (YYYY-MM-DD format)
- [ ] End date (YYYY-MM-DD format)
- [ ] GPA/Score (optional)
- [ ] Relevant courses (optional, array)

### Additional Information (if applicable)
- [ ] Volunteer experience
- [ ] Awards and honors
- [ ] Certifications
- [ ] Publications
- [ ] Professional references

## Instructions for Completion

1. Visit https://www.linkedin.com/in/sbeaulie2/
2. Gather the information listed above
3. Edit `resume.json` and fill in the empty fields
4. Run `python3 check_resume.py` to verify all required fields are filled
5. Validate the JSON with: `python3 -m json.tool resume.json`

## Already Completed

✅ Name: Simon Beaulieu
✅ Professional summary/bio
✅ Skills (inferred from GitHub repositories)
✅ Projects (from GitHub repositories)
✅ Interests
✅ Languages (English, French)
✅ GitHub profile links

## Notes

The resume currently contains comprehensive information gathered from publicly available GitHub data. The missing fields are primarily:
- Professional work history
- Formal education credentials
- Contact information

These can only be accurately provided from the LinkedIn profile or direct input from the profile owner.
