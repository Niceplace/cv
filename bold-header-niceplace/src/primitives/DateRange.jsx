import React from 'react';
import styled from 'styled-components';

export function formatDateRange({
  startDate,
  endDate,
  format = 'short',
  locale = 'en-US',
  numberingSystem,
  presentLabel,
}) {
  if (!startDate) return '';

  const getPresentLabel = () => {
    if (presentLabel) return presentLabel;

    const labels = {
      en: 'Present',
      'en-US': 'Present',
      'en-GB': 'Present',
      fr: 'Présent',
      'fr-FR': 'Présent',
      es: 'Presente',
      'es-ES': 'Presente',
      de: 'Heute',
      'de-DE': 'Heute',
      it: 'Presente',
      'it-IT': 'Presente',
      pt: 'Presente',
      'pt-BR': 'Presente',
      ja: '現在',
      'ja-JP': '現在',
      zh: '至今',
      'zh-CN': '至今',
      'zh-TW': '至今',
      ko: '현재',
      'ko-KR': '현재',
      ar: 'حاضر',
      'ar-SA': 'حاضر',
    };

    return labels[locale] || labels[locale.split('-')[0]] || 'Present';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return getPresentLabel();

    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

    if (isNaN(date.getTime())) return dateStr;

    const monthFormats = {
      short: { month: 'short' },
      long: { month: 'long' },
      numeric: { month: '2-digit' },
    };

    const options = {
      ...monthFormats[format],
      year: 'numeric',
    };

    if (numberingSystem) {
      options.numberingSystem = numberingSystem;
    }

    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  return `${start} - ${end}`;
}

const StyledDateRange = styled.span`
  font-size: 10pt;
  color: #666;
  white-space: nowrap;
`;

export function DateRange({
  startDate,
  endDate,
  format = 'short',
  locale = 'en-US',
  numberingSystem,
  presentLabel,
  className,
  ...rest
}) {
  const formatted = formatDateRange({
    startDate,
    endDate,
    format,
    locale,
    numberingSystem,
    presentLabel,
  });

  if (!formatted) return null;

  return (
    <StyledDateRange
      className={`resume-date-range ${className || ''}`.trim()}
      {...rest}
    >
      {formatted}
    </StyledDateRange>
  );
}

export default DateRange;
