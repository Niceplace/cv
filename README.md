# Niceplace's overly engineered Resume (Curriculum Vitae)

Hello ! I'm Simon and I'm currently looking for a job, here is my [Linkedin](https://www.linkedin.com/in/sbeaulie2/). This repository hosts my resume in JSON format so I can render it on the fly with various UI themes and adapt specific wording/sections based on different job postings so my profile is a better fit for a given job.

To make job searching more fun, I decided to create a full fledged project with AI (oh no!) and automation (oh yeah!) to handle the various forms my resume will have until I land my next job.

This is also an excuse to use Github projects, which I have wanted to try for a while.

I will leverage copilot to build the tooling around this repository and fix it by hand if it proves to be not as effective as I would like

# Features

- A `base` version of the resume data in two languages: [English](./resume-json/resume-en.json) and [French](./resume-json/resume-fr.json)
- Automated validation of resume formats against the json resume [schema](https://jsonresume.org/schema)
- Automated publishing (only for the base version) of the CV against the [public gist](https://gist.github.com/Niceplace/8e587fe79ca40a637589b1d2d5c9373d) of my resume
- Multiple resume themes with flexible rendering

# Rendering Resumes

Render resume with a specific theme:

```bash
bun run render modern-classic
```

Render with default theme (nordic-minimal):

```bash
bun run render
```

Available themes:

- nordic-minimal
- modern-classic
- french-atelier
- tailwind
- typewriter-modern

Rendered HTML files are saved in the `rendered/` directory with the naming convention `{lang}-resume-{theme}.html`

- **Rendered HTML CV published to GitHub Pages** - View the latest version at `https://niceplace.github.io/cv/`

## GitHub Pages Setup

The CV is automatically rendered to HTML and published to GitHub Pages on every push to the `main` branch that modifies the `rendered/` directory.

### How to Enable GitHub Pages (One-time setup)

1. Go to the repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

Once enabled, the CV will be automatically deployed to `https://niceplace.github.io/cv/` whenever changes are pushed to the `rendered/` directory on the `main` branch.

The deployment uses GitHub's free tier, which provides:
- Free hosting for public repositories
- Automatic HTTPS
- Fast CDN distribution
- No build minute limits for public repositories

# Out of scope

I absolutely will not share any confidential information related to offers that I might receive. This repository will publish information that is already public i.e. available in the job posting or the employer's public website.
