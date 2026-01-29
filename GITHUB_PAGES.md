# GitHub Pages Deployment Documentation

## Overview

This repository is configured to automatically publish the rendered CV to GitHub Pages using GitHub Actions. The deployment is fully automated and uses GitHub's free tier.

### One-Time Repository Configuration

To enable GitHub Pages for this repository:

1. Navigate to the repository on GitHub
2. Go to **Settings** → **Pages**
3. Under **Build and deployment** → **Source**, select **GitHub Actions**
4. Save the settings

That's it! The workflow will automatically deploy on the next push to `main` that affects the `rendered/` directory.

### Accessing the Published CV

Once deployed, the CV will be available at:
- **Primary URL**: `https://niceplace.github.io/cv/`
- **Direct CV URL**: `https://niceplace.github.io/cv/resume-bold-header-niceplace.html`

The `index.html` file automatically redirects visitors to the rendered CV.
