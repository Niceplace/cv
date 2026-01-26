import React from 'react';
import styled from 'styled-components';
import { safeUrl } from '../utils/security.js';

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 10pt;
  color: #333;

  a {
    color: #0066cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Separator = styled.span`
  color: #999;
`;

export function ContactInfo({ basics = {}, separator = '•', className }) {
  const { email, phone, url, location, profiles = [] } = basics;

  const items = [];

  if (email) {
    items.push(
      <ContactItem key="email">
        <a href={safeUrl(`mailto:${email}`)} aria-label="Email">
          {email}
        </a>
      </ContactItem>
    );
  }

  if (phone) {
    items.push(
      <ContactItem key="phone">
        <a href={safeUrl(`tel:${phone}`)} aria-label="Phone">
          {phone}
        </a>
      </ContactItem>
    );
  }

  if (location) {
    const locationStr = [location.city, location.region, location.countryCode]
      .filter(Boolean)
      .join(', ');
    if (locationStr) {
      items.push(
        <ContactItem key="location" aria-label="Location">
          {locationStr}
        </ContactItem>
      );
    }
  }

  if (url) {
    const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    items.push(
      <ContactItem key="url">
        <a
          href={safeUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
        >
          {displayUrl}
        </a>
      </ContactItem>
    );
  }

  profiles.forEach((profile, index) => {
    if (profile.url) {
      items.push(
        <ContactItem key={`profile-${index}`}>
          <a
            href={safeUrl(profile.url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profile.network}
          >
            {profile.network || profile.username}
          </a>
        </ContactItem>
      );
    }
  });

  if (items.length === 0) return null;

  return (
    <ContactContainer className={`resume-contact ${className || ''}`.trim()}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Separator aria-hidden="true">{separator}</Separator>}
          {item}
        </React.Fragment>
      ))}
    </ContactContainer>
  );
}

export default ContactInfo;
