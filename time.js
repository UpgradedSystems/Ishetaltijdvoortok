export const TIME_ZONE = 'Europe/Amsterdam';
const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
function parts(date) {
  return Object.fromEntries(formatter.formatToParts(date).filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
}
function localToUtc(year, month, day, hour, minute) {
  const wall = Date.UTC(year, month - 1, day, hour, minute);
  let instant = wall;
  for (let i = 0; i < 3; i++) {
    const p = parts(new Date(instant));
    instant += wall - Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  }
  return instant;
}
export function getTokState(now = new Date()) {
  const p = parts(now);
  const calendar = new Date(Date.UTC(p.year, p.month - 1, p.day));
  const weekday = calendar.getUTCDay();
  const friday = weekday === 5;
  const party = friday && p.hour * 60 + p.minute >= 16 * 60 + 30;
  calendar.setUTCDate(calendar.getUTCDate() + (5 - weekday + 7) % 7);
  const target = localToUtc(calendar.getUTCFullYear(), calendar.getUTCMonth() + 1, calendar.getUTCDate(), 16, 30);
  const seconds = party ? 0 : Math.max(0, Math.ceil((target - now.getTime()) / 1000));
  return { friday, party, target, seconds, days: Math.floor(seconds / 86400), hours: Math.floor(seconds % 86400 / 3600), minutes: Math.floor(seconds % 3600 / 60), remainder: seconds % 60 };
}
