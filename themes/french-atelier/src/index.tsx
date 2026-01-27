import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import Resume from './Resume.tsx'

interface Location {
  address?: string
  postalCode?: string
  city?: string
  countryCode?: string
  region?: string
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
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
  location?: string
}

interface EducationItem {
  institution?: string
  url?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  score?: string
  courses?: string[]
  summary?: string
}

interface Skill {
  name?: string
  keywords?: string[]
}

interface Project {
  name?: string
  description?: string
  url?: string
  startDate?: string
  endDate?: string
  type?: string
  highlights?: string[]
  technologies?: string[]
}

interface VolunteerItem {
  organization?: string
  position?: string
  url?: string
  startDate?: string
  endDate?: string
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
  volunteer?: VolunteerItem[]
  awards?: Award[]
  publications?: Publication[]
  languages?: Language[]
  interests?: Interest[]
  references?: Reference[]
  [key: string]: unknown
}

export function render(resume: ResumeData) {
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<Resume resume={resume} />))
  const styles = sheet.getStyleTags()
  const title = (resume.basics && resume.basics.name) || 'Resume'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  ${styles}
</head>
<body>${html}</body>
</html>`
}
