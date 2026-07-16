import React, { useState, useEffect } from "react";
import BarChartComponent from './BarChartComponent.jsx'    



export default function ChartBox(props) {
    const data = [
        { name: "Jan", tasks: 500 },
        { name: "Feb", tasks: 1300 },
        { name: "Mar", tasks: 750 },
        { name: "Apr", tasks: 1800 },
        { name: "May", tasks: 1300 },
        { name: "Jun", tasks: 750 },
    ];

    return (
        <>
        <div className="w-[90%]  h-[80%] m-6">
            <div className="flex flex-1 mb-5">
                <div className="flex flex-col font-[var(--font-menu)]">
                    <span className="text-[20px] font-[500]">Task Distribution & Activity</span>
                    <span className="text-[14px] text-[var(--grey-text)] ">Monitor task status in realtime</span>
                </div>  
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-nav-selected-icon-bg)] ml-auto">
                    <img src="/refresh.svg" alt="Refresh" className="w-9 h-9 text-white" />
                </div>
            </div>  
            <BarChartComponent data={data}>
            </BarChartComponent>
        </div>
   

 

        </>
  );
}