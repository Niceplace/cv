#!/usr/bin/env bun

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, readdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const themesDir = join(__dirname, '..', 'themes')

interface ResumeData {
  [key: string]: unknown
}

const resumePaths: Record<string, string> = {
  en: join(__dirname, '..', 'resume-json', 'resume-en.json'),
  fr: join(__dirname, '..', 'resume-json', 'resume-fr.json'),
}

function getAvailableThemes(): string[] {
  if (!existsSync(themesDir)) {
    return []
  }

  return readdirSync(themesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map((dirent) => dirent.name)
}

async function loadTheme(themeName: string) {
  const themePathTs = join(themesDir, themeName, 'src', 'index.ts')
  const themePathTsx = join(themesDir, themeName, 'src', 'index.tsx')

  let themePath = ''
  if (existsSync(themePathTsx)) {
    themePath = themePathTsx
  } else if (existsSync(themePathTs)) {
    themePath = themePathTs
  }

  if (!themePath) {
    throw new Error(
      `Theme "${themeName}" not found. Available themes: ${getAvailableThemes().join(', ')}`
    )
  }

  const themeModule = await import(themePath)
  return themeModule.render
}

async function renderTheme(themeName: string) {
  const render = await loadTheme(themeName)

  for (const [lang, resumePath] of Object.entries(resumePaths)) {
    const resumeFile = Bun.file(resumePath)
    const resumeData: ResumeData = await resumeFile.json()

    const html = render(resumeData)
    const outputPath = join(__dirname, '..', 'rendered', `${lang}-resume-${themeName}.html`)
    await Bun.write(outputPath, html)

    console.log(`Rendered: ${outputPath}`)
  }
}

async function main() {
  const themeName = process.argv[2] || 'nordic-minimal'

  try {
    await renderTheme(themeName)
    console.log(`✓ Successfully rendered theme: ${themeName}`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`✗ Error: ${error.message}`)
      console.error(`✗ Stack: ${error.stack}`)
    } else {
      console.error(`✗ Unknown error occurred`)
      console.error(`✗ Error details:`, error)
    }
    process.exit(1)
  }
}

main()