export function calculateRemainingTime(end: Date) {

    const currentTime = new Date();
    const endDate = new Date(end);
    const timeRemaining = endDate.getTime() - currentTime.getTime();

    if (timeRemaining <= 0) {
        return false;
    }

    return new Date(currentTime.getTime() + timeRemaining).toISOString();
}
