#!/usr/bin/env python3
"""
Helper script to show empty/incomplete fields in the resume.json file.
This helps identify what data still needs to be filled in from LinkedIn.
"""

import json
import sys

def check_empty_fields(obj, path=""):
    """Recursively check for empty fields in the resume."""
    empty_fields = []
    
    if isinstance(obj, dict):
        for key, value in obj.items():
            current_path = f"{path}.{key}" if path else key
            if isinstance(value, str) and value == "":
                empty_fields.append(current_path)
            elif isinstance(value, (dict, list)):
                empty_fields.extend(check_empty_fields(value, current_path))
    elif isinstance(obj, list):
        if len(obj) == 0:
            empty_fields.append(f"{path} (empty array)")
        else:
            for i, item in enumerate(obj):
                current_path = f"{path}[{i}]"
                empty_fields.extend(check_empty_fields(item, current_path))
    
    return empty_fields

def main():
    try:
        with open('resume.json', 'r') as f:
            resume = json.load(f)
        
        empty_fields = check_empty_fields(resume)
        
        if empty_fields:
            print("The following fields are empty and should be filled in from LinkedIn:")
            print("=" * 70)
            for field in empty_fields:
                print(f"  - {field}")
            print("=" * 70)
            print(f"\nTotal empty fields: {len(empty_fields)}")
            print("\nPlease visit https://www.linkedin.com/in/sbeaulie2/ to gather this information.")
        else:
            print("✓ All fields are filled in!")
            
    except FileNotFoundError:
        print("Error: resume.json not found")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON - {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
