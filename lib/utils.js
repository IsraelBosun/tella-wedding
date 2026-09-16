const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

/**
 * Month names are spelled out rather than read from toLocaleString, because the
 * server and the visitor's browser do not necessarily agree on a locale and a
 * disagreement here would be a hydration mismatch on the date of the wedding.
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: MONTHS[date.getMonth()].slice(0, 3).toUpperCase(),
    year: date.getFullYear().toString(),
  };
}

/** The spelled-out form used by the event card and the revealed scratch line. */
export function formatEventDate(dateString) {
  const date = new Date(dateString);
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    long: `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    short: `${MONTHS[date.getMonth()].toUpperCase()} ${date.getDate()} · ${date.getFullYear()}`,
    weekday: WEEKDAYS[date.getDay()],
    time: `${hours12}:${minutes} ${hours24 < 12 ? 'AM' : 'PM'}`,
  };
}

export function calculateCountdown(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
