const getPolishPlural = (count: number, singular: string, plural: string, pluralMany: string) => {
    if (count === 1) {
        return singular;
    } else if (count > 1 && count < 5) {
        return plural;
    } else {
        return pluralMany;
    }
};

export const formatRemainingTime = (remainingTime: number) => {
    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 1) {
        return `Ważny przez ${months} ${getPolishPlural(months, 'miesiąc', 'miesiące', 'miesięcy')}`;
    } else if (days > 1) {
        return `Ważny przez ${days} ${getPolishPlural(days, 'dzień', 'dni', 'dni')}`;
    } else if (hours > 1) {
        return `Ważny przez ${hours} ${getPolishPlural(hours, 'godzina', 'godziny', 'godzin')}`;
    } else if (minutes > 0) {
        return `Ważny przez ${minutes} ${getPolishPlural(minutes, 'minuta', 'minuty', 'minut')}`;
    } else {
        return `Ważny mniej niż minutę`;
    }
};
