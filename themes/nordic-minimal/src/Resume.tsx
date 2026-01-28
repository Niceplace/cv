import React from 'react'
import styled from 'styled-components'
// Primitive components - copied from core for compatibility
const Section = ({ children, className = '', id, ...props }: any) => (
  <section id={id} className={`resume-section ${className || ''}`.trim()} {...props}>
    {children}
  </section>
)

const SectionTitle = ({ children, icon, level = 2, className = '', ...props }: any) => (
  <h2 className={`resume-section-title ${className || ''}`.trim()} {...props}>
    {icon && (
      <span aria-hidden="true" className="resume-icon">
        {icon}
      </span>
    )}
    {children}
  </h2>
)

const DateRange = ({ startDate, endDate, className = '', ...props }: any) => {
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return 'Present'
    return dateStr // Simplified for now
  }

  const formatted = `${formatDate(startDate)} - ${formatDate(endDate)}`
  return (
    <span className={`resume-date-range ${className || ''}`.trim()} {...props}>
      {formatted}
    </span>
  )
}

const Link = ({ href, children, className = '', ...props }: any) => {
  if (!href) return <span className={className}>{children}</span>

  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a
      href={href}
      className={`resume-link ${className || ''}`.trim()}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  )
}

interface Meta {
  sectionTitles: SectionTitles
}

interface SectionTitles {
  projects: string
  education: string
  references: string
  experience: string
  contact: string
  languages: string
  interests: string
  projectSkills: string
  experienceSkills: string
}

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
  skills?: string[]
}

interface Education {
  institution?: string
  studyType?: string
  area?: string
  startDate?: string
  endDate?: string
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
  urlText?: string
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
  awards?: Award[]
  languages?: Language[]
  interests?: Interest[]
  projects?: Project[]
  meta: Meta
}

interface ResumeProps {
  resume: ResumeData
}

const ResumeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 60px;
  background: #ffffff;
  font-family:
    'Lato',
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #2c3e50;
  line-height: 1.8;

  @media print {
    padding: 40px 30px;
    max-width: 100%;
  }
`

const Header = styled.header`
  margin-bottom: 60px;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 40px;
`

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  color: #7f8c8d;
  margin: 0 0 20px 0;
`

const Summary = styled.p`
  font-size: 1rem;
  line-height: 1.9;
  color: #34495e;
  margin: 20px 0 0 0;
  font-weight: 300;
`

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 60px;

  @media print {
    gap: 40px;
  }
`

const Sidebar = styled.aside`
  padding-right: 20px;
  border-right: 1px solid #ecf0f1;
`

const MainContent = styled.main`
  min-width: 0;
`

const StyledSection = Section

const StyledSectionTitle = SectionTitle

const ExperienceItem = styled.div`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ExperienceHeader = styled.div`
  margin-bottom: 12px;
`

const Position = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 4px 0;
`

const Company = styled.div`
  font-size: 1rem;
  color: #4682b4;
  font-weight: 400;
  margin-bottom: 4px;
`

const StyledDateRange = DateRange

const Description = styled.p`
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #34495e;
  margin: 12px 0 16px 0;
  font-weight: 300;
`

const Highlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Highlight = styled.li`
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #34495e;
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
  font-weight: 300;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #4682b4;
    font-weight: 700;
  }
`

const EducationItem = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Institution = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 4px 0;
`

const Degree = styled.div`
  font-size: 0.9375rem;
  color: #7f8c8d;
  font-weight: 300;
  margin-bottom: 4px;
`

const ContactItem = styled.div`
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #34495e;
  font-weight: 300;

  &:last-child {
    margin-bottom: 0;
  }
`

const ContactLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #95a5a6;
  margin-bottom: 4px;
  font-weight: 600;
`

const ContactValue = styled.div`
  color: #2c3e50;
  word-break: break-word;
`

const InterestsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const InterestTag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #ecf0f1;
  color: #34495e;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 400;
`

const LanguageItem = styled.div`
  margin-bottom: 16px;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const LanguageName = styled.span`
  font-weight: 500;
  color: #2c3e50;
