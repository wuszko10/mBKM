export const getTicketFormFields = (metadata, isEditMode = false) => {
    return [
        {
            name: "type",
            label: "Wybierz typ biletu",
            type: "select",
            options: metadata.ticketTypes.map((type) => ({
                label: type.label,
                value: type.id,
            })),
            required: true,
            disabled: isEditMode,
        },
        {
            name: "period",
            label: "Wybierz okres ważności",
            type: "select",
            options: metadata.ticketPeriods.map((period) => ({
                label: period.label,
                value: period.id,
            })),
            required: true,
            disabled: isEditMode,
        },
        {
            name: "lines",
            label: "Wybierz ile linii",
            type: "select",
            options: metadata.ticketLines.map((line) => ({
                label: line.label,
                value: line.id,
            })),
            required: true,
            disabled: isEditMode,
        },
        {
            name: "price",
            label: "Podaj cenę biletu",
            type: "number",
            placeholder: "Cena w zł",
            required: true,
            disabled: false,
        },
        {
            name: "offerStartDate",
            label: "Data wprowadzenia oferty",
            type: "date",
            required: true,
            disabled: isEditMode,
        },
        {
            name: "offerEndDate",
            label: "Data zakończenia oferty (nieobowiązkowe)",
            type: "date",
            required: false,
            disabled: false,
        },
    ];
};

export const getReliefFormFields = (metadata, isEditMode = false) => {
    return [
        {
            name: "name",
            label: "Nazwa ulgi",
            type: "input",
            placeholder: "Nazwa ulgi",
            disabled: false,
        },
        {
            name: "type",
            label: "Wybierz typ ulgi",
            type: "select",
            options: metadata.reliefTypes.map((type) => ({
                label: type.label,
                value: type.id,
            })),
            disabled: isEditMode,
        },
        {
            name: "ticketType",
            label: "Wybierz typ biletu",
            type: "select",
            options: metadata.ticketTypes.map((type) => ({
                label: type.label,
                value: type.id,
            })),
            disabled: isEditMode,
        },
        {
            name: "percentage",
            label: "Odpłatność (w procentach)",
            type: "number",
            placeholder: "Odpłatność",
            disabled: false,
        },
    ];
};

export const getBusStopFormFields = (isEditMode = false) => {
    return [
        {
            name: "name",
            label: "Nazwa przystanku",
            type: "input",
            placeholder: "Nazwa przystanku",
            disabled: isEditMode,
        },
        {
            name: "latitude",
            label: "Szerokość geograficzna",
            type: "number",
            placeholder: "Szerokość geograficzna",
            disabled: false,
        },
        {
            name: "longitude",
            label: "Długość geograficzna",
            type: "number",
            placeholder: "Długość geograficzna",
            disabled: false,
        },
    ];
};

export const getCreateUserFormFields = () => {
    return [
        {
            name: "firstName",
            label: "Imię",
            type: "input",
            placeholder: "Imię",
            disabled: false,
        },
        {
            name: "lastName",
            label: "Nazwisko",
            type: "input",
            placeholder: "Nazwisko",
            disabled: false,
        },
        {
            name: "email",
            label: "E-mail",
            type: "input",
            placeholder: "E-mail",
            disabled: false,
        },
        {
            name: "pesel",
            label: "PESEL",
            type: "number",
            placeholder: "PESEL",
            disabled: false,
        }
    ];
};

export const getLineFormFields = (isEditMode = false) => {
    return [
        {
            name: "number",
            label: "Numer linii",
            type: "input",
            placeholder: "Numer linii",
            required: true,
            disabled: isEditMode,
        },
        {
            name: "name",
            label: "Zwyczajowy numer/nazwa linii (nieobowiązkowe)",
            type: "input",
            placeholder: "Nazwa linii",
            required: false,
            disabled: false,
        },
    ];
};

