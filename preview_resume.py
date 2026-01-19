#!/usr/bin/env python3
"""
Simple text preview of the resume.
This script generates a human-readable text version of the JSON resume.
"""

import json
import sys

def print_section(title, char="="):
    """Print a section header."""
    print(f"\n{title}")
    print(char * len(title))

def format_date_range(start, end):
    """Format date range."""
    if not start and not end:
        return ""
    if not end:
        return f"{start} - Present"
    return f"{start} - {end}"

def preview_resume(resume):
    """Generate a text preview of the resume."""
    
    # Header
    basics = resume.get("basics", {})
    print("=" * 70)
    print(f"{basics.get('name', 'N/A').center(70)}")
    print(f"{basics.get('label', '').center(70)}")
    print("=" * 70)
    
    # Contact & Profiles
    if basics.get("email") or basics.get("phone"):
        print_section("Contact", "-")
        if basics.get("email"):
            print(f"Email: {basics['email']}")
        if basics.get("phone"):
            print(f"Phone: {basics['phone']}")
        
        location = basics.get("location", {})
        if location.get("city") or location.get("region"):
            loc_parts = [location.get("city", ""), location.get("region", ""), location.get("countryCode", "")]
            loc_str = ", ".join([p for p in loc_parts if p])
            if loc_str:
                print(f"Location: {loc_str}")
    
    # Profiles
    profiles = basics.get("profiles", [])
    if profiles:
        print_section("Profiles", "-")
        for profile in profiles:
            print(f"• {profile.get('network', 'N/A')}: {profile.get('url', 'N/A')}")
    
    # Summary
    if basics.get("summary"):
        print_section("Summary")
        print(basics["summary"])
    
    # Work Experience
    work = resume.get("work", [])
    work_with_data = [w for w in work if w.get("name")]
    if work_with_data:
        print_section("Work Experience")
        for job in work_with_data:
            print(f"\n{job.get('position', 'N/A')} at {job.get('name', 'N/A')}")
            date_range = format_date_range(job.get('startDate'), job.get('endDate'))
            if date_range:
                print(f"  {date_range}")
            if job.get("summary"):
                print(f"  {job['summary']}")
            
            highlights = job.get("highlights", [])
            if highlights:
                for highlight in highlights:
                    print(f"  • {highlight}")
    
    # Education
    education = resume.get("education", [])
    edu_with_data = [e for e in education if e.get("institution")]
    if edu_with_data:
        print_section("Education")
        for edu in edu_with_data:
            degree_parts = [edu.get('studyType', ''), edu.get('area', '')]
            degree_str = " in ".join([p for p in degree_parts if p])
            print(f"\n{degree_str if degree_str else 'N/A'}")
            print(f"  {edu.get('institution', 'N/A')}")
            date_range = format_date_range(edu.get('startDate'), edu.get('endDate'))
            if date_range:
                print(f"  {date_range}")
            if edu.get("score"):
                print(f"  GPA: {edu['score']}")
    
    # Skills
    skills = resume.get("skills", [])
    if skills:
        print_section("Skills")
        for skill_group in skills:
            name = skill_group.get('name', 'N/A')
            level = skill_group.get('level', '')
            keywords = skill_group.get('keywords', [])
            
            print(f"\n{name}", end="")
            if level:
                print(f" ({level})", end="")
            print()
            
            if keywords:
                print(f"  {', '.join(keywords)}")
    
    # Projects
    projects = resume.get("projects", [])
    projects_with_data = [p for p in projects if p.get("name")]
    if projects_with_data:
        print_section("Projects")
        for project in projects_with_data:
            print(f"\n{project.get('name', 'N/A')}")
            if project.get("url"):
                print(f"  URL: {project['url']}")
            if project.get("description"):
                print(f"  {project['description']}")
            
            highlights = project.get("highlights", [])
            if highlights:
                for highlight in highlights:
                    print(f"  • {highlight}")
            
            keywords = project.get("keywords", [])
            if keywords:
                print(f"  Technologies: {', '.join(keywords)}")
    
    # Languages
    languages = resume.get("languages", [])
    if languages:
        print_section("Languages")
        for lang in languages:
            print(f"• {lang.get('language', 'N/A')}: {lang.get('fluency', 'N/A')}")
    
    # Interests
    interests = resume.get("interests", [])
    if interests:
        print_section("Interests")
        for interest in interests:
            name = interest.get('name', 'N/A')
            keywords = interest.get('keywords', [])
            if keywords:
                print(f"• {name}: {', '.join(keywords)}")
            else:
                print(f"• {name}")
    
    # Certifications
    certificates = resume.get("certificates", [])
    if certificates:
        print_section("Certifications")
        for cert in certificates:
            print(f"• {cert.get('name', 'N/A')}")
            if cert.get('issuer'):
                print(f"  Issued by: {cert['issuer']}")
            if cert.get('date'):
                print(f"  Date: {cert['date']}")
    
    # Awards
    awards = resume.get("awards", [])
    if awards:
        print_section("Awards")
        for award in awards:
            print(f"• {award.get('title', 'N/A')}")
            if award.get('awarder'):
                print(f"  From: {award['awarder']}")
            if award.get('date'):
                print(f"  Date: {award['date']}")
    
    print("\n" + "=" * 70)
    print()

def main():
    """Main function."""
    try:
        with open('resume.json', 'r') as f:
            resume = json.load(f)
    except FileNotFoundError:
        print("Error: resume.json not found")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON - {e}")
        sys.exit(1)
    
    preview_resume(resume)

if __name__ == "__main__":
    main()
