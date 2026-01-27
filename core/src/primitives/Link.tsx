import React from 'react'
import styled from 'styled-components'

/**
 * Link Component
 * Safe link component with security checks
 *
 * @component
 * @example
 * <Link href="https://example.com">Visit Site</Link>
 */

interface LinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

const StyledLink = styled.a<LinkProps>`
  color: ${(props) => (props.theme as any)?.colors?.link || 'var(--resume-color-link, #0066cc)'};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: ${(props) =>
      (props.theme as any)?.colors?.linkVisited || 'var(--resume-color-link-visited, #551a8b)'};
  }

  @media print {
    color: inherit;
    text-decoration: underline;
  }
`

export function Link({
  href,
  children,
  className,
  ...rest
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <span className={className}>{children}</span>
  }

  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <StyledLink
      href={href}
      className={`resume-link ${className || ''}`.trim()}
      {...externalProps}
      {...rest}
    >
      {children}
    </StyledLink>
  )
}

export default Link
