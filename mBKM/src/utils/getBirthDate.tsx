export const getBirthDateFromPesel = (pesel: string) => {
    if (!pesel || pesel.length !== 11) {
        throw new Error('PESEL musi mieć dokładnie 11 cyfr.');
    }

    const yearPart = parseInt(pesel.slice(0, 2), 10);
    let monthPart = parseInt(pesel.slice(2, 4), 10);
    const dayPart = parseInt(pesel.slice(4, 6), 10);

    let year;
    if (monthPart >= 1 && monthPart <= 12) {
        year = 1900 + yearPart;
    } else if (monthPart >= 21 && monthPart <= 32) {
        year = 2000 + yearPart;
        monthPart -= 20;
    } else if (monthPart >= 41 && monthPart <= 52) {
        year = 2100 + yearPart;
        monthPart -= 40;
    } else if (monthPart >= 61 && monthPart <= 72) {
        year = 2200 + yearPart;
        monthPart -= 60;
    } else if (monthPart >= 81 && monthPart <= 92) {
        year = 1800 + yearPart;
        monthPart -= 80;
    } else {
        throw new Error('Nieprawidłowy numer PESEL: Miesiąc poza dopuszczalnym zakresem.');
    }

    // Tworzenie daty
    const birthDate = new Date(year, monthPart - 1, dayPart);
    if (birthDate.getDate() !== dayPart) {
        throw new Error('PESEL zawiera nieprawidłową datę.');
    }

    return birthDate;
};