`

const LanguageFluency = styled.span`
  color: #7f8c8d;
  font-weight: 300;
  margin-left: 8px;
`

// New components for three-column project layout
const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #ecf0f1;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ProjectInfoColumn = styled.div`
  flex: 0 0 35%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    min-width: auto;
  }
`

const ProjectDescriptionColumn = styled.div`
  flex: 0 0 35%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    min-width: auto;
  }
`

const ProjectSkillsColumn = styled.div`
  flex: 0 0 30%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    min-width: auto;
  }
`

const ProjectName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 8px 0;
`

const ProjectLink = styled.a`
  font-size: 1rem;
  color: #4682b4;
  font-weight: 400;
  text-decoration: none;
  margin-bottom: 8px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`

const ProjectDate = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;
  font-weight: 300;
`

const ProjectDescription = styled.p`
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #34495e;
  margin: 0 0 16px 0;
  font-weight: 300;
`

const ProjectHighlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ProjectHighlight = styled.li`
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #34495e;
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
  font-weight: 300;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #4682b4;
    font-weight: 700;
  }
`

// Component for rendering skills with comma separators
const SkillsList = ({ skills, title }: { skills?: string[]; title: string }) => {
  if (!skills || skills.length === 0) {
    return null
  }

  return (
    <p
      style={{
        fontSize: '0.9375rem',
        lineHeight: '1.8',
        color: '#34495e',
        margin: '0 0 16px 0',
        fontWeight: 300,
      }}
    >
      <strong>{title}:</strong> {skills.join(', ')}
    </p>
  )
}

function Resume({ resume }: ResumeProps) {
  const { basics, work, education, languages, interests, projects, meta } = resume

  return (
    <ResumeContainer>
      <Header>
        {basics && (
          <>
            {basics.name && <Name>{basics.name}</Name>}
            {basics.label && <Title>{basics.label}</Title>}
            {basics.summary && <Summary>{basics.summary}</Summary>}
          </>
        )}
      </Header>

      <TwoColumnLayout>
        <Sidebar>
          {/* Contact Information */}
          {basics && (
            <StyledSection>
              <StyledSectionTitle>{meta.sectionTitles.contact}</StyledSectionTitle>

              {basics.email && (
                <ContactItem>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>
                    <Link href={`mailto:${basics.email}`}>{basics.email}</Link>
                  </ContactValue>
                </ContactItem>
              )}

              {basics.phone && (
                <ContactItem>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue>{basics.phone}</ContactValue>
                </ContactItem>
              )}

              {basics.location && (
                <ContactItem>
                  <ContactLabel>Location</ContactLabel>
                  <ContactValue>
                    {[basics.location.city, basics.location.region, basics.location.countryCode]
                      .filter(Boolean)
                      .join(', ')}
                  </ContactValue>
                </ContactItem>
              )}

              {basics.url && (
                <ContactItem>
                  <ContactLabel>Website</ContactLabel>
                  <ContactValue>
                    <Link
                      href={basics.url}
                      target={
                        basics.url?.startsWith('http://') || basics.url?.startsWith('https://')
                          ? '_blank'
                          : undefined
                      }
                    >
                      {basics.url.replace(/^https?:\/\//, '')}
                    </Link>
                  </ContactValue>
                </ContactItem>
              )}

              {basics.profiles &&
                basics.profiles.length > 0 &&
                basics.profiles.map((profile, index) => (
                  <ContactItem key={index}>
                    <ContactLabel>{profile.network}</ContactLabel>
                    <ContactValue>
                      <Link
                        href={profile.url}
                        target={
                          profile.url?.startsWith('http://') || profile.url?.startsWith('https://')
                            ? '_blank'
                            : undefined
                        }
                      >
                        {profile.network || profile.username}
                      </Link>
                    </ContactValue>
                  </ContactItem>
                ))}
            </StyledSection>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <StyledSection>
              <StyledSectionTitle>{meta.sectionTitles.languages}</StyledSectionTitle>
              {languages.map((language, index) => (
                <LanguageItem key={index}>
                  <LanguageName>{language.language}</LanguageName>
                  {language.fluency && <LanguageFluency>({language.fluency})</LanguageFluency>}
                </LanguageItem>
              ))}
            </StyledSection>
          )}

          {/* Interests */}
          {interests && interests.length > 0 && (
            <StyledSection>
              <StyledSectionTitle className="resume-section-title">
                {meta.sectionTitles.interests}
              </StyledSectionTitle>
              <InterestsList>
                {interests.map((interest, index) => (
                  <InterestTag key={index}>{interest.name}</InterestTag>
                ))}
              </InterestsList>
            </StyledSection>
          )}
        </Sidebar>

        <MainContent>
          {/* Work Experience */}
          {work && work.length > 0 && (
            <StyledSection>
              <StyledSectionTitle className="resume-section-title">
                {meta.sectionTitles.experience}
              </StyledSectionTitle>
              {work.map((job, index) => (
                <ExperienceItem key={index}>
                  <ExperienceHeader>
                    {job.position && <Position>{job.position}</Position>}
                    {job.name && <Company>{job.name}</Company>}
                    <StyledDateRange startDate={job.startDate} endDate={job.endDate} />
                  </ExperienceHeader>

                  {job.summary && (
                    <Description>
                      {job.summary}
                      {job.skills?.length > 0 && (
                        <SkillsList
                          skills={job.skills}
                          title={meta.sectionTitles.experienceSkills}
                        />
                      )}
                    </Description>
                  )}

                  {job.highlights && job.highlights.length > 0 && (
                    <Highlights>
                      {job.highlights.map((highlight, i) => (
                        <Highlight key={i}>{highlight}</Highlight>
                      ))}
                    </Highlights>
                  )}

                  {job.skills && job.skills.length > 0 && (
                    <div className="job-skills">
                      <h4 className="job-skills-title">Skills</h4>
                      <div className="job-skills-content">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </ExperienceItem>
              ))}
            </StyledSection>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <StyledSection>
              <StyledSectionTitle className="resume-section-title">
                {meta.sectionTitles.education}
              </StyledSectionTitle>
              {education.map((edu, index) => (
                <EducationItem key={index}>
                  {edu.institution && <Institution>{edu.institution}</Institution>}
                  {edu.studyType && edu.area && (
                    <Degree>
                      {edu.studyType} in {edu.area}
                    </Degree>
                  )}
                  <StyledDateRange startDate={edu.startDate} endDate={edu.endDate} />
                </EducationItem>
              ))}
            </StyledSection>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <StyledSection>
              <StyledSectionTitle className="resume-section-title">
                {meta.sectionTitles.projects}
              </StyledSectionTitle>
              {projects.map((project, index) => (
                <ProjectContainer key={index}>
                  {/* Column 1: Project name, link, and date */}
                  <ProjectInfoColumn>
                    {project.name && <ProjectName>{project.name}</ProjectName>}
                    {project.url && project.urlText && (
                      <ProjectLink
                        href={project.url}
                        target={
                          project.url?.startsWith('http://') || project.url?.startsWith('https://')
                            ? '_blank'
                            : undefined
                        }
                      >
                        {project.urlText}
                      </ProjectLink>
                    )}
                    <ProjectDate>
                      <StyledDateRange startDate={project.startDate} endDate={project.endDate} />
                    </ProjectDate>
                  </ProjectInfoColumn>

                  {/* Column 2: Project description and highlights */}
                  <ProjectDescriptionColumn>
                    {project.description && (
                      <ProjectDescription>{project.description}</ProjectDescription>
                    )}
                    {project.highlights?.length > 0 && (
                      <ProjectHighlights>
                        {project.highlights.map((highlight, i) => (
                          <ProjectHighlight key={i}>{highlight}</ProjectHighlight>
                        ))}
                      </ProjectHighlights>
                    )}
                  </ProjectDescriptionColumn>

                  {/* Column 3: Skills used */}
                  <ProjectSkillsColumn>
                    <SkillsList skills={project.skills} title={meta.sectionTitles.projectSkills} />
                  </ProjectSkillsColumn>
                </ProjectContainer>
              ))}
            </StyledSection>
          )}
        </MainContent>
      </TwoColumnLayout>
    </ResumeContainer>
  )
}

export default Resume
