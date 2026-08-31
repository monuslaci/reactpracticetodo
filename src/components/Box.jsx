import React, { useState, useEffect } from "react";
import Button from "./Button";


export default function Box(props) {

 return (
    <>
        <div className="flex-1 h-37.5 w-55 rounded-[32px] bg-[#FFFFFF] gap-2.5 shadow-sm">
            <div className="ml-5.5 mr-5.5">
                <div className="flex  ">
                    <div className="w-9 h-9  flex items-center justify-center mt-3.5 mr-2.5">
    
                        <Button type="circular" icon={props.icon} 
                            />
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
                        <Button type="green"  icon="/upArrow.svg" text={`${Math.abs(props.changeNumber)}%`}  />
                
                    ) : (
                 <Button type="red"  icon="/downArrow.svg"  text={`${Math.abs(props.changeNumber)}%`} />
                    )}
       
                </div>
            </div>


            

        </div>
    </>
  );
}