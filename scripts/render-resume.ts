#!/usr/bin/env bun

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, readdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const themesDir = join(__dirname, '..', 'themes')

interface ResumeData {
  basics?: {
    phone?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

const resumePaths: Record<string, string> = {
  en: join(__dirname, '..', 'resume-json', 'resume-en.json'),
  fr: join(__dirname, '..', 'resume-json', 'resume-fr.json'),
}

interface RenderOptions {
  theme: string
  outputDir: string
  stripPhone: boolean
  combined: boolean
}

function parseArgs(): RenderOptions {
  const args = process.argv.slice(2)
  const options: RenderOptions = {
    theme: 'modern-classic',
    outputDir: 'rendered',
    stripPhone: false,
    combined: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
      case '--output-dir':
      case '-o':
        options.outputDir = args[++i]
        break
      case '--strip-phone':
      case '-s':
        options.stripPhone = true
        break
      case '--combined':
      case '-c':
        options.combined = true
        break
      case '--help':
      case '-h':
        printHelp()
        process.exit(0)
      default:
        // If it doesn't start with -, it's the theme name
        if (!arg.startsWith('-')) {
          options.theme = arg
        }
    }
  }

  return options
}

function printHelp() {
  console.log(`
Usage: bun run scripts/render-resume.ts [theme] [options]

Arguments:
  theme              Theme name to render (default: nordic-minimal)

Options:
  -o, --output-dir   Output directory (default: rendered)
  -s, --strip-phone  Strip phone number from output
  -c, --combined     Render combined EN/FR version with language toggle
  -h, --help         Show this help message

Examples:
  bun run scripts/render-resume.ts
  bun run scripts/render-resume.ts modern-classic
  bun run scripts/render-resume.ts --output-dir github-pages --strip-phone
  bun run scripts/render-resume.ts modern-classic -o github-pages -s

Available themes:
  ${getAvailableThemes().join(', ')}
`)
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
  return { render: themeModule.render, renderCombined: themeModule.renderCombined }
}

async function renderTheme(options: RenderOptions) {
  const { theme, outputDir, stripPhone, combined } = options
  const { render, renderCombined } = await loadTheme(theme)
  const renderOutputDir = join(__dirname, '..', outputDir)

  if (combined) {
    // Combined mode: render both languages in a single HTML file
    const enResumeFile = Bun.file(resumePaths.en)
    const frResumeFile = Bun.file(resumePaths.fr)
    const enResumeData: ResumeData = await enResumeFile.json()
    const frResumeData: ResumeData = await frResumeFile.json()

    // Strip phone number if requested
    if (stripPhone) {
      if (enResumeData.basics) delete enResumeData.basics.phone
      if (frResumeData.basics) delete frResumeData.basics.phone
    }

    if (!renderCombined) {
      throw new Error(`Theme "${theme}" does not support combined rendering`)
    }

    const html = renderCombined(enResumeData, frResumeData)
    const outputPath = join(renderOutputDir, 'index.html')
    await Bun.write(outputPath, html, { createPath: true })

    console.log(`Rendered combined: ${outputPath}`)
  } else {
    // Separate files for each language
    for (const [lang, resumePath] of Object.entries(resumePaths)) {
      const resumeFile = Bun.file(resumePath)
      const resumeData: ResumeData = await resumeFile.json()

      // Strip phone number if requested
      if (stripPhone && resumeData.basics) {
        delete resumeData.basics.phone
      }

      const html = render(resumeData)
      const outputPath = join(renderOutputDir, `${lang}-resume-${theme}.html`)
      // Will create output directory if it doesn't exist
      await Bun.write(outputPath, html, { createPath: true })

      console.log(`Rendered: ${outputPath}`)
    }
  }
}

async function main() {
  const options = parseArgs()

  try {
    await renderTheme(options)
    console.log(`✓ Successfully rendered theme: ${options.theme}`)
    console.log(`  Output directory: ${options.outputDir}`)
    if (options.combined) {
      console.log(`  Mode: combined EN/FR with toggle`)
    } else {
      console.log(`  Mode: separate files`)
    }
    if (options.stripPhone) {
      console.log(`  Phone number: stripped`)
    }
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
