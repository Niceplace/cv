import React from 'react'
import styled from 'styled-components'
import { Section, SectionTitle, DateRange, ContactInfo } from '../../../core/src/index'

export interface Profile {
  network: string
  username: string
  url: string
}

export interface Location {
  address: string
  postalCode: string
  city: string
  countryCode: string
  region: string
}

export interface Basics {
  name: string
  label: string
  email: string
  phone: string
  url: string
  summary: string
  image: string
  location: Location
  profiles: Profile[]
}

export interface WorkItem {
  name: string
  position: string
  url: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[]
  skills?: string[]
}

export interface VolunteerItem {
  organization: string
  position: string
  url: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[]
}

export interface EducationItem {
  institution: string
  url: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  score: string
  courses: string[]
}

export interface Award {
  title: string
  date: string
  awarder: string
  summary: string
}

export interface Certificate {
  name: string
  date: string
  issuer: string
  url: string
}

export interface Publication {
  name: string
  publisher: string
  releaseDate: string
  url: string
  summary: string
}

export interface Skill {
  name: string
  level: string
  keywords: string[]
}

export interface Language {
  language: string
  fluency: string
}

export interface Interest {
  name: string
  keywords: string[]
}

export interface Reference {
  name: string
  reference: string
}

export interface Project {
  name: string
  description: string
  url: string
  urlText?: string
  keywords: string[]
  skills?: string[]
  roles: string[]
  type: string
  startDate: string
  endDate: string
  highlights: string[]
}

export interface Meta {
  canonical: string
  version: string
  lastModified: string
  sectionTitles?: SectionTitles
  lang?: string
}

export interface SectionTitles {
  projects: string
  education: string
  references: string
  experience: string
  contact: string
  languages: string
  interests: string
  volunteer?: string
  awards?: string
  publications?: string
  projectSkills: string
  experienceSkills: string
}

export interface ResumeData {
  basics: Basics
  work: WorkItem[]
  volunteer: VolunteerItem[]
  education: EducationItem[]
  awards: Award[]
  certificates: Certificate[]
  publications: Publication[]
  skills: Skill[]
  languages: Language[]
  interests: Interest[]
  references: Reference[]
  projects: Project[]
  meta: Meta
}

const Layout = styled.div`
  max-width: 850px;
  margin: 0 auto;
  padding: 60px 40px;
  background: white;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: #1f2937;

  @media print {
    padding: 40px;
  }
`

// Override break-inside for first section to prevent blank first page
const FirstSectionStyles = `
  @media print {
    .first-section {
      break-inside: auto !important;
    }

    /* Allow first section title to stay on first page but don't force it to stay with first item if content is too long */
    .first-section .resume-section-title {
      break-after: avoid;
      break-inside: avoid;
      max-height: 30vh; /* Prevent title from taking too much space */
    }

    /* Allow individual work items to break within first section */
    .first-section .resume-item {
      break-inside: auto;
    }

    /* Prevent work headers from breaking, but allow content to flow to next page */
    .first-section .resume-item-header {
      break-inside: avoid;
      break-after: avoid;
    }

    /* Allow work content (paragraphs, lists) to break freely */
    .first-section .resume-description,
    .first-section .resume-highlights {
      break-inside: auto;
    }

    /* For very long content, allow splitting after a reasonable amount */
    .first-section .resume-item {
      max-height: 40vh;
      overflow: visible;
    }

    /* Subsequent sections should avoid breaking */
    .resume-section:not(.first-section) {
      break-inside: avoid;
    }

    /* Ensure at least some content appears on first page */
    .first-section .resume-item:first-child {
      break-before: auto;
      break-inside: auto;
    }
  }
`

const Header = styled.header`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e5e7eb;
`

const HeaderNameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
  
  > *:first-child {
    flex: 0 0 60%;
    min-width: 0;
  }
  
  > *:last-child {
    flex: 0 0 40%;
    min-width: 0;
  }
`

const Name = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
`

