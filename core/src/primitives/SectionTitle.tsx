import React from 'react'
import styled from 'styled-components'

/**
 * SectionTitle Component
 * Styled heading for resume sections with optional icon and accent border
 *
 * @component
 * @example
 * <SectionTitle icon="💼">Work Experience</SectionTitle>
 * <SectionTitle level="h3">Projects</SectionTitle>
 */

const StyledTitle = styled.h2<React.HTMLAttributes<HTMLHeadingElement>>`
  font-size: ${(props) => (props.theme as any)?.typography?.heading || 'var(--resume-size-heading, 16pt)'};
  font-weight: 600;
  color: ${(props) => (props.theme as any)?.colors?.primary || 'var(--resume-color-primary, #000)'};
  margin: 0 0 ${(props) => (props.theme as any)?.spacing?.item || 'var(--resume-space-item, 1rem)'} 0;
  padding-bottom: 4px;
  border-bottom: 2px solid
    ${(props) => (props.theme as any)?.colors?.accent || 'var(--resume-color-accent, #0066cc)'};

  @media print {
    break-inside: avoid;
  }
`

const Icon = styled.span`
  margin-right: 8px;
  font-size: 1.2em;
`

interface SectionTitleProps {
  children: React.ReactNode
  icon?: string
  level?: number
  className?: string
  [key: string]: unknown
}

export function SectionTitle({ children, icon, level = 2, className, ...rest }: SectionTitleProps) {
  return (
    <StyledTitle
      as={`h${level}` as any}
      className={`resume-section-title ${className || ''}`.trim()}
      {...rest}
    >
      {icon && (
        <Icon aria-hidden="true" className="resume-icon">
          {icon}
        </Icon>
      )}
      {children}
    </StyledTitle>
  )
}

export default SectionTitle
