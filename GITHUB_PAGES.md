# GitHub Pages Deployment Documentation

## Overview

This repository is configured to automatically publish the rendered CV to GitHub Pages using GitHub Actions. The deployment is fully automated and uses GitHub's free tier.

## How It Works

1. **Rendering**: The CV is rendered to HTML using the `render-resume.js` script and stored in the `rendered/` directory
2. **Deployment**: When changes are pushed to the `main` branch affecting the `rendered/` directory, the GitHub Pages workflow is triggered
3. **Publishing**: The workflow uploads the `rendered/` directory to GitHub Pages and deploys it

## GitHub Pages Free Tier

GitHub Pages is completely **free** for public repositories with the following benefits:

- ✅ Free hosting for static websites
- ✅ Automatic HTTPS with custom domain support
- ✅ Fast global CDN distribution
- ✅ Unlimited bandwidth for reasonable usage
- ✅ No build minute limits for public repositories
- ✅ Custom domain support (optional)

**Sources consulted:**
- [GitHub Pages Official Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [GitHub Pages Pricing](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)
- [GitHub Actions Pricing for Public Repositories](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)

## Setup Instructions

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

## Workflow Details

The deployment workflow (`.github/workflows/deploy-pages.yml`) is configured to:

- **Trigger**: On push to `main` branch when files in `rendered/` are modified
- **Manual Trigger**: Can be manually triggered from the Actions tab
- **Permissions**: Uses the minimum required permissions (read contents, write pages, id-token)
- **Concurrency**: Ensures only one deployment runs at a time
- **Actions Used**:
  - `actions/checkout@v6.0.1` - Checks out the repository
  - `actions/configure-pages@v5.0.0` - Configures Pages settings
  - `actions/upload-pages-artifact@v3.0.1` - Uploads the rendered directory
  - `actions/deploy-pages@v4.0.7` - Deploys to GitHub Pages

## Updating the CV

To update the published CV:

1. Modify `resume-base.json` with your changes
2. The existing workflow will validate and render the CV
3. Once the rendered HTML is committed to `main`, the Pages workflow deploys it automatically
4. The CV will be live at `https://niceplace.github.io/cv/` within minutes

## Troubleshooting

### Deployment Not Working

If the CV is not deploying:

1. Verify GitHub Pages is enabled in repository settings (Settings → Pages)
2. Check that **Source** is set to **GitHub Actions** (not a branch)
3. Review the Actions tab for any workflow failures
4. Ensure the `rendered/` directory contains the HTML files

### 404 Error

If you see a 404 error:

1. Wait a few minutes after the first deployment (initial setup can take time)
2. Verify the workflow completed successfully in the Actions tab
3. Check that `index.html` and `resume-bold-header-niceplace.html` exist in `rendered/`

## Cost Analysis

**Total Cost: $0.00**

This solution uses only free GitHub features:
- GitHub Pages hosting: FREE for public repositories
- GitHub Actions minutes: FREE for public repositories (unlimited)
- Storage: FREE within GitHub's limits (repository size under 1GB recommended)
- Bandwidth: FREE for reasonable usage

## Future Enhancements

Possible improvements to consider:

- Add a custom domain (requires DNS configuration but still free with GitHub Pages)
- Create multiple CV versions for different job applications
- Add a CV version selector to the index page
- Implement PDF generation and hosting
- Add analytics (using privacy-friendly solutions)
