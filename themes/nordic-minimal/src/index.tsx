import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import Resume from './Resume.tsx'
import React from 'react'

interface Location {
  city?: string
  region?: string
  countryCode?: string
}

interface Profile {
  network?: string
  username?: string
  url?: string
}

interface Basics {
  name?: string
  label?: string
  summary?: string
  email?: string
  phone?: string
  location?: Location
  url?: string
  profiles?: Profile[]
}

interface Work {
  position?: string
  name?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

interface Education {
  institution?: string
  studyType?: string
  area?: string
  startDate?: string
  endDate?: string
}

interface Skill {
  name?: string
  keywords?: string[]
}

interface Award {
  title?: string
  awarder?: string
  date?: string
  summary?: string
}

interface Language {
  language?: string
  fluency?: string
}

interface Interest {
  name?: string
}

interface Project {
  name?: string
  url?: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
  skills?: string[]
}

interface ResumeData {
  basics?: Basics
  work?: Work[]
  education?: Education[]
  skills?: Skill[]
  awards?: Award[]
  languages?: Language[]
  interests?: Interest[]
  projects?: Project[]
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
  <title>${resume.basics?.name || 'Resume'} - Curriculum Vitae</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">

  ${styles}

  <style>
    * {
      box-sizing: border-box;
    }

    html {
      margin: 0;
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      background: #f8f9fa;
    }

    @media print {
      body {
        background: white;
      }

      @page {
        margin: 0.5cm;
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