const Label = styled.div`
  font-size: 20px;
  color: #6b7280;
  font-weight: 500;
`

const StyledContactInfo = styled(ContactInfo)`
  font-size: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;

  a {
    font-size: 15px;
  }

  span {
    white-space: nowrap;
  }

  > * {
    margin-right: 0;
    margin-left: 0;
  }
`

const Summary = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  margin: 20px 0 0 0;
`

const StyledSectionTitle = styled(SectionTitle)`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  padding-bottom: 4px;
  border-bottom: 3px solid #0066cc;

  @media print {
    margin: 0 0 4px 0;
    padding-bottom: 2px;
  }
`

const WorkItemStyled = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  @media print {
    break-inside: avoid;
  }
`

const WorkHeader = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 6px;
  flex-wrap: wrap;
  gap: 6px;
  line-height: 1.3;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
    margin-bottom: 4px;
  }

  @media print {
    margin-bottom: 4px;
    line-height: 1.2;
  }
`

const Position = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  display: inline;
  line-height: 1.3;

  @media print {
    font-size: 15px;
    line-height: 1.2;
  }
`

const Company = styled.div`
  font-size: 14px;
  color: #0066cc;
  font-weight: 500;
  display: inline;
  line-height: 1.3;

  @media print {
    font-size: 13px;
    line-height: 1.2;
  }
`

const DateText = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
  display: inline;
  line-height: 1.3;

  @media print {
    font-size: 12px;
    line-height: 1.2;
  }
`

const Separator = styled.span`
  color: #9ca3af;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;

  @media print {
    font-size: 12px;
    line-height: 1.2;
  }
`

const WorkSummary = styled.p`
  margin: 12px 0;
  color: #4b5563;
  line-height: 1.7;
  font-size: 15px;
`

const Highlights = styled.ul`
  margin: 12px 0 0 0;
  padding-left: 20px;
  list-style-type: disc;

  li {
    margin: 8px 0;
    color: #4b5563;
    line-height: 1.7;
    padding-left: 4px;
  }
`

const EducationItemStyled = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  @media print {
    break-inside: avoid;
  }
`

const Institution = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
`

const Degree = styled.div`
  font-size: 15px;
  color: #4b5563;
  margin-bottom: 4px;
`

const EducationDate = styled.div`
  font-size: 14px;
  color: #6b7280;
`

const LanguagesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media print {
    gap: 8px;
  }
`

const LanguageItem = styled.li`
  font-size: 14px;
  color: #6b7280;
`

const InterestsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;

  @media print {
    gap: 6px;
  }
`

const InterestItem = styled.li`
  font-size: 14px;
  color: #6b7280;

  &:not(:last-child)::after {
    content: '•';
    margin-left: 12px;
    color: #d1d5db;
  }
`

// Skills display for work experience - inline with full-width background
const WorkSkillsContainer = styled.div`
  margin: 8px 0 12px 0;
  padding: 4px 0;
  background-color: #f3f4f6;
  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
`

const SkillsLabel = styled.span`
  font-weight: 600;
  color: #111827;
  margin-right: 6px;
  font-size: 14px;
`

// Skills display component for projects (keeps original layout)
const SkillsContainer = styled.div`
  margin: 0px;
  padding: 3px 0;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.4;

  @media print {
    line-height: 1.3;
  }
`

const SkillsTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 3px;
  font-size: 15px;

  @media print {
    margin-bottom: 2px;
  }
`

const SkillsContent = styled.div`
  color: #4b5563;
  font-size: 13px;
`

// Component to render work experience skills inline
const WorkSkills = ({ skills, title }: { skills?: string[]; title: string }) => {
  if (!skills || skills.length === 0) return null

  return (
    <WorkSkillsContainer>
      <SkillsLabel>{title}:</SkillsLabel>
      {skills.join(', ')}
    </WorkSkillsContainer>
  )
}

