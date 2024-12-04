export const getCreateTicketFormFields = (metadata) => {
    return [
        {
            name: "type",
            label: "Wybierz typ biletu",
            type: "select",
            options: metadata.ticketTypes.map((type) => ({
                label: type.label,
                value: type.id,
            })),
        },
        {
            name: "period",
            label: "Wybierz okres ważności",
            type: "select",
            options: metadata.ticketPeriods.map((period) => ({
                label: period.label,
                value: period.id,
            })),
        },
        {
            name: "lines",
            label: "Wybierz ile linii",
            type: "select",
            options: metadata.ticketLines.map((line) => ({
                label: line.label,
                value: line.id,
            })),
        },
        {
            name: "price",
            label: "Podaj cenę biletu",
            type: "number",
            placeholder: "Cena w zł",
        },
        {
            name: "offerStartDate",
            label: "Data wprowadzenia ceny",
            type: "date",
        },
    ];
};
