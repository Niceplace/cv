#!/usr/bin/env python3
"""
Interactive script to help fill in missing resume data from LinkedIn.
This script will prompt for missing information and update resume.json.
"""

import json
import sys
from datetime import datetime

def get_input(prompt, required=False, default=""):
    """Get input with optional default value."""
    if default:
        prompt = f"{prompt} [{default}]: "
    else:
        prompt = f"{prompt}: "
    
    while True:
        value = input(prompt).strip()
        if not value and default:
            return default
        if not value and required:
            print("This field is required. Please enter a value.")
            continue
        return value

def get_date(prompt, required=False):
    """Get a date in YYYY-MM-DD format."""
    while True:
        date_str = get_input(prompt, required)
        if not date_str:
            return ""
        try:
            datetime.strptime(date_str, "%Y-%m-%d")
            return date_str
        except ValueError:
            print("Invalid date format. Please use YYYY-MM-DD")

def get_list(prompt):
    """Get a list of items."""
    print(f"{prompt} (one per line, empty line to finish):")
    items = []
    while True:
        item = input("  - ").strip()
        if not item:
            break
        items.append(item)
    return items

def fill_contact_info(resume):
    """Fill in contact information."""
    print("\n=== Contact Information ===")
    resume["basics"]["email"] = get_input("Email", required=False)
    resume["basics"]["phone"] = get_input("Phone", required=False)
    
    print("\n--- Location ---")
    resume["basics"]["location"]["city"] = get_input("City", required=False)
    resume["basics"]["location"]["region"] = get_input("Region/State", required=False)
    resume["basics"]["location"]["countryCode"] = get_input("Country Code (e.g., CA, US)", required=False)
    resume["basics"]["location"]["postalCode"] = get_input("Postal Code", required=False)
    resume["basics"]["location"]["address"] = get_input("Address", required=False)

def fill_work_experience(resume):
    """Fill in work experience."""
    print("\n=== Work Experience ===")
    print("Current work entries:", len([w for w in resume.get("work", []) if w.get("name")]))
    
    add_more = get_input("Add work experience entries? (y/n)", default="y").lower() == 'y'
    
    if add_more:
        # Remove empty template entry
        resume["work"] = [w for w in resume.get("work", []) if w.get("name")]
        
        while True:
            print("\n--- New Work Experience ---")
            work = {
                "name": get_input("Company name", required=True),
                "position": get_input("Position/Title", required=True),
                "url": get_input("Company website", required=False),
                "startDate": get_date("Start date (YYYY-MM-DD)", required=True),
                "endDate": get_date("End date (YYYY-MM-DD, empty if current)", required=False),
                "summary": get_input("Job summary", required=False),
                "highlights": get_list("Key achievements/highlights")
            }
            resume["work"].append(work)
            
            if get_input("Add another work experience? (y/n)", default="n").lower() != 'y':
                break

def fill_education(resume):
    """Fill in education."""
    print("\n=== Education ===")
    print("Current education entries:", len([e for e in resume.get("education", []) if e.get("institution")]))
    
    add_more = get_input("Add education entries? (y/n)", default="y").lower() == 'y'
    
    if add_more:
        # Remove empty template entry
        resume["education"] = [e for e in resume.get("education", []) if e.get("institution")]
        
        while True:
            print("\n--- New Education Entry ---")
            education = {
                "institution": get_input("Institution name", required=True),
                "url": get_input("Institution website", required=False),
                "area": get_input("Field of study", required=True),
                "studyType": get_input("Degree type (e.g., Bachelor's, Master's)", required=True),
                "startDate": get_date("Start date (YYYY-MM-DD)", required=False),
                "endDate": get_date("End date (YYYY-MM-DD)", required=False),
                "score": get_input("GPA/Score", required=False),
                "courses": get_list("Relevant courses")
            }
            resume["education"].append(education)
            
            if get_input("Add another education entry? (y/n)", default="n").lower() != 'y':
                break

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
    
    print("=" * 70)
    print("Resume Data Entry Helper")
    print("=" * 70)
    print("\nThis script will help you fill in missing information from LinkedIn.")
    print("Press Enter to skip optional fields.\n")
    
    # Fill sections
    fill_contact_info(resume)
    fill_work_experience(resume)
    fill_education(resume)
    
    # Update metadata
    resume["meta"]["lastModified"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
    
    # Save
    print("\n=== Saving ===")
    try:
        with open('resume.json', 'w') as f:
            json.dump(resume, f, indent=2)
        print("✓ Resume updated successfully!")
        print("\nRun 'python3 check_resume.py' to verify all fields are complete.")
    except Exception as e:
        print(f"Error saving resume: {e}")
        sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user.")
        sys.exit(0)
