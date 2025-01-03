export const isFormValid = (formData, formFields) => {
    const requiredFields = formFields.filter((field) => field.required).map((field) => field.name);
    return requiredFields.every((field) => formData[field] !== "");
};


const setEndDate = (offerEndDate) => {
    const date = new Date(offerEndDate);
    date.setHours(23, 59, 59, 999);
    return date;
}

const setStartDate = (startDate) => {
    const date = new Date(startDate);
    date.setHours(0,0,0,0);
    return date;
}

export const isValidDate = (formData, oldTicket, editMode, duplicateMode, cancelMode) => {
    const offerStartDate = setStartDate(formData.offerStartDate);
    const currentDate = setStartDate(Date.now());

    if (editMode || cancelMode) {

        if (duplicateMode) {
            console.log("tuttt");
            const endDateCheck = new Date(oldTicket.offerEndDate);
            if (offerStartDate.toISOString() <= endDateCheck.toISOString()) {
                alert(`Data musi być późniejsza niż obowiązująca oferta.\n\nAktualnie oferta ważna jest do: ${endDateCheck.toLocaleString()}\nWybrana data: ${offerStartDate.toLocaleString()}`);
                return false;
            }
        }

    } else {
        if (currentDate.getTime() > offerStartDate.getTime()) {
            alert(`Data rozpoczęcia oferty nie może być późniejsza niż bieżący dzień.\n\nAktualna data: ${currentDate.toLocaleString()}\nWybrana data: ${offerStartDate.toLocaleString()}`);
            return false;
        }


    }

    formData.offerStartDate = offerStartDate;

    if (formData.offerEndDate && formData.offerEndDate !== '') {
        formData.offerEndDate = setEndDate(formData.offerEndDate);
    }

    return true;
};
