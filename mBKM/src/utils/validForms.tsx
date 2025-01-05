export const CARD_NUMBER_REGEX = /^(?:\d{4} ?){3}\d{4}$/;
export const EXPIRY_DATE_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
export const CVV_REGEX = /^\d{3,4}$/;

export const PESEL_REGEX = /^[0-9]{2}((0[1-9]|1[0-2])|(2[1-9]|3[0-2]))(0[1-9]|1[0-9]|2[0-9]|3[01])[0-9]{5}$/gm;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const POSTAL_CODE_REGEX = /^\d{2}-\d{3}$/;

export const formatPostalCode = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');
    return cleaned.replace(/(\d{2})(\d{3})/, '$1-$2').trim();
};

export const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

export const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');
    return cleaned.replace(/(\d{2})(\d{1,2})?/, (match, p1, p2) => (p2 ? `${p1}/${p2}` : p1));

};
