

import React, { useState, useEffect } from "react";


export default function Button(props) {

    let bgColor, textColor, textSize, buttonProperties, iconProperties, textProps, text, compSize, borderColor;


    switch (props.type) {
        case "circular":
            bgColor = props.backgroundColor || "bg-[var(--green-bullet-transparent)]";
            textColor = props.textColor || "text-[var(--green-bullet)]";
            borderColor = props.borderColor || "border-[var(--green-bullet)]";
            compSize = props.size || "w-9 h-9";
            textSize = props.textSize || "text-[14px]";
            buttonProperties = props.buttonProperties || "w-9 h-9";
            iconProperties = props.iconProperties || "h-9 w-9";
            text=props.text || "";
        break;

        case "green":
            bgColor = props.backgroundColor || "bg-[var(--green-bullet-transparent)]";
            textColor = props.textColor || "text-[var(--green-bullet)]";
            borderColor = props.borderColor || "border-[var(--green-bullet)]";
            compSize = props.size || "w-14 h-8" ;
            textSize = props.textSize || "text-[14px]";
            buttonProperties = props.buttonProperties || "mt-2 pt-2 pb-2 pr-2.5 pl-2.5 gap-1.25"
            iconProperties = props.iconProperties || "h-3 w-3";
            text=props.text || "";
        break;

    case "red":
            bgColor = props.backgroundColor || "bg-[var(--red-bullet-transparent)]";
            textColor = props.textColor || "text-[var(--red-bullet)]";
            borderColor = props.borderColor || "border-[var(--red-bullet)]";
            compSize = props.size || "w-14 h-8" ;
            textSize = props.textSize || "text-[14px]";
            buttonProperties = props.buttonProperties || "mt-2 pt-2 pb-2 pr-2.5 pl-2.5 gap-1.25";
            iconProperties = props.iconProperties || "h-3 w-3" 
            text=props.text || "";
        break;


        default:
            bgColor = props.backgroundColor || "bg-[var(--green-bullet-transparent)]";
            textColor = props.textColor || "text-[var(--green-bullet)]";
            borderColor = props.borderColor || "border-[var(--green-bullet)]";
            compSize = props.size || "w-9 h-9";
            textSize = props.textSize || "text-[14px]";
            buttonProperties = props.buttonProperties || "w-9 h-9";
            iconProperties = props.iconProperties || "h-9 w-9";
            textProps = props.textProps || "text-[14px]";
            text=props.text || "";
        break;
    }

    return (
        <>
            <div
                className={`
                    flex items-center justify-center rounded-full whitespace-nowrap
                    ${bgColor}
                    ${textColor}
                    ${borderColor}
                    ${compSize}
                    ${textSize}
                    ${buttonProperties}

                `}
                >
                {props.icon && (
                    <img
                    src={props.icon}
                    // alt={props.alt}
                    className={`shrink-0 ${iconProperties}`}
                    />
                )}
                {props.text && (
                    <span className={`shrink-0 ${textProps}`}>{text}</span>   
                )}
            </div>
        </>
    );
} 