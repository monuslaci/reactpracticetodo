import React, { useState, useEffect } from "react";


export default function TaskDistribution(props) {

 return (
    <>
        <div className="flex-1 flex flex-col text-left mt-4 ml-4 mr-4"> 
            <div className="flex flex-1">
                <div className="flex flex-col  font-[var(--font-menu)]">
                    <span className="text-[20px] font-[500]">Task Distribution & Activity</span>
                    <span className="text-[14px] text-[var(--grey-text)]">Monitor task status in realtime</span>
                </div>  
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-nav-selected-icon-bg)] ml-auto">
                    <img src="/refresh.svg" alt="Refresh" className="w-9 h-9 text-white" />
                </div>
            </div>  

            <div className="grid grid-cols-3 gap-4 mt-12">
                <div>
                    <div className="flex flex-col font-[var(--font-menu)]">
                        <span className="text-[14px] text-[var(--grey-text)]">High Priority</span>
                        <span className="text-[20px] font-[500]">274</span>
                    </div>  
                </div>
                <div>
                    <div className="flex flex-col font-[var(--font-menu)]">
                        <span className="text-[14px] text-[var(--grey-text)]">Medium Priority</span>
                        <span className="text-[20px] font-[500]">150</span>
                    </div>  
                </div>
                <div>
                    <div className="flex flex-col font-[var(--font-menu)]">
                        <span className="text-[14px] text-[var(--grey-text)]">Low Priority</span>
                        <span className="text-[20px] font-[500]">85</span>
                    </div>  
                </div>

                <div>
                    <div className="flex flex-col font-[var(--font-menu)]">
                        <span className="text-[14px] text-[var(--grey-text)]">Assigned Today</span>
                        <div><span className="text-[20px] font-[500]">274</span><span className="text-[14px] text-[var(--grey-text)]">/326</span></div>
                    </div>  
                </div>

                <div>
                    <div className="flex flex-col font-[var(--font-menu)]">
                        <span className="text-[14px] text-[var(--grey-text)]">With Comments</span>
                        <div><span className="text-[20px] font-[500]">56</span><span className="text-[14px] text-[var(--grey-text)]">/84</span></div>
                    </div>  
                </div>

                <div>
                    <div className="flex flex-col font-[var(--font-menu)]">
                        <span className="text-[14px] text-[var(--grey-text)]">Tasks Reopened</span>
                        <div><span className="text-[20px] font-[500]">135</span><span className="text-[14px] text-[var(--grey-text)]">/416</span></div>
                    </div>  
                </div>
            </div>
            <div className="flex flex-col mt-18 border border-[var(--task-distribution-border)] pt-3.25 rounded-[12px] p-5">
                <div className="flex flex-1 items-center gap-2">
                    <div className="shrink-0">
                    <img src="/lowPrioDot.svg" alt="" className="w-2.5 h-2.5 block" />
                    </div>

                    <span className="text-[14px] leading-none text-[var(--grey-text)]">
                    Low Priority
                    </span>

                    <span className="ml-auto text-[14px] leading-none text-[var(--grey-text)]">
                    85
                    </span>
                </div>
          

                <div className="flex flex-1 items-center gap-2 mt-2.5 ">
                    <div className="shrink-0">
                    <img src="/highPrioDot.svg" alt="" className="w-2.5 h-2.5 block" />
                    </div>

                    <span className="text-[14px] leading-none text-[var(--grey-text)]">
                    High Priority
                    </span>

                    <span className="ml-auto text-[14px] leading-none text-[var(--grey-text)]">
                    274
                    </span>
                </div>
                <div className="mt-3.5">
                     <img src="/exampleChart.svg" alt="" className=" block" />
                </div>
            </div>
        
        </div>
    </>
  );
}