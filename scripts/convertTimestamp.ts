export function convertTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    const formattedDate = date.toLocaleDateString('de-DE', options) + ', ' + date.toLocaleTimeString('de-DE', options);
    return formattedDate;
}


export const calculateRestTime = (futureTimestamp: number): {minutes: number, seconds: number} => {
    const now = Date.now();
    const millisecondsDiff = futureTimestamp * 1000 - now;
    if (millisecondsDiff < 0) {
        return {minutes: 0, seconds: 0};
    }
    let remaining = millisecondsDiff / 1000;
    const days = Math.floor(remaining / 86400);
    remaining %= 86400;
    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return {minutes, seconds};
};
