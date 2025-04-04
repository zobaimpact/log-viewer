export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  
  export function formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }