import React from 'react'
import styled from 'styled-components'
import { Section, SectionTitle } from '../../../../core/src/index'

interface ResumeData {
  $schema?: string
  basics: {
    name: string
    label?: string
    image?: string
    email?: string
    phone?: string
    url?: string
    summary?: string
    location?: {
      address?: string
      postalCode?: string
      city?: string
      countryCode?: string
      region?: string
    }
    profiles?: Array<{
      network?: string
      username?: string
      url?: string
    }>
  }
  work?: Array<{
    name?: string
    position?: string
    url?: string
    startDate?: string
    endDate?: string
    summary?: string
    highlights?: string[]
    location?: string
    skills?: Array<{
      name?: string
      keywords?: string[]
    }>
  }>
  volunteer?: Array<{
    organization?: string
    position?: string
    url?: string
    startDate?: string
    endDate?: string
    summary?: string
    highlights?: string[]
  }>
  education?: Array<{
    institution?: string
    url?: string
    area?: string
    studyType?: string
    startDate?: string
    endDate?: string
    score?: string
    courses?: string[]
    summary?: string
  }>
  awards?: Array<{
    title?: string
    date?: string
    awarder?: string
    summary?: string
  }>
  certificates?: Array<{
    name?: string
    date?: string
    issuer?: string
    url?: string
  }>
  publications?: Array<{
    name?: string
    publisher?: string
    releaseDate?: string
    url?: string
    summary?: string
  }>
  skills?: Array<{
    name?: string
    keywords?: string[]
  }>
  languages?: Array<{
    language?: string
    fluency?: string
  }>
  interests?: Array<{
    name?: string
    keywords?: string[]
  }>
  references?: Array<{
    name?: string
    reference?: string
  }>
  projects?: Array<{
    name?: string
    description?: string
    url?: string
    startDate?: string
    endDate?: string
    highlights?: string[]
    technologies?: string[]
  }>
}

const Layout = styled.div`
  max-width: 800px;
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

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 2px solid #e5e7eb;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Name = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
`

const Label = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-weight: 400;
`

const Location = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  font-family: 'Courier New', monospace;
`

const ContactButtons = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;

  @media print {
    display: none;
  }
`

const ContactLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`

const PrintContact = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;

  @media print {
    display: flex;
  }
`

const AvatarWrapper = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #9ca3af;
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const WorkCard = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;

  &:last-child {
    margin-bottom: 0;
  }
`

const WorkHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const CompanyName = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const WorkDate = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-family: 'Courier New', monospace;
  font-weight: 400;
`

const WorkTitle = styled.h4`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
  font-family: 'Courier New', monospace;
`

const WorkContent = styled.div`
  font-size: 12px;
  color: #4b5563;
  line-height: 1.6;
`

const WorkHighlights = styled.ul`
  margin: 12px 0 0 0;
  padding-left: 20px;
  list-style-type: disc;

  li {
    margin: 4px 0;
    color: #4b5563;
  }
