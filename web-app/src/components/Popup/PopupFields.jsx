export const getTicketFormFields = (metadata) => {
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
        },
        {
            name: "price",
            label: "Podaj cenę biletu",
            type: "number",
            placeholder: "Cena w zł",
            required: true,
        },
        {
            name: "offerStartDate",
            label: "Data wprowadzenia oferty",
            type: "date",
            required: true,
        },
        {
            name: "offerEndDate",
            label: "Data zakończenia oferty (nieobowiązkowe)",
            type: "date",
            required: false,
        },
    ];
};

export const getReliefFormFields = (metadata) => {
    return [
        {
            name: "name",
            label: "Nazwa ulgi",
            type: "input",
            placeholder: "Nazwa ulgi",
        },
        {
            name: "type",
            label: "Wybierz typ ulgi",
            type: "select",
            options: metadata.reliefTypes.map((type) => ({
                label: type.label,
                value: type.id,
            })),
        },
        {
            name: "ticketType",
            label: "Wybierz typ biletu",
            type: "select",
            options: metadata.ticketTypes.map((type) => ({
                label: type.label,
                value: type.id,
            })),
        },
        {
            name: "percentage",
            label: "Odpłatność (w procentach)",
            type: "number",
            placeholder: "Odpłatność",
        },
    ];
};

export const getBusStopFormFields = () => {
    return [
        {
            name: "name",
            label: "Nazwa przystanku",
            type: "input",
            placeholder: "Nazwa przystanku",
        },
        {
            name: "longitude",
            label: "Długość geograficzna",
            type: "number",
            placeholder: "Długość geograficzna",
        },
        {
            name: "latitude",
            label: "Szerokość geograficzna",
            type: "number",
            placeholder: "Szerokość geograficzna",
        }
    ];
};

export const getCreateUserFormFields = () => {
    return [
        {
            name: "firstName",
            label: "Imię",
            type: "input",
            placeholder: "Imię",
        },
        {
            name: "lastName",
            label: "Nazwisko",
            type: "input",
            placeholder: "Nazwisko",
        },
        {
            name: "email",
            label: "E-mail",
            type: "input",
            placeholder: "E-mail",
        },
        {
            name: "pesel",
            label: "PESEL",
            type: "number",
            placeholder: "PESEL",
        }
    ];
};

export const getLineFormFields = () => {
    return [
        {
            name: "number",
            label: "Numer linii",
            type: "input",
            placeholder: "Numer linii",
            required: true,
        },
        {
            name: "name",
            label: "Zwyczajowy numer/nazwa linii (nieobowiązkowe)",
            type: "input",
            placeholder: "Nazwa linii",
            required: false,
        },
    ];
};

