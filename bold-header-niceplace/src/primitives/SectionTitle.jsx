import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  font-size: 16pt;
  font-weight: 600;
  color: #000;
  margin: 0 0 1rem 0;
  padding-bottom: 4px;
  border-bottom: 2px solid #0066cc;

  @media print {
    page-break-after: avoid;
  }
`;

const Icon = styled.span`
  margin-right: 8px;
  font-size: 1.2em;
`;

export function SectionTitle({
  children,
  icon,
  level = 2,
  className,
  ...rest
}) {
  return (
    <StyledTitle
      as={`h${level}`}
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
  );
}

export default SectionTitle;
