import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import '../../styles/style.scss'

Modal.setAppElement('#root');
const GlobalPopupForm = ({
                       isOpen,
                       onClose,
                       title,
                       formData,
                       handleInputChange,
                       onSubmit,
                       formFields,
                       submitButtonText,
                   }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            className="modal-container"
            overlayClassName="popup-overlay"
        >
            <div className="popup-box">
                <IoClose onClick={onClose} className="close-icon" />
                <div className="popup-container ">
                    <h3>{title}</h3>
                    <div className="popup-form-scroll">
                        <form className="form-global" onSubmit={onSubmit}>
                            {formFields.map((field) => {
                                switch (field.type) {
                                    case "select":
                                        return (
                                            <label key={field.name} htmlFor={field.name}>
                                                {field.label}
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onChange={handleInputChange}
                                                    disabled={field.disabled}
                                                >
                                                    <option value="" disabled>
                                                        Wybierz opcję
                                                    </option>
                                                    {field.options?.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        );
                                    case "checkbox":
                                        return (
                                            <div key={field.name} className="form-checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    id={field.name}
                                                    name={field.name}
                                                    checked={formData[field.name] || false}
                                                    onChange={(e) =>
                                                        handleInputChange({
                                                            target: {
                                                                name: field.name,
                                                                value: e.target.checked,
                                                            },
                                                        })
                                                    }
                                                    disabled={field.disabled}
                                                />
                                                <label>
                                                    {field.label}
                                                </label>
                                            </div>
                                        );
                                    case "legend":
                                        return (
                                            <p key={field.name} className={"popup-label"}>{field.name}</p>
                                        )
                                    default:
                                        return (
                                            <label key={field.name} htmlFor={field.name}>
                                                {field.label}
                                                <input
                                                    type={field.type || "text"}
                                                    id={field.name}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name] || ""}
                                                    onChange={handleInputChange}
                                                    disabled={field.disabled}
                                                />
                                            </label>
                                        );
                                }
                            })}
                            <button type="submit" onClick={onSubmit}>{submitButtonText}</button>
                        </form>
                    </div>
                </div>
            </div>

        </Modal>
    );
};

export default GlobalPopupForm;
