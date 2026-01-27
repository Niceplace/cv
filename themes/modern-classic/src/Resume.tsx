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
  keywords: string[]
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
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 2px solid #e5e7eb;
`

const Name = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`

const Label = styled.div`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 20px;
  font-weight: 500;
`

const StyledContactInfo = styled(ContactInfo)`
  font-size: 15px;

  a {
    font-size: 15px;
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
  margin: 40px 0 24px 0;
  padding-bottom: 8px;
  border-bottom: 3px solid #0066cc;
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
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`

const Position = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

const Company = styled.div`
  font-size: 16px;
  color: #0066cc;
  font-weight: 500;
  margin-top: 4px;
`

const DateText = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
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
  gap: 16px;
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
  gap: 12px;
  justify-content: center;
`

const InterestItem = styled.li`
  font-size: 14px;
  color: #6b7280;
  
  &:not(:last-child)::after {
    content: "•";
    margin-left: 12px;
    color: #d1d5db;
  }
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  @media print {
    break-inside: avoid;
  }
`

const SkillCategory = styled.div`
  padding: 16px;
  background: #f3f4f6;
  border-radius: 6px;
  border-left: 3px solid #0066cc;

  @media print {
    break-inside: avoid;
  }
`

const SkillName = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`

const SkillTags = styled.div`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
`

interface ResumeProps {
  resume: Partial<ResumeData>
}

function Resume({ resume }: ResumeProps) {
  const {
    basics,
    work = [],
    education = [],
    skills = [],
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
          <Name>{basics?.name}</Name>
          {basics?.label && <Label>{basics.label}</Label>}
          <StyledContactInfo basics={basics} />
          {basics?.summary && <Summary>{basics.summary}</Summary>}
        </Header>

      {work?.length > 0 && (
        <Section className="first-section">
          <StyledSectionTitle>Experience</StyledSectionTitle>
          {work.map((job, index) => (
            <WorkItemStyled key={index}>
              <WorkHeader>
                <div>
                  <Position>{job.position}</Position>
                  {job.name && <Company>{job.name}</Company>}
                </div>
                <DateText>
                  <DateRange startDate={job.startDate} endDate={job.endDate} />
                </DateText>
              </WorkHeader>
              {job.summary && <WorkSummary>{job.summary}</WorkSummary>}
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

      {skills?.length > 0 && (
        <Section>
          <StyledSectionTitle>Skills</StyledSectionTitle>
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillCategory key={index}>
                <SkillName>{skill.name}</SkillName>
                {skill.keywords?.length > 0 && <SkillTags>{skill.keywords.join(', ')}</SkillTags>}
              </SkillCategory>
            ))}
          </SkillsGrid>
        </Section>
      )}

      {education?.length > 0 && (
        <Section>
          <StyledSectionTitle>Education</StyledSectionTitle>
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
          <StyledSectionTitle>Projects</StyledSectionTitle>
          {projects.map((project, index) => (
            <WorkItemStyled key={index}>
              <WorkHeader>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <Position style={{ flex: '1' }}>{project.name}</Position>
                  {project.url && (
                    <span style={{ fontSize: '14px', color: '#0066cc', whiteSpace: 'nowrap' }}>
                      <img 
                        src="https://slackmojis.com/emojis/8712-github/download" 
                        alt="GitHub" 
                        style={{ 
                          width: '14px', 
                          height: '14px', 
                          verticalAlign: 'middle',
                          marginRight: '2px',
                          display: 'inline-block'
                        }} 
                      />
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ fontSize: 'inherit' }}
                      >
                        {new URL(project.url).pathname.split('/').pop()}
                      </a>
                    </span>
                  )}
                </div>
              </WorkHeader>
              {project.description && <WorkSummary>{project.description}</WorkSummary>}
              {project.highlights?.length > 0 && (
                <Highlights>
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </Highlights>
              )}
            </WorkItemStyled>
          ))}
        </Section>
      )}

      {volunteer?.length > 0 && (
        <Section>
          <StyledSectionTitle>Volunteer</StyledSectionTitle>
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
          <StyledSectionTitle>Awards</StyledSectionTitle>
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
          <StyledSectionTitle>Publications</StyledSectionTitle>
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
          <StyledSectionTitle>Languages</StyledSectionTitle>
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
          <StyledSectionTitle>Interests</StyledSectionTitle>
          <InterestsList>
            {interests.map((interest, index) => (
              <InterestItem key={index}>
                {interest.name}
              </InterestItem>
            ))}
          </InterestsList>
        </Section>
      )}

      {references?.length > 0 && (
        <Section>
          <StyledSectionTitle>References</StyledSectionTitle>
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
