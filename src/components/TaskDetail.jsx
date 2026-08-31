import React, { useState, useEffect } from "react";
import { FaTachometerAlt , FaExclamation, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt  } from "react-icons/fa";
import Card from "./Card.jsx";

export default function TaskDetail() {

return(
    <>  
        <div className="taskdetail flex flex-col w-[40%] h-[747px] mt-[43px] ml-[20px] bg-[var(--color-secondary)]/5 rounded shadow border-[var(--border)]">

            <div className="taskdetailheader flex text-left ">

                <div className="flex justify-start ml-2 mt-2">
                    <div className="taskdetailimage w-[158px] h-[158px] shrink-0">
                    <img src="/tasks.png" className="w-full h-full rounded-2xl object-contain" />
                    </div>
                </div>

                <div className="taskdetailinfo flex flex-col justify-start mt-11 ml-3">
                    <div className="flex  justify-start">
                        <div className="">
                                Task Name
                        </div>
                    </div> 

                    <div className="flex justify-start gap-1 leading-none mt-[9px]">
                        <span className="inline text-[var(--text-h)] text-[10px] m-0">Priority: </span> <span className="inline text-[var(--bg)] text-[10px] m-0">Extreme</span>
                    </div> 
                    <div className="flex justify-start gap-1 leading-none mt-[9px]">
                        <span className="inline text-[var(--text-h)] text-[10px] m-0">Status:  </span> <span className="inline text-[var(--text-card-in-progress)] text-[10px] m-0">In Progress</span> 
                    </div> 
                    <div className="flex justify-start gap-1 leading-none mt-[9px]">
                        <span className="inline text-[var(--text-card-created)] text-[10px] m-0">Created on: 2024-06-30</span>
                    </div> 
                </div>        
            </div>

            <div className="taskdetailtasktitle flex text-left ">
                <div className="justify-start gap-1 leading-none mt-[9px]">
                    <span className="inline text-[var(--text-card)] text-[16px] m-0 font-bold">Task Title: </span> 
                    <span className="inline text-[var(--text-card)] text-[16px] m-0">Document Submission.</span>
                </div> 
            </div>

            <div className="taskdetailobjective flex text-left ">
                <div className="justify-start gap-1 leading-none mt-[9px]">
                    <span className="inline text-[var(--text-card)] text-[16px] m-0 font-bold">Objective: </span> 
                    <span className="inline text-[var(--text-card)] text-[16px] m-0"> To submit required documents for something important</span>
                </div> 
            </div>

            <div className="taskdetaildescription flex text-left ">
                <div className="justify-start gap-1 leading-none mt-[9px]">
                    <span className="inline text-[var(--text-card)] text-[16px] m-0 font-bold">Task Description: </span> 
                    <span className="inline text-[var(--text-card)] text-[16px] m-0">Review the list of documents required for submission and ensure all necessary documents are ready. Organize the documents accordingly and scan them if physical copies need to be submitted digitally. Rename the scanned files appropriately for easy identification and verify the accepted file formats. Upload the documents securely to the designated platform, double-check for accuracy, and obtain confirmation of successful submission. Follow up if necessary to ensure proper processing.</span>
                </div> 
            </div>

            <div className="taskdetailadditionalnotes flex text-left ">
                <div className="justify-start gap-1 leading-none mt-[9px]">
                    <span className="inline text-[var(--text-card)] text-[16px] m-0 font-bold">Additional Notes: </span> 
                    <span className="inline text-[var(--text-card)] text-[16px] m-0">Ensure that the documents are authentic and up-to-date.
                        Maintain confidentiality and security of sensitive information during the submission process.
                        If there are specific guidelines or deadlines for submission, adhere to them diligently.
                        Deadline for Submission: End of Day</span>
                </div> 
            </div>

            <div className="taskdetaildeadline flex text-left ">
                <div className="justify-start gap-1 leading-none mt-[9px]">
                    <span className="inline text-[var(--text-card)] text-[16px] m-0 font-bold">Deadline of submission: </span> 
                    <span className="inline text-[var(--text-card)] text-[16px] m-0">End of Day</span>
                </div> 
            </div>

        </div>
    </>
);  
}