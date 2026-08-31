import Grid from "./Grid";
import Button from "./Button";
import { desktopColumnDefs, tabletColumnDefs, mobileColumnDefs  } from "../params/params";
import { useMediaQuery } from "react-responsive";



export default function TaskDistributionList({ recentTasks }) {
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
 

 const rowData = recentTasks.map((task) => ({
        ID: task.id,
        Name: task.assignee?.name || "Unassigned",
        avatar: task.assignee?.avatar || "/user.png",
        Assigned: task.projectId ? "Assigned" : "Unassigned",
        "In Progress": task.status === "in_progress" ? "Yes" : "No",
        Pending: task.status === "pending" ? "Yes" : "No",
        "On Hold": task.status === "on_hold" ? "Yes" : "No",
        Department: task.department || "—",
        Status: task.status,
        Action: "Edit"
    }));

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
                 <Button type="purple" text="Filters" icon="/filters.svg" />
       
                 <Button type="purple" text="Refresh data" icon="/refresh-2.svg" size="h-9 w-28" />
                </div>
   
            </div> 
            <div className="h-full m-3.25">
            <Grid rowData={rowData} columnDefs={columnDefs} rowSelection="multiple" height="h-90" width="w-full" />

            </div>
            
        
        </div>
    </>
  );
}
