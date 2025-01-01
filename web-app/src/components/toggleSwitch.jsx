import React from 'react';
import '../styles/style.scss'

const ToggleSwitch = ({ isActive, onToggle, argument }) => {
    return (
        <label onClick={(e) => {
            e.preventDefault();
            onToggle(argument, !isActive)
        }} className="switch">
            <input
                type="checkbox"
                checked={isActive}
                readOnly
            />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleSwitch;
