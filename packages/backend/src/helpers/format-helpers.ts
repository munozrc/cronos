export function timeToSeconds(time: string): number {
  const parts = time.split(":").map((part) => parseInt(part, 10));
  if (parts.length !== 2 || parts.some(isNaN)) return 0;
  const [minutes, seconds] = parts;
  return minutes * 60 + seconds;
}
