import GlobalPopupForm from "../components/GlobalPopupForm/GlobalPopupForm";
import { render, screen } from '@testing-library/react';
import {getBusStopFormFields} from "../utils/PopupFields";

test('Renders form fields correctly - integration test', () => {
    const formData = {
        name: '',
        longitude: '',
        latitude: '',
    };
    const formFields = getBusStopFormFields();

    render(
        <GlobalPopupForm
            isOpen={true}
            onClose={() => {}}
            title="Test Title"
            formData={formData}
            handleInputChange={() => {}}
            onSubmit={() => {}}
            formFields={formFields}
            submitButtonText="Submit"
        />
    );

    formFields.forEach(field => {
        if (field.type === 'select') {
            const select = screen.getByLabelText(field.label);
            expect(select).toBeInTheDocument();
            expect(select.value).toBe('');
        } else if (field.type === 'checkbox') {
            const checkbox = screen.getByLabelText(field.label);
            expect(checkbox).toBeInTheDocument();
            expect(checkbox.checked).toBe(false);
        } else {
            const input = screen.getByPlaceholderText(field.placeholder);
            expect(input).toBeInTheDocument();
            expect(input).toHaveAttribute('type', field.type || 'text');
        }
    });
});





