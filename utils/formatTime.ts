export default function (timestamp: number): string {
  const date = new Date(timestamp);

  return `${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
}
