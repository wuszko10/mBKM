import {render, screen} from "@testing-library/react";
import GlobalPopupForm from "../components/GlobalPopupForm/GlobalPopupForm";

export const renderGlobalForm = (formData, formFields) => {
    return render(
        <GlobalPopupForm
            isOpen={true}
            onClose={() => {}}
            title="Test Form"
            formData={formData}
            handleInputChange={() => {}}
            onSubmit={() => {}}
            formFields={formFields}
            submitButtonText="Submit"
        />
    );
};

describe('GlobalPopupForm - unit tests', () => {

    it('renders text input field correctly', () => {
        const formFields = [
            {
                name: "name",
                label: "Nazwa przystanku",
                type: "input",
                placeholder: "Nazwa przystanku",
            },
        ];
        const formData = { name: "Test Stop" };
        renderGlobalForm(formData, formFields);

        const input = screen.getByPlaceholderText("Nazwa przystanku");
        expect(input).toBeInTheDocument();
        expect(input.value).toBe("Test Stop");
    });

    it('renders select field correctly', () => {
        const formFields = [
            {
                name: "location",
                label: "Lokalizacja",
                type: "select",
                options: [{ value: "north", label: "North" }],
            },
        ];
        const formData = { location: "north" };
        renderGlobalForm(formData, formFields);

        const select = screen.getByLabelText("Lokalizacja");
        expect(select).toBeInTheDocument();
        expect(select.value).toBe("north");
    });
});
