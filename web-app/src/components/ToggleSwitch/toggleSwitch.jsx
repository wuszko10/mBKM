import React from 'react';
import './style.scss';

const ToggleSwitch = ({ isActive, onToggle, argument }) => {
    return (
        <label onClick={(e) => {
            e.preventDefault();
            onToggle(argument, !isActive)
        }} className="switch">
            <input
                name="toggle"
                type="checkbox"
                checked={isActive}
                readOnly
            />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleSwitch;
