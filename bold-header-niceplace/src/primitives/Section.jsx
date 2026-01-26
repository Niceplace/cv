import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  margin-bottom: 2rem;

  @media print {
    page-break-inside: avoid;
  }
`;

export function Section({ children, className, id, ...rest }) {
  return (
    <StyledSection
      id={id}
      className={`resume-section ${className || ''}`.trim()}
      {...rest}
    >
      {children}
    </StyledSection>
  );
}

export default Section;
