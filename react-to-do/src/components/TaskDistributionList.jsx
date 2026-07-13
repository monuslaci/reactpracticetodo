import React, { useState, useEffect } from "react";


export default function TaskDistributionList(props) {

 return (
    <>
        <div className="flex-1 flex flex-col text-left mt-4 ml-4 mr-4"> 
            <div className="flex flex-1">
                <div className="flex flex-col  font-[var(--font-menu)]">
                    <span className="text-[20px] font-[500]">Task Distribution & Activity</span>
                    <span className="text-[14px] text-[var(--grey-text)]">Monitor task status in realtime</span>
                </div>  
                <div className="flex items-center justify-center ml-auto">
                     <img src="/filters.svg" alt="Filters" className="" />
                    <img src="/refreshData.svg" alt="Refresh" className="ml-2" />
                </div>
   
            </div> 
        
        </div>
    </>
  );
}