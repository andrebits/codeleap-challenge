export function timeAgo(dateInput: string): string {
    
    const date = new Date(dateInput);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return `${diffSec} second${diffSec !== 1 ? "s" : ""} ago`;
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
    if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
}
