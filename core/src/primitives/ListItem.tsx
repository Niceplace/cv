import React from 'react'
import styled from 'styled-components'

/**
 * ListItem Component
 * Experience/Education item with consistent structure
 * Perfect for work experience, education, projects, etc.
 *
 * @component
 * @example
 * <ListItem
 *   title="Senior Software Engineer"
 *   subtitle="Acme Corp"
 *   dateRange="Jan 2020 - Present"
 *   location="San Francisco, CA"
 *   description="Led development of microservices architecture"
 *   highlights={['Led team of 5', 'Increased performance by 40%']}
 * />
 */

interface ListItemProps {
  title?: string
  subtitle?: string
  dateRange?: string
  location?: string
  description?: string
  highlights?: string[]
  className?: string
  [key: string]: unknown
}

const ItemContainer = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  margin-bottom: ${(props) =>
    (props.theme as any)?.spacing?.item || 'var(--resume-space-item, 1rem)'};

  @media print {
    break-inside: avoid;
  }
`

const ItemHeader = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
`

const ItemTitle = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  font-weight: 600;
  color: ${(props) => (props.theme as any)?.colors?.primary || 'var(--resume-color-primary, #000)'};
  font-size: ${(props) =>
    (props.theme as any)?.typography?.body || 'var(--resume-size-body, 11pt)'};
`

const ItemSubtitle = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  color: ${(props) =>
    (props.theme as any)?.colors?.secondary || 'var(--resume-color-secondary, #333)'};
  margin-bottom: 4px;
`

const ItemMeta = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  gap: 12px;
  font-size: ${(props) =>
    (props.theme as any)?.typography?.small || 'var(--resume-size-small, 10pt)'};
  color: ${(props) =>
    (props.theme as any)?.colors?.tertiary || 'var(--resume-color-tertiary, #666)'};
  margin-bottom: 8px;
`

const Description = styled.p<React.HTMLAttributes<HTMLParagraphElement>>`
  margin: 8px 0;
  line-height: 1.6;
`

const Highlights = styled.ul<React.HTMLAttributes<HTMLUListElement>>`
  margin: 8px 0;
  padding-left: 20px;
  list-style-type: disc;

  li {
    margin: 4px 0;
    line-height: 1.5;
  }
`

export function ListItem({
  title,
  subtitle,
  dateRange,
  location,
  description,
  highlights = [],
  className,
  ...rest
}: ListItemProps & React.HTMLAttributes<HTMLDivElement>) {
  if (!title) return null

  const metaItems = [dateRange, location].filter(Boolean)

  return (
    <ItemContainer className={`resume-item ${className || ''}`.trim()} {...rest}>
      <ItemHeader className="resume-item-header">
        <ItemTitle className="resume-item-title">{title}</ItemTitle>
      </ItemHeader>

      {subtitle && <ItemSubtitle className="resume-item-subtitle">{subtitle}</ItemSubtitle>}

      {metaItems.length > 0 && (
        <ItemMeta className="resume-item-meta">
          {dateRange && <span className="resume-date">{dateRange}</span>}
          {dateRange && location && <span>•</span>}
          {location && <span className="resume-location">{location}</span>}
        </ItemMeta>
      )}

      {description && <Description className="resume-description">{description}</Description>}

      {highlights.length > 0 && (
        <Highlights className="resume-highlights">
          {highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </Highlights>
      )}
    </ItemContainer>
  )
}

export default ListItem
