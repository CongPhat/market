import React, { ReactElement, useRef } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    onClick?: (event) => void;
    classNames?: string;
    icon?: ReactElement | string;
    iconLoading?: ReactElement | string;
    text?: string;
    disabled?: boolean;
    type?: string;
    refs?: any;
    style?: any;
    loading?: boolean;
}

const ButtonComponentTest = (props: IProps) => {
    const myRef = useRef();
    return (
        <button
            style={props.style}
            className={`button-component ${props.classNames && props.classNames} ${props.type == "danger" ? "bg-red-500 hover:bg-red-400" : "bg-blue-600 hover:bg-blue-500"}`}
            ref={props.refs || myRef}
            onClick={(event) => (props.onClick ? props.onClick(event) : undefined)}
            disabled={props.disabled || props.loading}
        >
            <div className="descriptionButton">
                <div className="descriptionButton_button">
                    {props.loading && (props.iconLoading ||
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                    )}

                    {props.icon && !props.loading && props.icon}
                </div>

                <div className="descriptionButton_text">
                    {props.text || "BUTTON"}
                </div>
            </div>
        </button>
    );
};

export default ButtonComponentTest;
