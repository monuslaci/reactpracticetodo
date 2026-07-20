import Grid from "./Grid";
import Button from "./Button";
import { desktopColumnDefs, tabletColumnDefs, mobileColumnDefs  } from "../params/params";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";



export default function TaskDistributionList() {
    const isMobile = useMediaQuery({
        query: "(max-width: 639px)"
    });

    const isTablet = useMediaQuery({
        query: "(min-width: 640px) and (max-width: 1023px)"
    });

    const columnDefs = isMobile
        ? mobileColumnDefs
        : isTablet
            ? tabletColumnDefs
            : desktopColumnDefs;
 

 const rowData = [
        {
            ID: "926",
            Name: "John Doe",
            avatar: "/user.png",
            Assigned: "123 tasks",
            "In Progress": "234 tasks",
            Pending: "345 tasks",
            "On Hold": "456 task",
            Department: "HR",
            Status: "Good",
            Action: "Edit"
        },
        {
            ID: "923",
            Name: "Alice Johnson",
            avatar: "/user.png",
            Assigned: "200 tasks",
            "In Progress": "250 tasks",
            Pending: "350 tasks",
            "On Hold": "450 task",
            Department: "Marketing",
            Status: "Poor",
            Action: "Edit"
        },
                {
            ID: "922",
            Name: "Jane Smith",
            avatar: "/user.png",
            Assigned: "150 tasks",
            "In Progress": "200 tasks",
            Pending: "300 tasks",
            "On Hold": "400 task",
            Department: "Finance",
            Status: "Excellent",
            Action: "Edit"
        },

    ];

 return (
    <>
        <div className="flex-1  h-full flex flex-col text-left mt-4 ml-4 mr-4 gap-3.5"> 
            <div className="flex flex-1 gap-3.5 m-4">
                <div className="flex flex-col  font-[var(--font-menu)]">
                    <span className="text-[20px] font-[500]">Task Distribution & Activity</span>
                    <span className="text-[14px] text-[var(--grey-text)]">Monitor task status in realtime</span>
                </div>  
                <div className="flex items-center justify-center ml-auto gap-2">
                     {/* <img src="/filters.svg" alt="Filters" className="" /> */}
                 {/* <Button text="Filters" color="green" icon="/filters.svg" textSize="text-[14px]"  backgroundColor="bg-[var(--button-bg-light-purple)]" textColor="text-[var(--chart-color)]" 
                            borderColor="border-[var(--chart-color)]" size="h-9 w-20" buttonProperties="pt-2.5 pb-2.5 pr-3 pl-3 gap-2"/>
       
                    <Button text="Refresh data" color="green" icon="/refresh-2.svg" textSize="text-[14px]"  backgroundColor="bg-[var(--button-bg-light-purple)]" textColor="text-[var(--chart-color)]" 
                            borderColor="border-[var(--chart-color)]" size="h-9 w-28" buttonProperties="pt-2.5 pb-2.5 pr-3 pl-3 gap-2"/> */}
                </div>
   
            </div> 
            <div className="h-full m-3.25">
            <Grid rowData={rowData} columnDefs={columnDefs} rowSelection="multiple"/>

            </div>
            
        
        </div>
    </>
  );
}
