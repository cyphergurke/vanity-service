export function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export const calculateRestTime = (futureTimestamp: number): { minutes: number, seconds: number } => {
    const now = Date.now();
    const millisecondsDiff = futureTimestamp * 1000 - now;
    if (millisecondsDiff < 0) {
        return { minutes: 0, seconds: 0 };
    }
    let remaining = millisecondsDiff / 1000;
    const days = Math.floor(remaining / 86400);
    remaining %= 86400;
    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return { minutes, seconds };
};


export const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Formatierung in "YYYY-MM-DD"
};