`

const Hero = ({ basics }: { basics: ResumeData['basics'] }) => {
  if (!basics) return null

  return (
    <Header>
      <HeaderContent>
        <Name>{basics.name}</Name>
        {basics.label && <Label>{basics.label}</Label>}
        {basics.location && (
          <Location>
            {basics.location.city && basics.location.city}
            {basics.location.city && basics.location.countryCode && ', '}
            {basics.location.countryCode && basics.location.countryCode}
          </Location>
        )}
        <ContactButtons>
          {basics.email && <ContactLink href={`mailto:${basics.email}`}>Email</ContactLink>}
          {basics.email && basics.phone && ' • '}
          {basics.phone && <ContactLink href={`tel:${basics.phone}`}>Phone</ContactLink>}
          {basics.profiles?.map((social, i) => (
            <span key={i}>
              {(basics.email || basics.phone || i > 0) && ' • '}
              <ContactLink href={social.url} target="_blank" rel="noopener noreferrer">
                {social.network}
              </ContactLink>
            </span>
          ))}
        </ContactButtons>
        <PrintContact>
          {basics.email && (
            <ContactLink href={`mailto:${basics.email}`}>{basics.email}</ContactLink>
          )}
          {basics.phone && <ContactLink href={`tel:${basics.phone}`}>{basics.phone}</ContactLink>}
        </PrintContact>
      </HeaderContent>
      {basics.image && (
        <AvatarWrapper>
          <AvatarImage src={basics.image} alt={basics.name} />
        </AvatarWrapper>
      )}
    </Header>
  )
}

const About = ({ basics }: { basics: ResumeData['basics'] }) => {
  if (!basics?.summary) return null

  return (
    <Section>
      <SectionTitle>About</SectionTitle>
      <WorkContent>{basics.summary}</WorkContent>
    </Section>
  )
}

const Work = ({ work }: { work: ResumeData['work'] }) => {
  if (!work?.length) return null

  return (
    <Section>
      <SectionTitle>Work Experience</SectionTitle>
      {work.map((w, index) => (
        <WorkCard key={index}>
          <WorkHeader>
            <CompanyName href={w.url || '#'} target="_blank" rel="noopener noreferrer">
              {w.name}
            </CompanyName>
            <WorkDate>
              {w.startDate} - {w.endDate || 'Present'}
            </WorkDate>
          </WorkHeader>
          {w.position && <WorkTitle>{w.position}</WorkTitle>}
          <WorkContent>
            {w.summary && <p>{w.summary}</p>}
            {w.highlights?.length > 0 && (
              <WorkHighlights>
                {w.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </WorkHighlights>
            )}
            {w.skills && w.skills.length > 0 && (
              <WorkContent>
                <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                  {w.skills.map((skillCategory, index) => (
                    <div key={index} style={{ marginBottom: index < w.skills.length - 1 ? '12px' : '0' }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                        {skillCategory.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#4b5563' }}>
                        {skillCategory.keywords.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </WorkContent>
            )}
          </WorkContent>
        </WorkCard>
      ))}
    </Section>
  )
}

const Education = ({ education }: { education: ResumeData['education'] }) => {
  if (!education?.length) return null

  return (
    <Section>
      <SectionTitle>Education</SectionTitle>
      {education.map((edu, index) => (
        <WorkCard key={index}>
          <WorkHeader>
            <CompanyName>{edu.institution}</CompanyName>
            <WorkDate>
              {edu.startDate} - {edu.endDate || 'Present'}
            </WorkDate>
          </WorkHeader>
          {edu.area && (
            <WorkTitle>
              {edu.studyType} in {edu.area}
            </WorkTitle>
          )}
          {edu.score && <WorkContent>Score: {edu.score}</WorkContent>}
        </WorkCard>
      ))}
    </Section>
  )
}

const Projects = ({ projects }: { projects: ResumeData['projects'] }) => {
  if (!projects?.length) return null

  return (
    <Section>
      <SectionTitle>Projects</SectionTitle>
      {projects.map((project, index) => (
        <WorkCard key={index}>
          <WorkHeader>
            <CompanyName href={project.url || '#'} target="_blank" rel="noopener noreferrer">
              {project.name}
            </CompanyName>
          </WorkHeader>
          {project.description && <WorkContent>{project.description}</WorkContent>}
          {project.highlights?.length > 0 && (
            <WorkHighlights>
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </WorkHighlights>
          )}
        </WorkCard>
      ))}
    </Section>
  )
}

const Resume = ({ resume }: { resume: ResumeData }) => {
  return (
    <Layout>
      <Hero basics={resume.basics} />
      <About basics={resume.basics} />
      <Work work={resume.work} />
      <Education education={resume.education} />
      <Projects projects={resume.projects} />
    </Layout>
  )
}

export default Resume
