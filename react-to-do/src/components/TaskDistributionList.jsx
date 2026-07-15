import Grid from "./Grid";
import { columnDefs } from "../params/params";


export default function TaskDistributionList() {
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
        <div className="flex-1  h-full flex flex-col text-left mt-4 ml-4 mr-4"> 
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
            <div className="h-full m-3.25">
            <Grid rowData={rowData} columnDefs={columnDefs} rowSelection="multiple"/>

            </div>
            
        
        </div>
    </>
  );
}
