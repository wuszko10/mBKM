import React, {useState} from "react";


const Button = ({handleFunction, argument, defaultIcon, hoverIcon, title}) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={() => handleFunction(argument)}
            title={title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? hoverIcon : defaultIcon}
        </button>
    )
}

export default Button;
