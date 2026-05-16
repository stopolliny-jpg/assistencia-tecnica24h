export function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export function formatTime(time: string): string {
  return time.substring(0, 5);
}

export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
