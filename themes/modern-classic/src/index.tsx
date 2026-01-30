import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import Resume from './Resume.tsx'
import type { ResumeData } from './Resume.tsx'

const defaultMeta: ResumeData['meta'] = {
  canonical: '',
  version: '',
  lastModified: '',
  sectionTitles: {
    projects: 'Projects',
    education: 'Education',
    references: 'References',
    experience: 'Experience',
    contact: 'Contact',
    languages: 'Languages',
    interests: 'Interests',
    projectSkills: 'Tech Stack',
    experienceSkills: 'Skills',
  },
  lang: 'EN',
}

function resumeWithDefaults(resume: Partial<ResumeData> & { meta?: ResumeData['meta'] }): Partial<ResumeData> & { meta: ResumeData['meta'] } {
  return {
    ...resume,
    meta: resume.meta || defaultMeta,
  }
}

export function render(resume: Partial<ResumeData> & { meta?: ResumeData['meta'] }) {
  const sheet = new ServerStyleSheet()

  try {
    const resumeWithMeta = resumeWithDefaults(resume)
    const html = renderToString(sheet.collectStyles(<Resume resume={resumeWithMeta} />))
    const styles = sheet.getStyleTags()

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.basics?.name || 'Resume'} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
      background: #f5f5f5;
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

export function renderCombined(
  resumeEn: Partial<ResumeData> & { meta?: ResumeData['meta'] },
  resumeFr: Partial<ResumeData> & { meta?: ResumeData['meta'] }
): string {
  const sheet = new ServerStyleSheet()

  try {
    const resumeEnWithMeta = resumeWithDefaults(resumeEn)
    const htmlEn = renderToString(sheet.collectStyles(<Resume resume={resumeEnWithMeta} />))
    const styles = sheet.getStyleTags()

    // Clear the sheet and collect styles for French resume
    sheet.seal()
    const sheet2 = new ServerStyleSheet()
    const resumeFrWithMeta = resumeWithDefaults({ ...resumeFr, meta: { ...resumeFr.meta, lang: 'FR' } })
    const htmlFr = renderToString(sheet2.collectStyles(<Resume resume={resumeFrWithMeta} />))
    sheet2.seal()

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeEn.basics?.name || 'Resume'} - Curriculum Vitae</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
      background: #f5f5f5;
    }
    /* Language toggle button styles */
    #lang-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
      cursor: pointer;
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    #lang-toggle:hover {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }
    #lang-toggle:active {
      transform: translateY(0);
    }
    /* Resume visibility toggles */
    #resume-fr {
      display: none;
    }
    @media print {
      #lang-toggle {
        display: none;
      }
      body {
        background: white;
      }
      @page {
        margin: 0.5in;
      }
      /* Show both languages in print */
      #resume-en,
      #resume-fr {
        display: block !important;
      }
      #resume-fr {
        page-break-before: always;
      }
    }
  </style>
</head>
<body>
  <button id="lang-toggle" type="button">EN / FR</button>
  <div id="resume-en">
    ${htmlEn}
  </div>
  <div id="resume-fr">
    ${htmlFr}
  </div>
  <script>
    (function() {
      const en = document.getElementById('resume-en');
      const fr = document.getElementById('resume-fr');
      const toggle = document.getElementById('lang-toggle');
      function setLang(lang) {
        if (lang === 'fr') {
          en.style.display = 'none';
          fr.style.display = 'block';
        } else {
          en.style.display = 'block';
          fr.style.display = 'none';
        }
        localStorage.setItem('lang', lang);
      }
      // Get saved preference or default to en
      const savedLang = localStorage.getItem('lang') || 'en';
      setLang(savedLang);
      // Toggle button click handler
      toggle.addEventListener('click', function() {
        const current = localStorage.getItem('lang') || 'en';
        setLang(current === 'en' ? 'fr' : 'en');
      });
    })();
  </script>
</body>
</html>`
  } finally {
    sheet.seal()
  }
}
