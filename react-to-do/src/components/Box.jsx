import React, { useState, useEffect } from "react";
import Button from "./Button";


export default function Box(props) {

 return (
    <>
        <div className="flex-1 h-37.5 rounded-[32px] bg-[#FFFFFF]">
            <div className="ml-5.5 mr-5.5">
                <div className="flex  ">
                    <div className="w-9 h-9  flex items-center justify-center mt-3.5 mr-2.5">
    
                        <Button color="green" icon={props.icon} alt={props.title} textSize="text-[14px]" backgroundColor="bg-[var(--color-nav-selected-icon-bg)]" textColor="text-white" 
                            borderColor="border-[var(--green-bullet)]" size="w-9 h-9" buttonProperties="w-9 h-9" iconProperties="h-9 w-9" textProps="text-[14px]"/>
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
                    {props.changeNumber > 0 ? (
                        <Button text="Filters" color="green" icon="/upArrow.svg" textSize="text-[14px]" text={`${Math.abs(props.changeNumber)}%`} backgroundColor="bg-[var(--green-bullet-transparent)]" textColor="text-[var(--green-bullet)]" 
                            borderColor="border-[var(--green-bullet)]" size="w-14 h-8" buttonProperties="mt-2 pt-2 pb-2 pr-2.5 pl-2.5 gap-1.25" iconProperties="h-3 w-3" textProps="text-[14px]"/>
                
                    ) : (
                 <Button text="Filters" color="green" icon="/downArrow.svg" textSize="text-[14px]" text={`${Math.abs(props.changeNumber)}%`} backgroundColor="bg-[var(--red-bullet-transparent)]" textColor="text-[var(--red-bullet)]" 
                            borderColor="border-[var(--red-bullet)]" size="w-14 h-8" buttonProperties="mt-2 pt-2 pb-2 pr-2.5 pl-2.5 gap-1.25" iconProperties="h-3 w-3" textProps="text-[14px]"/>
                    )}
       
                </div>
            </div>


            

        </div>
    </>
  );
}