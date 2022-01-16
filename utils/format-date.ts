export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toString().slice(0, 10);
}
