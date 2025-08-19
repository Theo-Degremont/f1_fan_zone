
export function formatLapTime(lapTime: number): string {
  if (!lapTime || lapTime <= 0) return '--:--.---';
  
  const totalSeconds = lapTime / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}


export function formatRaceDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
