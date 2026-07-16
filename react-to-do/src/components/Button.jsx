

import React, { useState, useEffect } from "react";


export default function Button(props) {

    let bgColor = props.backgroundColor || "bg-[var(--green-bullet-transparent)]";
    let textColor = props.textColor || "text-[var(--green-bullet)]";
    let borderColor = props.borderColor || "border-[var(--green-bullet)]";



    return (
        <>
            <div
                className={`
                    flex items-center justify-center rounded-full whitespace-nowrap
                    ${bgColor}
                    ${textColor}
                    ${borderColor}
                    ${props.size}
                    ${props.textSize}
                    ${props.buttonProperties}

                `}
                >
                {props.icon && (
                    <img
                    src={props.icon}
                    alt={props.alt}
                    className={`shrink-0 ${props.iconProperties}`}
                    />
                )}
                {props.text && (
                    <span className={`shrink-0 ${props.textProps}`}>{props.text}</span>   
                )}
            </div>
        </>
    );
} 