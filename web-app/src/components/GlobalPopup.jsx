import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const GlobalPopup = ({
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
            className="popup-box"
            overlayClassName="popup-overlay"
        >
            <IoClose onClick={onClose} className="close-icon" />
            <div className="popup-container">
                <h3>{title}</h3>
                <form className="form-global" onSubmit={onSubmit}>
                    {formFields.map((field) => {
                        switch (field.type) {
                            case "select":
                                return (
                                    <select
                                        key={field.name}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={handleInputChange}
                                    >
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}

                                    </select>
                                );
                            case "checkbox":
                                return (
                                    <label key={field.name}>
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
                                        />
                                        {field.label}
                                    </label>
                                );
                            default:
                                return (
                                    <input
                                        key={field.name}
                                        type={field.type || "text"}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || ""}
                                        onChange={handleInputChange}
                                    />
                                );
                        }
                    })}
                    <button type="submit" onClick={onSubmit}>{submitButtonText}</button>
                </form>
            </div>
        </Modal>
    );
};

export default GlobalPopup;
