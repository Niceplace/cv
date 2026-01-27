import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import Resume from './Resume.tsx'

interface Location {
  address?: string
  city?: string
  region?: string
  postalCode?: string
  countryCode?: string
  country?: string
}

interface Profile {
  network?: string
  username?: string
  url?: string
}

interface Basics {
  name?: string
  label?: string
  email?: string
  phone?: string
  url?: string
  summary?: string
  location?: Location
  profiles?: Profile[]
}

interface WorkItem {
  name?: string
  position?: string
  url?: string
  startDate?: string | Date
  endDate?: string | Date | null
  summary?: string
  highlights?: string[]
  location?: string
}

interface EducationItem {
  institution?: string
  studyType?: string
  area?: string
  startDate?: string | Date
  endDate?: string | Date | null
  score?: string
}

interface Skill {
  name?: string
  keywords?: string[]
}

interface Project {
  name?: string
  description?: string
  url?: string
  startDate?: string | Date
  endDate?: string | Date | null
  summary?: string
  highlights?: string[]
}

interface Volunteer {
  organization?: string
  position?: string
  url?: string
  startDate?: string | Date
  endDate?: string | Date | null
  summary?: string
  highlights?: string[]
}

interface Award {
  title?: string
  date?: string
  awarder?: string
  summary?: string
}

interface Publication {
  name?: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

interface Language {
  language?: string
  fluency?: string
}

interface Interest {
  name?: string
  keywords?: string[]
}

interface Reference {
  name?: string
  reference?: string
}

interface ResumeData {
  basics?: Basics
  work?: WorkItem[]
  education?: EducationItem[]
  skills?: Skill[]
  projects?: Project[]
  volunteer?: Volunteer[]
  awards?: Award[]
  publications?: Publication[]
  languages?: Language[]
  interests?: Interest[]
  references?: Reference[]
}

export function render(resume: ResumeData): string {
  const sheet = new ServerStyleSheet()

  try {
    const html = renderToString(sheet.collectStyles(<Resume resume={resume} />))
    const styles = sheet.getStyleTags()

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.basics?.name || 'Resume'} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${styles}
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      margin: 0;
      padding: 0;
      background: #f5f5f0;
    }
    @media print {
      body {
        background: white;
      }
      @page {
        margin: 0.5in;
      }
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`
  } finally {
    sheet.seal()
  }
}