// Component to render skills with proper format (for projects)
const ModernSkillsList = ({
  skills,
  title,
}: {
  skills?: string[]
  title: string
}) => {
  if (!skills || skills.length === 0) return null

  return (
    <SkillsContainer>
      <SkillsTitle>{title}:</SkillsTitle>
      <SkillsContent>{skills.join(', ')}</SkillsContent>
    </SkillsContainer>
  )
}

// Three-column project layout components
const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  @media print {
    margin-bottom: 4px;
    padding-bottom: 4px;
    gap: 6px;
    /* Fix print layout to maintain three columns */
    grid-template-columns: 1fr 1fr 1fr !important;
    grid-auto-flow: row !important;
    width: 100% !important;
    max-width: none !important;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProjectInfoColumn = styled.div`
  min-width: 0;
`

const ProjectDetailsColumn = styled.div`
  min-width: 0;
`

const ProjectSkillsColumn = styled.div`
  min-width: 0;
`

const ProjectNameStyled = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 3px 0;

  @media print {
    margin: 0 0 2px 0;
  }
`

const ProjectLinkStyled = styled.a`
  font-size: 14px;
  color: #0066cc;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`

const ProjectDateStyled = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;

  @media print {
    margin-top: 1px;
  }
`

interface ResumeProps {
  resume: Partial<ResumeData>
}

function Resume({ resume }: ResumeProps) {
  const {
    basics,
    work = [],
    education = [],
    projects = [],
    volunteer = [],
    awards = [],
    publications = [],
    languages = [],
    interests = [],
    references = [],
  } = resume

  return (
    <>
      <style>{FirstSectionStyles}</style>
      <Layout>
        <Header>
          <HeaderNameContainer>
            <Name>{basics?.name}</Name>
            {basics?.label && <Label>{basics.label}</Label>}
          </HeaderNameContainer>
          <StyledContactInfo basics={basics} />
          {basics?.summary && <Summary>{basics.summary}</Summary>}
        </Header>

        {work?.length > 0 && (
          <Section className="first-section">
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.experience || 'Experience'}
            </StyledSectionTitle>
            {work.map((job, index) => (
              <WorkItemStyled key={index}>
                <WorkHeader>
                  <Position>{job.position}</Position>
                  {job.name && (
                    <>
                      <Separator>{resume.meta?.lang === 'FR' ? 'chez' : 'at'}</Separator>
                      <Company>{job.name}</Company>
                    </>
                  )}
                  <Separator>•</Separator>
                  <DateText>
                    <DateRange startDate={job.startDate} endDate={job.endDate} />
                  </DateText>
                </WorkHeader>
                {job.summary && <WorkSummary>{job.summary}</WorkSummary>}
                <WorkSkills
                  skills={job.skills}
                  title={resume.meta?.sectionTitles?.experienceSkills || 'Skills'}
                />
                {job.highlights?.length > 0 && (
                  <Highlights>
                    {job.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </Highlights>
                )}
              </WorkItemStyled>
            ))}
          </Section>
        )}

        {education?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.education || 'Education'}
            </StyledSectionTitle>
            {education.map((edu, index) => (
              <EducationItemStyled key={index}>
                <Institution>{edu.institution}</Institution>
                <Degree>
                  {edu.studyType} in {edu.area}
                  {edu.score && ` • ${edu.score}`}
                </Degree>
                <EducationDate>
                  <DateRange startDate={edu.startDate} endDate={edu.endDate} />
                </EducationDate>
              </EducationItemStyled>
            ))}
          </Section>
        )}

        {projects?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.projects || 'Projects'}
            </StyledSectionTitle>
            {projects.map((project, index) => (
              <ProjectContainer key={index}>
                {/* Column 1: Project name, link, date */}
                <ProjectInfoColumn>
                  <ProjectNameStyled>{project.name}</ProjectNameStyled>
                  {project.url && (
                    <ProjectLinkStyled href={project.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://slackmojis.com/emojis/8712-github/download"
                        alt="GitHub"
                        style={{
                          width: '14px',
                          height: '14px',
                          verticalAlign: 'middle',
                        }}
                      />
                      {project.urlText || new URL(project.url).pathname.split('/').pop()}
                    </ProjectLinkStyled>
                  )}
                  {(project.startDate || project.endDate) && (
                    <ProjectDateStyled>
                      <DateRange startDate={project.startDate} endDate={project.endDate} />
                    </ProjectDateStyled>
                  )}
                </ProjectInfoColumn>

                {/* Column 2: Description and highlights */}
                <ProjectDetailsColumn>
                  {project.description && <WorkSummary>{project.description}</WorkSummary>}
                  {project.highlights?.length > 0 && (
                    <Highlights>
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </Highlights>
                  )}
                </ProjectDetailsColumn>

                {/* Column 3: Skills */}
                <ProjectSkillsColumn>
                  <ModernSkillsList
                    skills={project.skills}
                    title={resume.meta?.sectionTitles?.projectSkills || 'Tech Stack'}
                  />
                </ProjectSkillsColumn>
              </ProjectContainer>
            ))}
          </Section>
        )}

        {volunteer?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.volunteer || 'Volunteer'}
            </StyledSectionTitle>
            {volunteer.map((vol, index) => (
              <WorkItemStyled key={index}>
                <WorkHeader>
                  <div>
                    <Position>{vol.position}</Position>
                    {vol.organization && <Company>{vol.organization}</Company>}
                  </div>
                  {(vol.startDate || vol.endDate) && (
                    <DateText>
                      <DateRange startDate={vol.startDate} endDate={vol.endDate} />
                    </DateText>
                  )}
                </WorkHeader>
                {vol.summary && <WorkSummary>{vol.summary}</WorkSummary>}
                {vol.highlights?.length > 0 && (
                  <Highlights>
                    {vol.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </Highlights>
                )}
              </WorkItemStyled>
            ))}
          </Section>
        )}

        {awards?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.awards || 'Awards'}
            </StyledSectionTitle>
            {awards.map((award, index) => (
              <EducationItemStyled key={index}>
                <Institution>{award.title}</Institution>
                {award.awarder && <Degree>Awarded by {award.awarder}</Degree>}
                {award.date && <EducationDate>{award.date}</EducationDate>}
                {award.summary && <WorkSummary>{award.summary}</WorkSummary>}
              </EducationItemStyled>
            ))}
          </Section>
        )}

        {publications?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.publications || 'Publications'}
            </StyledSectionTitle>
            {publications.map((pub, index) => (
              <EducationItemStyled key={index}>
                <Institution>{pub.name}</Institution>
                {pub.publisher && <Degree>Published by {pub.publisher}</Degree>}
                {pub.releaseDate && <EducationDate>{pub.releaseDate}</EducationDate>}
                {pub.summary && <WorkSummary>{pub.summary}</WorkSummary>}
              </EducationItemStyled>
            ))}
          </Section>
        )}

        {languages?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.languages || 'Languages'}
            </StyledSectionTitle>
            <LanguagesList>
              {languages.map((lang, index) => (
                <LanguageItem key={index}>
                  {lang.language} {lang.fluency && `• ${lang.fluency}`}
                </LanguageItem>
              ))}
            </LanguagesList>
          </Section>
        )}

        {interests?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.interests || 'Interests'}
            </StyledSectionTitle>
            <InterestsList>
              {interests.map((interest, index) => (
                <InterestItem key={index}>{interest.name}</InterestItem>
              ))}
            </InterestsList>
          </Section>
        )}

        {references?.length > 0 && (
          <Section>
            <StyledSectionTitle>
              {resume.meta?.sectionTitles?.references || 'References'}
            </StyledSectionTitle>
            {references.map((ref, index) => (
              <EducationItemStyled key={index}>
                <Institution>{ref.name}</Institution>
                {ref.reference && <WorkSummary>{ref.reference}</WorkSummary>}
              </EducationItemStyled>
            ))}
          </Section>
        )}
      </Layout>
    </>
  )
}

export default Resume
