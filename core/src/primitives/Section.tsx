import React from 'react'
import styled from 'styled-components'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  [key: string]: unknown
}

/**
 * Section Component
 * Semantic <section> wrapper for resume sections with consistent spacing
 *
 * @component
 * @example
 * <Section id="work-experience">
 *   <SectionTitle>Work Experience</SectionTitle>
 *   <ListItem {...jobData} />
 * </Section>
 */

const StyledSection = styled.section<SectionProps>`
  margin-bottom: ${(props) =>
    (props.theme as any)?.spacing?.section || 'var(--resume-space-section, 2rem)'};

  @media print {
    break-inside: avoid;
  }
`

export function Section({
  children,
  className,
  id,
  ...rest
}: SectionProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <StyledSection id={id} className={`resume-section ${className || ''}`.trim()} {...rest}>
      {children}
    </StyledSection>
  )
}

export default Section
