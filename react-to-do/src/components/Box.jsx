import React, { useState, useEffect } from "react";


export default function Box(props) {

 return (
    <>
        <div className="flex-1 h-37.5 rounded-[32px] bg-[#FFFFFF]">
            <div className="ml-5.5 mr-5.5">
                <div className="flex  ">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-nav-selected-icon-bg)] mt-3.5 mr-2.5">
                        <img src={props.icon}  alt={props.title}  className="w-9 h-9 text-white" />
                    </div>
                    <div>
                    <div className="flex flex-col items-start">
                            <span className="text-[var(--color-nav-text)] text-[20px] font-[var(--font-menu)] font-[500] mt-3.5">
                                {props.titleNumber}
                            </span>
                            <span className="text-[var(--grey-text)] text-[14px] font-[var(--font-menu)] font-[400] ">
                                {props.title}
                            </span>
                    </div>
                    </div>
                    
                </div>      
                <hr className="mt-6 border-gray-300" />
                <div className="flex justify-between font-[var(--font-menu)] ">
                    <span className="text-[var(--grey-text)] text-[14px] font-[400] mt-3 text-[14px]">
                        {props.text}
                    </span>
                    <div className={`text-[14px] w-14 h-8 rounded-full flex items-center justify-center mt-2.5 p-2.5 ${props.changeNumber > 0 ? "bg-[var(--green-bullet-transparent)] text-[var(--green-bullet)]" : "bg-[var(--red-bullet-transparent)] text-[var(--red-bullet)]"}`}>
                        <img src={props.changeNumber > 0 ? "/upArrow.svg" : "/downArrow.svg"} alt={props.changeNumber > 0 ? "Up Arrow" : "Down Arrow"} className="w-3 h-3 mr-1" />
                        <span>{Math.abs(props.changeNumber)}%</span>
                    </div>
                </div>
            </div>


            

        </div>
    </>
  );
}