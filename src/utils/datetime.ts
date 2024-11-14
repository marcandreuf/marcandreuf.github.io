import { format } from 'date-fns';

export const dateFormats = {
  /** Dec 2024 */
  myDate: 'MMM, yyyy',
  /** Jan 13, 2024 */
  cardDate: 'MMM dd, yyyy',
  /** 2024-02-26 */
  isoDate: 'yyyy-MM-dd',
  /** Tue, 16th July, 9am */
  shortDate: 'do MMMM, haaa',
} as const;

export const formatDate = (date: Date): string => format(date, dateFormats.cardDate);

export const formatMYDate = (date: Date): string => format(date, dateFormats.myDate);

export const formatDateIso = (date: Date): string => format(date, dateFormats.isoDate);

export const shortDate = (date: Date): string => format(date, dateFormats.shortDate);
